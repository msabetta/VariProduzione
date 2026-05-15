import React from 'react';
import { AlertCircle } from 'lucide-react';

const OrdiniRitardo = ({ ordini }) => (
  <div className="ritardo-container">
    <h2>🔴 Ordini in Ritardo</h2>
    <div className="ritardo-list">
      {ordini.length === 0 ? (
        <p className="no-data">✅ Nessun ordine in ritardo!</p>
      ) : (
        ordini.map(o => (
          <div key={o.id} className="ritardo-item">
            <div className="ritardo-header">
              <span className="ordine-numero">{o.numero}</span>
              <span className="cliente">{o.cliente}</span>
            </div>
            <div className="ritardo-details">
              <p><strong>Scadenza:</strong> {new Date(o.dataScadenza).toLocaleDateString('it-IT')}</p>
              <p><strong>Progresso:</strong> {o.progressoPercentuale}%</p>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: `${o.progressoPercentuale}%` }}></div>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  </div>
);

export default OrdiniRitardo;