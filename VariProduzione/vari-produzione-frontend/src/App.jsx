import React from 'react';
import { Routes, Route, NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  ClipboardList, 
  Wrench, 
  CheckSquare, 
  Settings,
  Database,
  BarChart3
} from 'lucide-react';
import DashboardPage from './pages/DashboardPage';
import OrdiniPage from './pages/OrdiniPage';
import MacchinePage from './pages/MacchinePage';
import TasksPage from './pages/TasksPage';
import GanttPage from './pages/GanttPage';
import ImpostazioniPage from './pages/ImpostazioniPage';

function Sidebar() {
  const navItems = [
    { to: '/', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/ordini', icon: ClipboardList, label: 'Ordini' },
    { to: '/macchine', icon: Wrench, label: 'Macchine' },
    { to: '/tasks', icon: CheckSquare, label: 'Task' },
    { to: '/gantt', icon: BarChart3, label: 'Gantt' },
    { to: '/impostazioni', icon: Settings, label: 'Impostazioni' },
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <Database size={24} />
        VariProduzione
      </div>
      <nav>
        <ul className="sidebar-nav">
          {navItems.map(item => (
            <li key={item.to}>
              <NavLink to={item.to} end={item.to === '/'}>
                <item.icon size={20} />
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}

export default function App() {
  return (
    <div className="app-container">
      <Sidebar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/ordini" element={<OrdiniPage />} />
          <Route path="/macchine" element={<MacchinePage />} />
          <Route path="/tasks" element={<TasksPage />} />
          <Route path="/gantt" element={<GanttPage />} />
          <Route path="/impostazioni" element={<ImpostazioniPage />} />
        </Routes>
      </main>
    </div>
  );
}