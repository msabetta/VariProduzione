import React, { useEffect, useState } from 'react';
import { fetchDashboard } from '../services/api';

export default function DashboardPage() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDashboard()
      .then(setData)
      .catch(err => setError(err.message));
  }, []);

  if (error) return <div style={{color:'red', padding:20}}>Errore: {error}</div>;
  if (!data) return <div style={{padding:20}}>Caricamento...</div>;

  return (
    <div style={{padding:20, fontFamily:'Arial, sans-serif', maxWidth:1200, margin:'0 auto'}}>
      <h1 style={{color:'#1e40af', marginBottom:30}}>Dashboard di Controllo della Produzione</h1>
      
      {/* KPI Cards */}
      <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(250px, 1fr))', gap:20, marginBottom:30}}>
        <div style={{background:'#1e40af', color:'white', padding:20, borderRadius:12, boxShadow:'0 4px 6px rgba(0,0,0,0.1)'}}>
          <h3 style={{margin:0, fontSize:14, opacity:0.9}}>Ordini Totali</h3>
          <p style={{fontSize:36, fontWeight:'bold', margin:'10px 0 0 0'}}>{data.ordiniTotali}</p>
        </div>
        
        <div style={{background:'#dc2626', color:'white', padding:20, borderRadius:12, boxShadow:'0 4px 6px rgba(0,0,0,0.1)'}}>
          <h3 style={{margin:0, fontSize:14, opacity:0.9}}>Ordini in Ritardo</h3>
          <p style={{fontSize:36, fontWeight:'bold', margin:'10px 0 0 0'}}>{data.ordiniInRitardo}</p>
        </div>
        
        <div style={{background:'#059669', color:'white', padding:20, borderRadius:12, boxShadow:'0 4px 6px rgba(0,0,0,0.1)'}}>
          <h3 style={{margin:0, fontSize:14, opacity:0.9}}>Task in Corso</h3>
          <p style={{fontSize:36, fontWeight:'bold', margin:'10px 0 0 0'}}>{data.taskInCorso}</p>
        </div>
        
        <div style={{background:'#7c3aed', color:'white', padding:20, borderRadius:12, boxShadow:'0 4px 6px rgba(0,0,0,0.1)'}}>
          <h3 style={{margin:0, fontSize:14, opacity:0.9}}>Efficienza</h3>
          <p style={{fontSize:36, fontWeight:'bold', margin:'10px 0 0 0'}}>{data.efficienza?.toFixed(1)}%</p>
        </div>
      </div>

      {/* Costi */}
      <div style={{background:'#f3f4f6', padding:20, borderRadius:12, marginBottom:30}}>
        <h3 style={{margin:'0 0 10px 0', color:'#374151'}}>Costi Attuali</h3>
        <p style={{fontSize:24, fontWeight:'bold', color:'#1e40af', margin:0}}>
          €{data.costiAttuali?.toLocaleString('it-IT', {minimumFractionDigits:2, maximumFractionDigits:2})}
        </p>
      </div>

      {/* Alert */}
      <div style={{background:'#fef3c7', padding:20, borderRadius:12, border:'1px solid #f59e0b'}}>
        <h3 style={{margin:'0 0 15px 0', color:'#92400e'}}>⚠️ Alert Attivi</h3>
        {data.alerts?.map((alert, idx) => (
          <div key={idx} style={{
            padding:12, 
            marginBottom:8, 
            borderRadius:8, 
            background: alert.severita === 3 ? '#fee2e2' : '#fed7aa',
            color: alert.severita === 3 ? '#991b1b' : '#9a3412',
            fontWeight: alert.severita === 3 ? 'bold' : 'normal'
          }}>
            {alert.messaggio}
          </div>
        ))}
      </div>

      {/* Macchine */}
      <div style={{marginTop:30}}>
        <h3 style={{color:'#374151'}}>Stato Macchine</h3>
        <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(200px, 1fr))', gap:15}}>
          {data.macchineStatus?.map(macchina => (
            <div key={macchina.id} style={{
              padding:15, 
              borderRadius:8, 
              background: macchina.stato === 1 ? '#d1fae5' : '#fee2e2',
              border: `2px solid ${macchina.stato === 1 ? '#059669' : '#dc2626'}`
            }}>
              <strong>{macchina.nome}</strong>
              <p style={{margin:'5px 0', fontSize:12, color:'#6b7280'}}>
                Stato: {macchina.stato === 1 ? 'Operativa' : 'Guasto/Manutenzione'}
              </p>
              <p style={{margin:0, fontSize:12}}>Utilizzo: {macchina.tassoUtilizzo}%</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}