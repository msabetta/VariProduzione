import Modal from './Modal';
import { AlertCircle } from 'lucide-react';

export default function ConfirmDialog({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title = 'Conferma', 
  message = 'Sei sicuro?' 
}) {
  return (
    <Modal title={title} isOpen={isOpen} onClose={onClose}>
      <div className="modal-body">
        <p>{message}</p>
      </div>
      <div className="modal-footer">
        <button onClick={onClose} className="btn btn-secondary">Annulla</button>
        <button onClick={onConfirm} className="btn btn-danger">Conferma</button>
      </div>
    </Modal>
  );
}