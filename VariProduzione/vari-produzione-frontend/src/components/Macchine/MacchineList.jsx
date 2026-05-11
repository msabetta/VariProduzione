import React from 'react';
import './Macchine.css';

const MacchineList = ({ macchine }) => (
    <div className="macchine-list">
        {macchine.length === 0 ? (
            <p className="no-data">✅ Nessuna macchina trovata!</p>
        ) : (
            macchine.map(m => (
                <div key={m.id} className="macchina-item">
                    <div className="macchina-header">
                        <span className="macchina-numero">{m.numero}</span>
                        <span className="macchina-tipo">{m.tipo}</span>
                    </div>
                    <div className="macchina-details">
                        <p><strong>Stato:</strong> {m.stato}</p>
                        <p><strong>Progresso:</strong> {m.progressoPercentuale}%</p>
                        <div className="progress-bar">
                            <div className="progress-fill" style={{ width: `${m.progressoPercentuale}%` }}></div>
                        </div>
                    </div>
                </div>
            ))
        )}
    </div>
);

export default MacchineList;