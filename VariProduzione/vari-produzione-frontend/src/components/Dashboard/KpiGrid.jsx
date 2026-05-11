import React from 'react';
import './Dashboard.css';

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