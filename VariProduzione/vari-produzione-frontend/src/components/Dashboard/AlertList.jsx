import React from "react";
import { AlertCircle } from 'lucide-react';

const AlertList = ({ alerts }) => (
  <div className="alerts-container">
    <h2>⚠️ Alert Critici</h2>
    <div className="alerts-list">
      {alerts.slice(0, 5).map((alert, idx) => (
        <div key={idx} className={`alert alert-level-${alert.severita}`}>
          <AlertCircle size={18} />
          <div className="alert-content">
            <span className="alert-type">{alert.tipoAlert.toUpperCase()}</span>
            <p>{alert.messaggio}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
);


export default AlertList;