import React, { useState, useRef, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import Dashboard from './pages/DashboardPage';
import OrdiniPage from './pages/OrdiniPage';
import MachinePage from './pages/MachinePage';
import ImpostazioniPage from './pages/ImpostazioniPage';
import DatabasePage from './pages/DatabasePage';
import ProfiloPage from './pages/ProfiloPage';
import './App.css';

function NavButton({ to, children }) {
  const location = useLocation();
  const isActive = location.pathname === to;
  
  return (
    <Link
      to={to}
      style={{
        display: 'inline-block',
        padding: '10px 20px',
        margin: '0 5px',
        borderRadius: '8px',
        textDecoration: 'none',
        fontWeight: '600',
        fontSize: '14px',
        transition: 'all 0.3s ease',
        background: isActive ? '#ffffff' : 'transparent',
        color: isActive ? '#1e40af' : '#ffffff',
        border: isActive ? '2px solid #ffffff' : '2px solid transparent',
        boxShadow: isActive ? '0 2px 8px rgba(0,0,0,0.2)' : 'none',
      }}
      onMouseEnter={(e) => {
        if (!isActive) e.target.style.background = 'rgba(255,255,255,0.15)';
      }}
      onMouseLeave={(e) => {
        if (!isActive) e.target.style.background = 'transparent';
      }}
    >
      {children}
    </Link>
  );
}

function AppContent() {
  const [showSettings, setShowSettings] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const settingsRef = useRef(null);
  const userRef = useRef(null);
  const navigate = useNavigate();

  // Chiudi menu cliccando fuori
  useEffect(() => {
    function handleClickOutside(event) {
      if (settingsRef.current && !settingsRef.current.contains(event.target)) {
        setShowSettings(false);
      }
      if (userRef.current && !userRef.current.contains(event.target)) {
        setShowUserMenu(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleBackup = () => {
    alert('💾 Backup del database avviato!\n\nFile: VariProduzione_backup_' + new Date().toISOString().slice(0,10) + '.bak');
    setShowSettings(false);
  };

  const handleLogout = () => {
    if (confirm('🚪 Sei sicuro di voler uscire?')) {
      alert('Logout effettuato con successo!');
      navigate('/');
    }
    setShowUserMenu(false);
  };

  return (
    <div style={{ minHeight: '100vh', background: '#f5f7fa' }}>
      <nav style={{
        background: 'linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)',
        padding: '0 30px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        position: 'sticky',
        top: 0,
        zIndex: 1000,
      }}>
        <div style={{
          maxWidth: 1400,
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          height: 70,
        }}>
          {/* Logo con menu ingranaggio */}
          <div ref={settingsRef} style={{ display: 'flex', alignItems: 'center', gap: 12, position: 'relative' }}>
            <button
              onClick={() => setShowSettings(!showSettings)}
              style={{
                width: 40,
                height: 40,
                background: '#ffffff',
                borderRadius: 10,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 20,
                border: 'none',
                cursor: 'pointer',
                transition: 'transform 0.3s',
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'rotate(90deg)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'rotate(0deg)'}
              title="Impostazioni"
            >
              ⚙️
            </button>
            
            {showSettings && (
              <div style={{
                position: 'absolute',
                top: 50,
                left: 0,
                background: '#ffffff',
                borderRadius: 12,
                boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
                padding: '8px 0',
                minWidth: 220,
                zIndex: 2000,
              }}>
                <div style={{ padding: '8px 16px', color: '#6b7280', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  Configurazione
                </div>
                
                <button onClick={() => { navigate('/impostazioni'); setShowSettings(false); }} style={menuItemStyle}>
                  <span style={menuIconStyle}>⚙️</span>
                  <span>Impostazioni Generali</span>
                </button>
                
                <button onClick={() => { navigate('/database'); setShowSettings(false); }} style={menuItemStyle}>
                  <span style={menuIconStyle}>🗄️</span>
                  <span>Gestione Database</span>
                </button>
                
                <div style={{ borderTop: '1px solid #e5e7eb', margin: '6px 0' }}></div>
                
                <button onClick={handleBackup} style={menuItemStyle}>
                  <span style={menuIconStyle}>💾</span>
                  <span>Backup Dati</span>
                </button>
              </div>
            )}

            <h1 style={{
              margin: 0,
              color: '#ffffff',
              fontSize: 22,
              fontWeight: 700,
              letterSpacing: '0.5px',
            }}>
              Varese Production System
            </h1>
          </div>

          {/* Menu bottoni */}
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <NavButton to="/">🏠 Home</NavButton>
            <NavButton to="/ordini">📋 Ordini di Lavoro</NavButton>
            <NavButton to="/macchine">🔧 Macchine</NavButton>
          </div>

          {/* User menu */}
          <div ref={userRef} style={{ position: 'relative' }}>
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                background: 'rgba(255,255,255,0.15)',
                padding: '6px 14px',
                borderRadius: 20,
                color: '#ffffff',
                fontSize: 13,
                border: 'none',
                cursor: 'pointer',
                transition: 'background 0.3s',
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.25)'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.15)'}
            >
              <span>👤</span>
              <span>Operatore</span>
              <span style={{ fontSize: 10, marginLeft: 4 }}>▼</span>
            </button>

            {showUserMenu && (
              <div style={{
                position: 'absolute',
                top: 45,
                right: 0,
                background: '#ffffff',
                borderRadius: 12,
                boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
                padding: '8px 0',
                minWidth: 200,
                zIndex: 2000,
              }}>
                <div style={{ padding: '12px 16px', borderBottom: '1px solid #e5e7eb' }}>
                  <div style={{ fontWeight: 600, color: '#111827', fontSize: 14 }}>Mario Rossi</div>
                  <div style={{ color: '#6b7280', fontSize: 12 }}>mario.rossi@varese.it</div>
                </div>
                
                <button onClick={() => { navigate('/profilo'); setShowUserMenu(false); }} style={menuItemStyle}>
                  <span style={menuIconStyle}>👤</span>
                  <span>Il Mio Profilo</span>
                </button>
                
                <button onClick={() => { navigate('/impostazioni'); setShowUserMenu(false); }} style={menuItemStyle}>
                  <span style={menuIconStyle}>🔧</span>
                  <span>Preferenze</span>
                </button>
                
                <div style={{ borderTop: '1px solid #e5e7eb', margin: '6px 0' }}></div>
                
                <button onClick={handleLogout} style={{...menuItemStyle, color: '#dc2626'}}>
                  <span style={menuIconStyle}>🚪</span>
                  <span>Logout</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>

      <main style={{
        maxWidth: 1400,
        margin: '30px auto',
        padding: '0 30px',
      }}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/ordini" element={<OrdiniPage />} />
          <Route path="/macchine" element={<MachinePage />} />
          <Route path="/impostazioni" element={<ImpostazioniPage />} />
          <Route path="/database" element={<DatabasePage />} />
          <Route path="/profilo" element={<ProfiloPage />} />
          <Route path="*" element={
            <div style={{
              textAlign: 'center',
              padding: 80,
              background: '#ffffff',
              borderRadius: 16,
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            }}>
              <h2 style={{ color: '#dc2626', fontSize: 48, margin: 0 }}>404</h2>
              <p style={{ color: '#6b7280', fontSize: 18 }}>Pagina non trovata</p>
              <Link to="/" style={{
                display: 'inline-block',
                marginTop: 20,
                padding: '12px 24px',
                background: '#1e40af',
                color: '#ffffff',
                borderRadius: 8,
                textDecoration: 'none',
                fontWeight: 600,
              }}>
                ← Torna alla Home
              </Link>
            </div>
          } />
        </Routes>
      </main>

      <footer style={{
        background: '#1f2937',
        color: '#9ca3af',
        textAlign: 'center',
        padding: '20px',
        marginTop: 50,
        fontSize: 13,
      }}>
        © 2024 Varese Production System — Vari Produzione
      </footer>
    </div>
  );
}

// Stili condivisi per i menu
const menuItemStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: 10,
  width: '100%',
  textAlign: 'left',
  padding: '10px 16px',
  color: '#374151',
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  fontSize: 14,
  transition: 'background 0.2s',
};

const menuIconStyle = {
  fontSize: 16,
  width: 20,
  textAlign: 'center',
};

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}