import React, { useState, useEffect } from 'react';

export default function DatabasePage() {
  const [tables, setTables] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulazione dati - in produzione chiamerebbe l'API
    setTimeout(() => {
      setTables([
        { nome: 'Ordini', record: 3, dimensione: '24 KB', ultimaModifica: '13/05/2026 10:30' },
        { nome: 'Tasks', record: 1, dimensione: '8 KB', ultimaModifica: '13/05/2026 10:30' },
        { nome: 'Macchine', record: 5, dimensione: '16 KB', ultimaModifica: '13/05/2026 10:30' },
        { nome: 'Operatori', record: 3, dimensione: '12 KB', ultimaModifica: '13/05/2026 10:30' },
      ]);
      setLoading(false);
    }, 500);
  }, []);

  const eseguiBackup = () => {
    alert('🔄 Backup del database avviato!\n\nFile: VariProduzione_backup_' + new Date().toISOString().slice(0,10) + '.bak');
  };

  const eseguiVacuum = () => {
    alert('🧹 Ottimizzazione database completata!');
  };

  if (loading) return <div style={{ padding: 30 }}>Caricamento...</div>;

  return (
    <div style={{ padding: 30, maxWidth: 1000, margin: '0 auto' }}>
      <h1 style={{ color: '#1e40af', marginBottom: 30 }}>🗄️ Gestione Database</h1>

      {/* Azioni rapide */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 15, marginBottom: 30 }}>
        <button onClick={eseguiBackup} style={{
          padding: 20, background: '#059669', color: '#ffffff', border: 'none', borderRadius: 12,
          cursor: 'pointer', fontSize: 16, fontWeight: 600,
        }}>
          💾 Backup Ora
        </button>
        <button onClick={eseguiVacuum} style={{
          padding: 20, background: '#7c3aed', color: '#ffffff', border: 'none', borderRadius: 12,
          cursor: 'pointer', fontSize: 16, fontWeight: 600,
        }}>
          🧹 Ottimizza
        </button>
        <button onClick={() => alert('Ripristino avviato...')} style={{
          padding: 20, background: '#dc2626', color: '#ffffff', border: 'none', borderRadius: 12,
          cursor: 'pointer', fontSize: 16, fontWeight: 600,
        }}>
          ⏪ Ripristina
        </button>
      </div>

      {/* Tabelle */}
      <div style={{ background: '#ffffff', borderRadius: 16, padding: 25, boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
        <h3 style={{ marginTop: 0, color: '#374151' }}>Tabelle del Database</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: 15 }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #e5e7eb' }}>
              <th style={{ textAlign: 'left', padding: '12px', color: '#6b7280' }}>Tabella</th>
              <th style={{ textAlign: 'right', padding: '12px', color: '#6b7280' }}>Record</th>
              <th style={{ textAlign: 'right', padding: '12px', color: '#6b7280' }}>Dimensione</th>
              <th style={{ textAlign: 'left', padding: '12px', color: '#6b7280' }}>Ultima Modifica</th>
            </tr>
          </thead>
          <tbody>
            {tables.map((t, i) => (
              <tr key={i} style={{ borderBottom: '1px solid #f3f4f6' }}>
                <td style={{ padding: '12px', fontWeight: 600 }}>{t.nome}</td>
                <td style={{ padding: '12px', textAlign: 'right' }}>{t.record}</td>
                <td style={{ padding: '12px', textAlign: 'right', color: '#6b7280' }}>{t.dimensione}</td>
                <td style={{ padding: '12px', color: '#6b7280', fontSize: 13 }}>{t.ultimaModifica}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}