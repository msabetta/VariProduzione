import { useState, useEffect } from 'react';
import { AlertTriangle, CheckCircle, Clock, Package } from 'lucide-react';
import { getDashboard, getOrdiniRitardo } from '../services/api';
import toast from 'react-hot-toast';
import GanttChart from '../components/GanttChart';
import React from 'react';

export default function DashboardPage() {
  const [dashboard, setDashboard] = useState(null);
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      setLoading(true);
      const [dash, ritardo] = await Promise.all([
        getDashboard(),
        getOrdiniRitardo()
      ]);
      setDashboard(dash);
      setAlerts(ritardo);
    } catch (err) {
      toast.error('Errore caricamento dashboard');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="card">Caricamento dashboard...</div>;

  return (
    <div>
      <div className="page-header">
        <h1>Dashboard</h1>
      </div>

      <div className="stats-grid">
        <StatCard 
          icon={Package} 
          label="Totale Ordini" 
          value={dashboard?.totaleOrdini || 0}
          color="#2563eb"
        />
        <StatCard 
          icon={Clock} 
          label="In Produzione" 
          value={dashboard?.inProduzione || 0}
          color="#f59e0b"
        />
        <StatCard 
          icon={CheckCircle} 
          label="Completati" 
          value={dashboard?.completati || 0}
          color="#10b981"
        />
        <StatCard 
          icon={AlertTriangle} 
          label="In Ritardo" 
          value={dashboard?.inRitardo || 0}
          color="#ef4444"
        />
      </div>

      <div className="card">
        <div className="card-header">
          <h3>⚠️ Ordini in Ritardo</h3>
        </div>
        {alerts.length === 0 ? (
          <p style={{ color: '#6b7280' }}>Nessun ordine in ritardo. Ottimo lavoro!</p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {alerts.map(alert => (
              <div key={alert.id} style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '0.875rem 1rem',
                background: '#fef2f2',
                border: '1px solid #fecaca',
                borderRadius: '8px'
              }}>
                <AlertTriangle size={20} color="#ef4444" />
                <div>
                  <div style={{ fontWeight: 500, color: '#991b1b' }}>{alert.messaggio}</div>
                  <div style={{ fontSize: '0.75rem', color: '#b91c1c' }}>
                    {new Date(alert.data).toLocaleDateString('it-IT')}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        <GanttChart viewMode="Week" />
      </div>
    </div>
  );
}

function StatCard({ icon: Icon, label, value, color }) {
  return (
    <div className="stat-card">
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
        <div style={{
          width: 40,
          height: 40,
          borderRadius: 10,
          background: `${color}15`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <Icon size={20} color={color} />
        </div>
        <span className="label">{label}</span>
      </div>
      <div className="value" style={{ color }}>{value}</div>
    </div>
  );
}