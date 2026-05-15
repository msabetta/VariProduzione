import { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2, Link2, Search } from 'lucide-react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import toast from 'react-hot-toast';
import { getTasks, getOrdini, getMacchine, getOperatori, createTask, updateTask, deleteTask, assegnaTask } from '../services/api';
import Modal from '../components/Modal';
import ConfirmDialog from '../components/ConfirmDialog';

const validationSchema = Yup.object({
  titolo: Yup.string().required('Obbligatorio').max(200),
  descrizione: Yup.string().max(500),
  priorita: Yup.number().required(),
  durataStimataMinuti: Yup.number().nullable(),
  ordineId: Yup.number().nullable(),
  macchinaId: Yup.number().nullable(),
  operatoreId: Yup.number().nullable()
});

const statoColors = {
  0: 'badge-secondary', // DaFare
  1: 'badge-info',      // InCorso
  2: 'badge-success',   // Completato
  3: 'badge-danger'     // Bloccato
};

const statoLabels = { 0: 'Da Fare', 1: 'In Corso', 2: 'Completato', 3: 'Bloccato' };

const prioritaLabels = { 0: 'Bassa', 1: 'Media', 2: 'Alta', 3: 'Critica' };
const prioritaColors = { 0: 'badge-info', 1: 'badge-success', 2: 'badge-warning', 3: 'badge-danger' };

export default function TasksPage() {
  const [tasks, setTasks] = useState([]);
  const [ordini, setOrdini] = useState([]);
  const [macchine, setMacchine] = useState([]);
  const [operatori, setOperatori] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [assignModalOpen, setAssignModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [assigningTask, setAssigningTask] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [updateId, setUpdateId] = useState(null);

  useEffect(() => { loadAll(); }, []);

  const loadAll = async () => {
    try {
      setLoading(true);
      const [t, o, m, op] = await Promise.all([
        getTasks(), getOrdini(), getMacchine(), getOperatori()
      ]);
      setTasks(t);
      setOrdini(o);
      setMacchine(m);
      setOperatori(op);
    } catch (err) {
      toast.error('Errore caricamento dati');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteTask(deleteId);
      toast.success('Task eliminato');
      loadAll();
    } catch (err) {
      toast.error('Errore eliminazione');
    }
    setDeleteId(null);
  };


  const handleUpdate = async (id, data) => {
    try {
      await updateTask(id, data);
      toast.success('Task aggiornato!');
      loadAll();
    } catch (err) {
      toast.error('Errore aggiornamento task');
    } 
  };

  const filteredTasks = tasks.filter(t => 
    t.titolo?.toLowerCase().includes(search.toLowerCase()) ||
    t.ordineCodice?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="page-header">
        <h1>Gestione Task</h1>
        <button 
          className="btn btn-primary"
          onClick={() => { setEditingTask(null); setModalOpen(true); }}
        >
          <Plus size={18} /> Nuovo Task
        </button>
      </div>

      <div className="card">
        <div className="card-header">
          <div className="form-group" style={{ margin: 0, maxWidth: 300 }}>
            <div style={{ position: 'relative' }}>
              <Search size={16} style={{ position: 'absolute', left: 12, top: 10, color: '#9ca3af' }} />
              <input
                type="text"
                className="form-control"
                placeholder="Cerca task..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                style={{ paddingLeft: 40 }}
              />
            </div>
          </div>
        </div>

        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Titolo</th>
                <th>Stato</th>
                <th>Priorità</th>
                <th>Ordine</th>
                <th>Macchina</th>
                <th>Operatore</th>
                <th>Durata</th>
                <th>Azioni</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan="8" style={{ textAlign: 'center' }}>Caricamento...</td></tr>
              ) : filteredTasks.length === 0 ? (
                <tr><td colSpan="8" style={{ textAlign: 'center' }}>Nessun task trovato</td></tr>
              ) : (
                filteredTasks.map(task => (
                  <tr key={task.id}>
                    <td><strong>{task.titolo}</strong></td>
                    <td>
                      <span className={`badge ${statoColors[task.stato] || 'badge-info'}`}>
                        {statoLabels[task.stato] || 'N/D'}
                      </span>
                    </td>
                    <td>
                      <span className={`badge ${prioritaColors[task.priorita] || 'badge-info'}`}>
                        {prioritaLabels[task.priorita] || 'N/D'}
                      </span>
                    </td>
                    <td>{task.ordineCodice || '-'}</td>
                    <td>{task.macchinaNome || '-'}</td>
                    <td>{task.operatoreNome || '-'}</td>
                    <td>{task.durataStimataMinuti ? `${task.durataStimataMinuti} min` : '-'}</td>
                    <td>
                      <div style={{ display: 'flex', gap: 8 }}>
                        <button 
                          className="btn btn-sm btn-secondary"
                          title="Assegna"
                          onClick={() => { setAssigningTask(task); setAssignModalOpen(true); }}
                        >
                          <Link2 size={14} />
                        </button>
                        <button 
                          className="btn btn-sm btn-secondary"
                          onClick={() => { setEditingTask(task); setModalOpen(true); }}
                        >
                          <Pencil size={14} />
                        </button>
                        <button 
                          className="btn btn-sm btn-danger"
                          onClick={() => setDeleteId(task.id)}
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <TaskFormModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        task={editingTask}
        ordini={ordini}
        macchine={macchine}
        operatori={operatori}
        onSuccess={() => { loadAll(); setModalOpen(false); }}
      />

      <AssignModal
        isOpen={assignModalOpen}
        onClose={() => setAssignModalOpen(false)}
        task={assigningTask}
        ordini={ordini}
        macchine={macchine}
        operatori={operatori}
        onSuccess={() => { loadAll(); setAssignModalOpen(false); }}
      />

      <ConfirmDialog
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDelete}
        title="Elimina Task"
        message="Sei sicuro di voler eliminare questo task?"
      />

      <ConfirmDialog
        isOpen={!!updateId}
        onClose={() => setUpdateId(null)}
        onConfirm={handleUpdate}
        title="Aggiorna Task"
        message="Sei sicuro di voler aggiornare questo task?"
      />
    </div>
  );
}

function TaskFormModal({ isOpen, onClose, task, ordini, macchine, operatori, onSuccess }) {
  const isEditing = !!task;

  const formik = useFormik({
    initialValues: {
      titolo: task?.titolo || '',
      descrizione: task?.descrizione || '',
      priorita: task?.priorita ?? 1,
      durataStimataMinuti: task?.durataStimataMinuti || '',
      ordineId: task?.ordineId || '',
      macchinaId: task?.macchinaId || '',
      operatoreId: task?.operatoreId || ''
    },
    enableReinitialize: true,
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const payload = {
          ...values,
          durataStimataMinuti: values.durataStimataMinuti ? parseInt(values.durataStimataMinuti) : null,
          ordineId: values.ordineId ? parseInt(values.ordineId) : null,
          macchinaId: values.macchinaId ? parseInt(values.macchinaId) : null,
          operatoreId: values.operatoreId ? parseInt(values.operatoreId) : null
        };

        if (isEditing) {
          await updateTask(task.id, payload);
          toast.success('Task aggiornato!');
        } else {
          await createTask(payload);
          toast.success('Task creato!');
        }
        onSuccess();
      } catch (err) {
        toast.error(err.message || 'Errore durante il salvataggio');
      } finally {
        setSubmitting(false);
      }
    }
  });

  return (
    <Modal title={isEditing ? 'Modifica Task' : 'Nuovo Task'} isOpen={isOpen} onClose={onClose}>
      <form onSubmit={formik.handleSubmit}>
        <div className="modal-body">
          <div className="form-group">
            <label>Titolo *</label>
            <input name="titolo" className={`form-control ${formik.touched.titolo && formik.errors.titolo ? 'error' : ''}`}
              placeholder="Titolo task" {...formik.getFieldProps('titolo')} />
            {formik.touched.titolo && formik.errors.titolo && <div className="error-message">{formik.errors.titolo}</div>}
          </div>

          <div className="form-group">
            <label>Descrizione</label>
            <textarea name="descrizione" className="form-control" rows="2"
              placeholder="Descrizione..." {...formik.getFieldProps('descrizione')} />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label>Priorità</label>
              <select name="priorita" className="form-control" {...formik.getFieldProps('priorita')}>
                <option value={0}>Bassa</option>
                <option value={1}>Media</option>
                <option value={2}>Alta</option>
                <option value={3}>Critica</option>
              </select>
            </div>

            <div className="form-group">
              <label>Durata Stimata (min)</label>
              <input name="durataStimataMinuti" type="number" className="form-control"
                placeholder="60" {...formik.getFieldProps('durataStimataMinuti')} />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label>Ordine</label>
              <select name="ordineId" className="form-control" {...formik.getFieldProps('ordineId')}>
                <option value="">Nessuno</option>
                {ordini.map(o => <option key={o.id} value={o.id}>{o.codice}</option>)}
              </select>
            </div>

            <div className="form-group">
              <label>Macchina</label>
              <select name="macchinaId" className="form-control" {...formik.getFieldProps('macchinaId')}>
                <option value="">Nessuna</option>
                {macchine.map(m => <option key={m.id} value={m.id}>{m.nome}</option>)}
              </select>
            </div>

            <div className="form-group">
              <label>Operatore</label>
              <select name="operatoreId" className="form-control" {...formik.getFieldProps('operatoreId')}>
                <option value="">Nessuno</option>
                {operatori.map(o => <option key={o.id} value={o.id}>{o.nome} {o.cognome}</option>)}
              </select>
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button type="button" onClick={onClose} className="btn btn-secondary">Annulla</button>
          <button type="submit" disabled={formik.isSubmitting} className="btn btn-primary">
            {formik.isSubmitting ? 'Salvataggio...' : isEditing ? 'Aggiorna' : 'Crea'}
          </button>
        </div>
      </form>
    </Modal>
  );
}

function AssignModal({ isOpen, onClose, task, ordini, macchine, operatori, onSuccess }) {
  if (!task) return null;

  const formik = useFormik({
    initialValues: {
      ordineId: task.ordineId || '',
      macchinaId: task.macchinaId || '',
      operatoreId: task.operatoreId || ''
    },
    enableReinitialize: true,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const payload = {
          ordineId: values.ordineId ? parseInt(values.ordineId) : null,
          macchinaId: values.macchinaId ? parseInt(values.macchinaId) : null,
          operatoreId: values.operatoreId ? parseInt(values.operatoreId) : null
        };
        await assegnaTask(task.id, payload);
        toast.success('Assegnazioni aggiornate!');
        onSuccess();
      } catch (err) {
        toast.error('Errore aggiornamento assegnazioni');
      } finally {
        setSubmitting(false);
      }
    }
  });

  return (
    <Modal title={`Assegna: ${task.titolo}`} isOpen={isOpen} onClose={onClose}>
      <form onSubmit={formik.handleSubmit}>
        <div className="modal-body">
          <div className="form-group">
            <label>Ordine</label>
            <select name="ordineId" className="form-control" {...formik.getFieldProps('ordineId')}>
              <option value="">Nessuno</option>
              {ordini.map(o => <option key={o.id} value={o.id}>{o.codice}</option>)}
            </select>
          </div>

          <div className="form-group">
            <label>Macchina</label>
            <select name="macchinaId" className="form-control" {...formik.getFieldProps('macchinaId')}>
              <option value="">Nessuna</option>
              {macchine.map(m => <option key={m.id} value={m.id}>{m.nome}</option>)}
            </select>
          </div>

          <div className="form-group">
            <label>Operatore</label>
            <select name="operatoreId" className="form-control" {...formik.getFieldProps('operatoreId')}>
              <option value="">Nessuno</option>
              {operatori.map(o => <option key={o.id} value={o.id}>{o.nome} {o.cognome}</option>)}
            </select>
          </div>
        </div>

        <div className="modal-footer">
          <button type="button" onClick={onClose} className="btn btn-secondary">Annulla</button>
          <button type="submit" disabled={formik.isSubmitting} className="btn btn-primary">
            {formik.isSubmitting ? 'Salvataggio...' : 'Assegna'}
          </button>
        </div>
      </form>
    </Modal>
  );
}