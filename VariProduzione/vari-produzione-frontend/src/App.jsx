import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Dashboard from './pages/DashboardPage';
import OrdiniList from './pages/OrdiniList';
import OrdiniForm from './pages/OrdiniForm';
import MacchineList from './pages/MacchineList';
import MacchineForm from './pages/MacchineForm';
import OperatoriList from './pages/OperatoriList';
import OperatoriForm from './pages/OperatoriForm';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        <nav className="sidebar">
          <div className="logo">VariProduzione</div>
          <ul>
            <li><Link to="/">Dashboard</Link></li>
            <li><Link to="/ordini">Ordini</Link></li>
            <li><Link to="/ordini/new">Nuovo Ordine</Link></li>
            <li><Link to="/macchine">Macchine</Link></li>
            <li><Link to="/macchine/new">Nuova Macchina</Link></li>
            <li><Link to="/operatori">Operatori</Link></li>
            <li><Link to="/operatori/new">Nuovo Operatore</Link></li>
          </ul>
        </nav>

        <main className="content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/ordini" element={<OrdiniList />} />
            <Route path="/ordini/new" element={<OrdiniForm />} />
            <Route path="/macchine" element={<MacchineList />} />
            <Route path="/macchine/new" element={<MacchineForm />} />
            <Route path="/operatori" element={<OperatoriList />} />
            <Route path="/operatori/new" element={<OperatoriForm />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
