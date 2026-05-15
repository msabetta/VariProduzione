import { X } from 'lucide-react';

export default function Modal({ title, isOpen, onClose, children }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h3>{title}</h3>
          <button onClick={onClose} className="btn btn-sm btn-secondary">
            <X size={16} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}