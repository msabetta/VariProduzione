import { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2, Power, Search } from 'lucide-react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import toast from 'react-hot-toast';
import { getMacchine, createMacchina, updateMacchina, deleteMacchina, cambiaStatoMacchina } from '../services/api';
import Modal from '../components/Modal';
import ConfirmDialog from '../components/ConfirmDialog';

const validationSchema = Yup.object({
  codice: Yup.string().required('Obbligatorio').max(50),
  nome: Yup.string().required('Obbligatorio').max(200),
  descrizione: Yup.string().max(500)
});

const statoColors = {
  0: 'badge-success',   // Disponibile
  1: 'badge-info',      // InUso
  2: 'badge-warning',   // Manutenzione
  3: 'badge-danger',    // FuoriServizio
  4: 'badge-success'    // Operativa
};

const statoLabels = {
  0: 'Disponibile', 1: 'In Uso', 2: 'Manutenzione', 3: 'Fuori Servizio', 4: 'Operativa'
};

export default function MacchinePage() {
  const [macchine, setMacchine] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingMacchina, setEditingMacchina] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => { loadMacchine(); }, []);

  const loadMacchine = async () => {
    try {
      setLoading(true);
      const data = await getMacchine();
      setMacchine(data);
    } catch (err) {
      toast.error('Errore caricamento macchine');
    } finally {
      setLoading(false);
    }
  };

  const handleCambiaStato = async (id, nuovoStato) => {
    try {
      await cambiaStatoMacchina(id, nuovoStato);
      toast.success('Stato aggiornato');
      loadMacchine();
    } catch (err) {
      toast.error('Errore aggiornamento stato');
    }
  };

  const handleDelete = async () => {
    try {
      await deleteMacchina(deleteId);
      toast.success('Macchina eliminata');
      loadMacchine();
    } catch (err) {
      toast.error('Errore eliminazione');
    }
    setDeleteId(null);
  };

  const filteredMacchine = macchine.filter(m => 
    m.codice?.toLowerCase().includes(search.toLowerCase()) ||
    m.nome?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="page-header">
        <h1>Gestione Macchine</h1>
        <button 
          className="btn btn-primary"
          onClick={() => { setEditingMacchina(null); setModalOpen(true); }}
        >
          <Plus size={18} /> Nuova Macchina
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
                placeholder="Cerca macchine..."
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
                <th>Codice</th>
                <th>Nome</th>
                <th>Descrizione</th>
                <th>Stato</th>
                <th>Tasks Attivi</th>
                <th>Ultima Manutenzione</th>
                <th>Azioni</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan="7" style={{ textAlign: 'center' }}>Caricamento...</td></tr>
              ) : filteredMacchine.length === 0 ? (
                <tr><td colSpan="7" style={{ textAlign: 'center' }}>Nessuna macchina trovata</td></tr>
              ) : (
                filteredMacchine.map(macchina => (
                  <tr key={macchina.id}>
                    <td><strong>{macchina.codice}</strong></td>
                    <td>{macchina.nome}</td>
                    <td>{macchina.descrizione?.substring(0, 40)}...</td>
                    <td>
                      <span className={`badge ${statoColors[macchina.stato] || 'badge-info'}`}>
                        {statoLabels[macchina.stato] || 'N/D'}
                      </span>
                    </td>
                    <td>{macchina.tasksAssegnati || 0}</td>
                    <td>{macchina.dataUltimaManutenzione ? new Date(macchina.dataUltimaManutenzione).toLocaleDateString('it-IT') : '-'}</td>
                    <td>
                      <div style={{ display: 'flex', gap: 8 }}>
                        <button 
                          className="btn btn-sm btn-secondary"
                          title="Cambia stato"
                          onClick={() => {
                            const nextStato = (macchina.stato + 1) % 5;
                            handleCambiaStato(macchina.id, nextStato);
                          }}
                        >
                          <Power size={14} />
                        </button>
                        <button 
                          className="btn btn-sm btn-secondary"
                          onClick={() => { setEditingMacchina(macchina); setModalOpen(true); }}
                        >
                          <Pencil size={14} />
                        </button>
                        <button 
                          className="btn btn-sm btn-danger"
                          onClick={() => setDeleteId(macchina.id)}
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

      <MacchinaFormModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        macchina={editingMacchina}
        onSuccess={() => { loadMacchine(); setModalOpen(false); }}
      />

      <ConfirmDialog
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDelete}
        title="Elimina Macchina"
        message="Sei sicuro di voler eliminare questa macchina?"
      />
    </div>
  );
}

function MacchinaFormModal({ isOpen, onClose, macchina, onSuccess }) {
  const isEditing = !!macchina;

  const formik = useFormik({
    initialValues: {
      codice: macchina?.codice || '',
      nome: macchina?.nome || '',
      descrizione: macchina?.descrizione || ''
    },
    enableReinitialize: true,
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        if (isEditing) {
          await updateMacchina(macchina.id, values);
          toast.success('Macchina aggiornata!');
        } else {
          await createMacchina(values);
          toast.success('Macchina creata!');
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
    <Modal title={isEditing ? 'Modifica Macchina' : 'Nuova Macchina'} isOpen={isOpen} onClose={onClose}>
      <form onSubmit={formik.handleSubmit}>
        <div className="modal-body">
          <div className="form-group">
            <label>Codice *</label>
            <input
              name="codice"
              className={`form-control ${formik.touched.codice && formik.errors.codice ? 'error' : ''}`}
              placeholder="M001"
              {...formik.getFieldProps('codice')}
              disabled={isEditing}
            />
            {formik.touched.codice && formik.errors.codice && (
              <div className="error-message">{formik.errors.codice}</div>
            )}
          </div>

          <div className="form-group">
            <label>Nome *</label>
            <input
              name="nome"
              className={`form-control ${formik.touched.nome && formik.errors.nome ? 'error' : ''}`}
              placeholder="Tornio CNC"
              {...formik.getFieldProps('nome')}
            />
            {formik.touched.nome && formik.errors.nome && (
              <div className="error-message">{formik.errors.nome}</div>
            )}
          </div>

          <div className="form-group">
            <label>Descrizione</label>
            <textarea
              name="descrizione"
              className="form-control"
              rows="3"
              placeholder="Descrizione macchina..."
              {...formik.getFieldProps('descrizione')}
            />
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