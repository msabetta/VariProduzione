import React, { useState } from 'react';

export default function ImpostazioniPage() {
  const [settings, setSettings] = useState({
    lingua: 'it',
    tema: 'chiaro',
    notifiche: true,
    refreshAuto: 30,
  });

  const handleChange = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const salva = () => {
    localStorage.setItem('vps_settings', JSON.stringify(settings));
    alert('Impostazioni salvate con successo!');
  };

  return (
    <div style={{ padding: 30, maxWidth: 800, margin: '0 auto' }}>
      <h1 style={{ color: '#1e40af', marginBottom: 30 }}>⚙️ Impostazioni Generali</h1>

      <div style={{ background: '#ffffff', borderRadius: 16, padding: 30, boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
        <h3 style={{ marginTop: 0, color: '#374151' }}>Preferenze Applicazione</h3>

        <div style={{ marginBottom: 20 }}>
          <label style={{ display: 'block', marginBottom: 8, fontWeight: 600, color: '#4b5563' }}>Lingua</label>
          <select
            value={settings.lingua}
            onChange={(e) => handleChange('lingua', e.target.value)}
            style={{ padding: 10, borderRadius: 8, border: '1px solid #d1d5db', width: '100%' }}
          >
            <option value="it">🇮🇹 Italiano</option>
            <option value="en">🇬🇧 English</option>
            <option value="de">🇩🇪 Deutsch</option>
          </select>
        </div>

        <div style={{ marginBottom: 20 }}>
          <label style={{ display: 'block', marginBottom: 8, fontWeight: 600, color: '#4b5563' }}>Tema</label>
          <select
            value={settings.tema}
            onChange={(e) => handleChange('tema', e.target.value)}
            style={{ padding: 10, borderRadius: 8, border: '1px solid #d1d5db', width: '100%' }}
          >
            <option value="chiaro">☀️ Chiaro</option>
            <option value="scuro">🌙 Scuro</option>
          </select>
        </div>

        <div style={{ marginBottom: 20 }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={settings.notifiche}
              onChange={(e) => handleChange('notifiche', e.target.checked)}
            />
            <span style={{ fontWeight: 600, color: '#4b5563' }}>Abilita notifiche push</span>
          </label>
        </div>

        <div style={{ marginBottom: 30 }}>
          <label style={{ display: 'block', marginBottom: 8, fontWeight: 600, color: '#4b5563' }}>
            Refresh automatico dashboard (secondi)
          </label>
          <input
            type="number"
            value={settings.refreshAuto}
            onChange={(e) => handleChange('refreshAuto', parseInt(e.target.value))}
            style={{ padding: 10, borderRadius: 8, border: '1px solid #d1d5db', width: 150 }}
          />
        </div>

        <button
          onClick={salva}
          style={{
            padding: '12px 30px',
            background: '#1e40af',
            color: '#ffffff',
            border: 'none',
            borderRadius: 8,
            fontWeight: 600,
            cursor: 'pointer',
            fontSize: 16,
          }}
        >
          💾 Salva Impostazioni
        </button>
      </div>

      <div style={{ background: '#ffffff', borderRadius: 16, padding: 30, marginTop: 20, boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
        <h3 style={{ marginTop: 0, color: '#374151' }}>ℹ️ Informazioni Sistema</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <tbody>
            <tr><td style={{ padding: '8px 0', color: '#6b7280' }}>Versione</td><td style={{ padding: '8px 0', fontWeight: 600 }}>1.1.0</td></tr>
            <tr><td style={{ padding: '8px 0', color: '#6b7280' }}>Ambiente</td><td style={{ padding: '8px 0', fontWeight: 600 }}>Produzione</td></tr>
            <tr><td style={{ padding: '8px 0', color: '#6b7280' }}>Database</td><td style={{ padding: '8px 0', fontWeight: 600 }}>SQL Server</td></tr>
            <tr><td style={{ padding: '8px 0', color: '#6b7280' }}>Ultimo backup</td><td style={{ padding: '8px 0', fontWeight: 600 }}>{new Date().toLocaleDateString('it-IT')}</td></tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}