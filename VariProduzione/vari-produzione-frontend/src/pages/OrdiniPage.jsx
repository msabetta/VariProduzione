import { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2, Search } from 'lucide-react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import toast from 'react-hot-toast';
import { getOrdini, createOrdine, updateOrdine, deleteOrdine } from '../services/api';
import Modal from '../components/Modal';
import ConfirmDialog from '../components/ConfirmDialog';

const validationSchema = Yup.object({
  codice: Yup.string()
    .required('Obbligatorio')
    .max(50, 'Max 50 caratteri')
    .matches(/^ORD-\d{4}-\d{3}$/, 'Formato: ORD-YYYY-NNN'),
  cliente: Yup.string().required('Obbligatorio').max(200),
  descrizione: Yup.string().max(500),
  dataConsegna: Yup.date().nullable()
});

const statoColors = {
  0: 'badge-info',      // Bozza
  1: 'badge-warning',   // Confermato
  2: 'badge-info',      // InProduzione
  3: 'badge-success',   // Completato
  4: 'badge-danger',    // Annullato
  5: 'badge-danger'     // Ritardato
};

const statoLabels = {
  0: 'Bozza', 1: 'Confermato', 2: 'In Produzione', 
  3: 'Completato', 4: 'Annullato', 5: 'Ritardato'
};

export default function OrdiniPage() {
  const [ordini, setOrdini] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingOrdine, setEditingOrdine] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => { loadOrdini(); }, []);

  const loadOrdini = async () => {
    try {
      setLoading(true);
      const data = await getOrdini();
      setOrdini(data);
    } catch (err) {
      toast.error('Errore caricamento ordini');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteOrdine(deleteId);
      toast.success('Ordine eliminato');
      loadOrdini();
    } catch (err) {
      toast.error('Errore eliminazione');
    }
    setDeleteId(null);
  };

  const filteredOrdini = ordini.filter(o => 
    o.codice?.toLowerCase().includes(search.toLowerCase()) ||
    o.cliente?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="page-header">
        <h1>Gestione Ordini</h1>
        <button 
          className="btn btn-primary"
          onClick={() => { setEditingOrdine(null); setModalOpen(true); }}
        >
          <Plus size={18} /> Nuovo Ordine
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
                placeholder="Cerca ordini..."
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
                <th>Cliente</th>
                <th>Descrizione</th>
                <th>Stato</th>
                <th>Progresso</th>
                <th>Data Consegna</th>
                <th>Task</th>
                <th>Azioni</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan="8" style={{ textAlign: 'center' }}>Caricamento...</td></tr>
              ) : filteredOrdini.length === 0 ? (
                <tr><td colSpan="8" style={{ textAlign: 'center' }}>Nessun ordine trovato</td></tr>
              ) : (
                filteredOrdini.map(ordine => (
                  <tr key={ordine.id}>
                    <td><strong>{ordine.codice}</strong></td>
                    <td>{ordine.cliente}</td>
                    <td>{ordine.descrizione?.substring(0, 50)}...</td>
                    <td>
                      <span className={`badge ${statoColors[ordine.stato] || 'badge-info'}`}>
                        {statoLabels[ordine.stato] || 'N/D'}
                      </span>
                    </td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <div className="progress-bar" style={{ width: 80 }}>
                          <div className="progress-fill" style={{ width: `${ordine.progresso}%` }} />
                        </div>
                        <span style={{ fontSize: '0.75rem' }}>{ordine.progresso}%</span>
                      </div>
                    </td>
                    <td>{ordine.dataConsegna ? new Date(ordine.dataConsegna).toLocaleDateString('it-IT') : '-'}</td>
                    <td>{ordine.numeroTasks || 0}</td>
                    <td>
                      <div style={{ display: 'flex', gap: 8 }}>
                        <button 
                          className="btn btn-sm btn-secondary"
                          onClick={() => { setEditingOrdine(ordine); setModalOpen(true); }}
                        >
                          <Pencil size={14} />
                        </button>
                        <button 
                          className="btn btn-sm btn-danger"
                          onClick={() => setDeleteId(ordine.id)}
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

      <OrdineFormModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        ordine={editingOrdine}
        onSuccess={() => { loadOrdini(); setModalOpen(false); }}
      />

      <ConfirmDialog
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDelete}
        title="Elimina Ordine"
        message="Sei sicuro di voler eliminare questo ordine? L'azione è irreversibile."
      />
    </div>
  );
}

// ==================== FORM MODALE ====================

function OrdineFormModal({ isOpen, onClose, ordine, onSuccess }) {
  const isEditing = !!ordine;

  const formik = useFormik({
    initialValues: {
      codice: ordine?.codice || '',
      cliente: ordine?.cliente || '',
      descrizione: ordine?.descrizione || '',
      dataConsegna: ordine?.dataConsegna ? ordine.dataConsegna.split('T')[0] : ''
    },
    enableReinitialize: true,
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const payload = {
          ...values,
          dataConsegna: values.dataConsegna ? new Date(values.dataConsegna).toISOString() : null
        };

        if (isEditing) {
          await updateOrdine(ordine.id, payload);
          toast.success('Ordine aggiornato!');
        } else {
          await createOrdine(payload);
          toast.success('Ordine creato!');
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
    <Modal title={isEditing ? 'Modifica Ordine' : 'Nuovo Ordine'} isOpen={isOpen} onClose={onClose}>
      <form onSubmit={formik.handleSubmit}>
        <div className="modal-body">
          <div className="form-group">
            <label>Codice *</label>
            <input
              name="codice"
              className={`form-control ${formik.touched.codice && formik.errors.codice ? 'error' : ''}`}
              placeholder="ORD-2025-001"
              {...formik.getFieldProps('codice')}
              disabled={isEditing}
            />
            {formik.touched.codice && formik.errors.codice && (
              <div className="error-message">{formik.errors.codice}</div>
            )}
          </div>

          <div className="form-group">
            <label>Cliente *</label>
            <input
              name="cliente"
              className={`form-control ${formik.touched.cliente && formik.errors.cliente ? 'error' : ''}`}
              placeholder="Nome cliente"
              {...formik.getFieldProps('cliente')}
            />
            {formik.touched.cliente && formik.errors.cliente && (
              <div className="error-message">{formik.errors.cliente}</div>
            )}
          </div>

          <div className="form-group">
            <label>Descrizione</label>
            <textarea
              name="descrizione"
              className="form-control"
              rows="3"
              placeholder="Descrizione ordine..."
              {...formik.getFieldProps('descrizione')}
            />
          </div>

          <div className="form-group">
            <label>Data Consegna</label>
            <input
              name="dataConsegna"
              type="date"
              className="form-control"
              {...formik.getFieldProps('dataConsegna')}
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