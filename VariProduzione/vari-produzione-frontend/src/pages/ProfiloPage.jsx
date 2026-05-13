import React, { useState } from 'react';

export default function ProfiloPage() {
  const [user] = useState({
    nome: 'Mario',
    cognome: 'Rossi',
    email: 'mario.rossi@varese.it',
    ruolo: 'Responsabile Produzione',
    competenze: ['CNC', 'CAM', 'Fresatura'],
    dataAssunzione: '15/03/2020',
    efficienza: 94.5,
  });

  const [modifica, setModifica] = useState(false);

  return (
    <div style={{ padding: 30, maxWidth: 800, margin: '0 auto' }}>
      <h1 style={{ color: '#1e40af', marginBottom: 30 }}>👤 Profilo Operatore</h1>

      <div style={{ background: '#ffffff', borderRadius: 16, padding: 30, boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 30 }}>
          <div style={{
            width: 80, height: 80, borderRadius: '50%', background: '#1e40af',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 36, color: '#ffffff',
          }}>
            {user.nome[0]}{user.cognome[0]}
          </div>
          <div>
            <h2 style={{ margin: 0, color: '#111827' }}>{user.nome} {user.cognome}</h2>
            <p style={{ margin: '5px 0', color: '#6b7280' }}>{user.ruolo}</p>
            <span style={{
              display: 'inline-block', padding: '4px 12px', background: '#d1fae5',
              color: '#059669', borderRadius: 20, fontSize: 12, fontWeight: 600,
            }}>
              ● Online
            </span>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
          <div>
            <label style={{ display: 'block', color: '#6b7280', fontSize: 12, marginBottom: 5 }}>Email</label>
            <p style={{ margin: 0, fontWeight: 600, color: '#374151' }}>{user.email}</p>
          </div>
          <div>
            <label style={{ display: 'block', color: '#6b7280', fontSize: 12, marginBottom: 5 }}>Data Assunzione</label>
            <p style={{ margin: 0, fontWeight: 600, color: '#374151' }}>{user.dataAssunzione}</p>
          </div>
          <div>
            <label style={{ display: 'block', color: '#6b7280', fontSize: 12, marginBottom: 5 }}>Efficienza Media</label>
            <p style={{ margin: 0, fontWeight: 600, color: '#059669', fontSize: 18 }}>{user.efficienza}%</p>
          </div>
          <div>
            <label style={{ display: 'block', color: '#6b7280', fontSize: 12, marginBottom: 5 }}>Competenze</label>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {user.competenze.map((c, i) => (
                <span key={i} style={{
                  padding: '4px 10px', background: '#dbeafe', color: '#1e40af',
                  borderRadius: 6, fontSize: 12, fontWeight: 600,
                }}>
                  {c}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div style={{ marginTop: 30, paddingTop: 20, borderTop: '1px solid #e5e7eb' }}>
          <button
            onClick={() => setModifica(!modifica)}
            style={{
              padding: '10px 24px', background: '#1e40af', color: '#ffffff',
              border: 'none', borderRadius: 8, cursor: 'pointer', fontWeight: 600,
            }}
          >
            ✏️ Modifica Profilo
          </button>
        </div>
      </div>
    </div>
  );
}