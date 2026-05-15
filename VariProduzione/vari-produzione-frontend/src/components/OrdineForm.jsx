import { useFormik } from 'formik';
import * as Yup from 'yup';
import toast from 'react-hot-toast';
import { createOrdine, updateOrdine } from '../services/api';

const validationSchema = Yup.object({
  codice: Yup.string()
    .required('Il codice è obbligatorio')
    .max(50, 'Massimo 50 caratteri')
    .matches(/^ORD-\d{4}-\d{3}$/, 'Formato: ORD-YYYY-NNN'),
  cliente: Yup.string()
    .required('Il cliente è obbligatorio')
    .max(200, 'Massimo 200 caratteri'),
  descrizione: Yup.string()
    .max(500, 'Massimo 500 caratteri'),
  dataConsegna: Yup.date()
    .min(new Date(), 'La data di consegna deve essere futura')
    .nullable()
});

export default function OrdineForm({ ordine, onSuccess, onCancel }) {
  const isEditing = !!ordine;

  const formik = useFormik({
    initialValues: {
      codice: ordine?.codice || '',
      cliente: ordine?.cliente || '',
      descrizione: ordine?.descrizione || '',
      dataConsegna: ordine?.dataConsegna ? ordine.dataConsegna.split('T')[0] : ''
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const payload = {
          ...values,
          dataConsegna: values.dataConsegna ? new Date(values.dataConsegna).toISOString() : null
        };

        if (isEditing) {
          await updateOrdine(ordine.id, payload);
          toast.success('Ordine aggiornato con successo!');
        } else {
          await createOrdine(payload);
          toast.success('Ordine creato con successo!');
        }
        onSuccess?.();
      } catch (err) {
        toast.error(err.message || 'Errore durante il salvataggio');
      } finally {
        setSubmitting(false);
      }
    }
  });

  return (
    <form onSubmit={formik.handleSubmit} className="ordine-form">
      <div className="form-group">
        <label htmlFor="codice">Codice Ordine *</label>
        <input
          id="codice"
          name="codice"
          type="text"
          placeholder="ORD-2025-001"
          {...formik.getFieldProps('codice')}
          disabled={isEditing}
        />
        {formik.touched.codice && formik.errors.codice && (
          <div className="error">{formik.errors.codice}</div>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="cliente">Cliente *</label>
        <input
          id="cliente"
          name="cliente"
          type="text"
          placeholder="Nome cliente"
          {...formik.getFieldProps('cliente')}
        />
        {formik.touched.cliente && formik.errors.cliente && (
          <div className="error">{formik.errors.cliente}</div>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="descrizione">Descrizione</label>
        <textarea
          id="descrizione"
          name="descrizione"
          rows="3"
          placeholder="Descrizione ordine..."
          {...formik.getFieldProps('descrizione')}
        />
        {formik.touched.descrizione && formik.errors.descrizione && (
          <div className="error">{formik.errors.descrizione}</div>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="dataConsegna">Data Consegna</label>
        <input
          id="dataConsegna"
          name="dataConsegna"
          type="date"
          {...formik.getFieldProps('dataConsegna')}
        />
        {formik.touched.dataConsegna && formik.errors.dataConsegna && (
          <div className="error">{formik.errors.dataConsegna}</div>
        )}
      </div>

      <div className="form-actions">
        <button type="button" onClick={onCancel} className="btn-secondary">
          Annulla
        </button>
        <button type="submit" disabled={formik.isSubmitting} className="btn-primary">
          {formik.isSubmitting ? 'Salvataggio...' : isEditing ? 'Aggiorna' : 'Crea'}
        </button>
      </div>
    </form>
  );
}