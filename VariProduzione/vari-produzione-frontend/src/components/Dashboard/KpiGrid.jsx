import React from 'react';
import './Dashboard.css';
import { AlertCircle } from 'lucide-react';
// Prima:
import { fetchDashboard } from '../services/api';

// Dopo:
import { getDashboard } from '../services/api';

const KpiGrid = ({ icon: Icon, title, value, subtitle, color = 'blue' }) => (
    <div className={`dashboard-card card-${color}`}>
        <div className="card-header">
            <Icon className="card-icon" />
            <h3>{title}</h3>
        </div>
        <div className="card-value">{value}</div>
        {subtitle && <p className="card-subtitle">{subtitle}</p>}
    </div>
);

export default KpiGrid;