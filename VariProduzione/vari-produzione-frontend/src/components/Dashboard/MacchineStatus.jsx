import React from 'react';

const MacchineStatus = ({ macchine }) => (
  <div className="macchine-container">
    <h2>📊 Status Macchine</h2>
    <div className="macchine-grid">
      {macchine.map(m => (
        <div key={m.id} className={`macchina-card stato-${m.stato.toLowerCase()}`}>
          <div className="macchina-header">
            <h4>{m.nome}</h4>
            <span className={`badge-stato stato-${m.stato.toLowerCase()}`}>
              {m.stato}
            </span>
          </div>
          <div className="macchina-details">
            <div className="utilizzo-bar">
              <div 
                className="utilizzo-fill" 
                style={{ width: `${m.tassoUtilizzo}%` }}
              ></div>
            </div>
            <span className="utilizzo-text">{m.tassoUtilizzo.toFixed(1)}% utilizzo</span>
          </div>
          <p className="task-in-esecuzione">
            Attuale: {m.taskInEsecuzione}
          </p>
        </div>
      ))}
    </div>
  </div>
);

export default MacchineStatus;