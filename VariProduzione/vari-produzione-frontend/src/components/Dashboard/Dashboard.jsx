import React, { useEffect, useState } from 'react';
import { TrendingUp, AlertCircle, Zap, Clock, Users, BarChart3 } from 'lucide-react';
import './Dashboard.css';
import GanttChart from './GanttChart';
import OrdiniRitardo from './OrdiniRitardo';
import MacchineStatus from './MacchineStatus';
import KpiGrid from './KpiGrid';
// Prima:
import { fetchDashboard } from '../services/api';

// Dopo:
import { getDashboard } from '../services/api';

export default function Dashboard() {
  const [dashboard, setDashboard] = useState(null);
  const [ordiniRitardo, setOrdiniRitardo] = useState([]);
  const [ganttData, setGanttData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        const [dashRes, ritardoRes, ganttRes, alertRes] = await Promise.all([
          fetch('/api/produzione/dashboard'),
          fetch('/api/produzione/ordini-ritardo'),
          fetch('/api/produzione/gantt'),
          fetch('/api/produzione/alerts'),
          fetch('/api/produzione/macchine-status')
        ]);

        if (!dashRes.ok || !ritardoRes.ok || !ganttRes.ok || !alertRes.ok) {
          throw new Error('Errore nel caricamento dati');
        }

        const dashData = await dashRes.json();
        const ritardoData = await ritardoRes.json();
        const ganttDataResp = await ganttRes.json();

        setDashboard(dashData);
        setOrdiniRitardo(ritardoData);
        setGanttData(ganttDataResp);
      } catch (err) {
        setError(err.message);
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    // Refresh ogni 30 secondi per dati real-time
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Caricamento dashboard...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <AlertCircle size={48} />
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      {/* Header */}
      <header className="dashboard-header">
        <div className="header-content">
          <h1>🏭 Gestione Produzione Varese</h1>
          <p className="header-subtitle">Sistema di monitoraggio real-time manifattura</p>
        </div>
        <div className="header-time">
          {new Date().toLocaleDateString('it-IT', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })} • {new Date().toLocaleTimeString('it-IT')}
        </div>
      </header>

      {/* KPI Cards */}
      <section className="kpi-grid">
        <DashboardCard
          icon={BarChart3}
          title="Ordini Totali"
          value={dashboard?.ordiniTotali || 0}
          subtitle="In gestione"
          color="blue"
        />
        <DashboardCard
          icon={AlertCircle}
          title="Ordini in Ritardo"
          value={dashboard?.ordiniInRitardo || 0}
          subtitle="Richiedono attenzione"
          color={dashboard?.ordiniInRitardo > 0 ? 'red' : 'green'}
        />
        <DashboardCard
          icon={Zap}
          title="Task in Corso"
          value={dashboard?.taskInCorsso || 0}
          subtitle="Attualmente attivi"
          color="amber"
        />
        <DashboardCard
          icon={TrendingUp}
          title="Efficienza Globale"
          value={`${dashboard?.efficienza.toFixed(1)}%` || '0%'}
          subtitle="Task completati"
          color="green"
        />
        <DashboardCard
          icon={Clock}
          title="Costi Attuali"
          value={`€${(dashboard?.costiAttuali || 0).toFixed(0)}`}
          subtitle="Budget in uso"
          color="purple"
        />
        <DashboardCard
          icon={Users}
          title="Macchine Operative"
          value={dashboard?.macchineStatus?.filter(m => m.stato === 'Operativa').length || 0}
          subtitle={`di ${dashboard?.macchineStatus?.length || 0}`}
          color="cyan"
        />
      </section>

      {/* Main Grid */}
      <div className="main-grid">
        <div className="left-column">
          {dashboard?.alerts && <AlertList alerts={dashboard.alerts} />}
        </div>
        <div className="right-column">
          {dashboard?.macchineStatus && <MacchineStatus macchine={dashboard.macchineStatus} />}
        </div>
      </div>

      {/* Gantt Chart */}
      {ganttData.length > 0 && <GanttChart data={ganttData} />}

      {/* Ordini Ritardo */}
      {ordiniRitardo && <OrdiniRitardo ordini={ordiniRitardo} />}

      {/* Footer */}
      <footer className="dashboard-footer">
        <p>Sistema di gestione produzione • Varese Manufacturing Suite • v1.0</p>
      </footer>
    </div>
  );
}