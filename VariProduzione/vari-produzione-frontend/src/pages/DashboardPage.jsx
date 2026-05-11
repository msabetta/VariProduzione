import React, { useState, useEffect } from 'react';
import { getDashboardData } from '../services/dashboardService';

const DashboardPage = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await getDashboardData();
                setData(res);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) return <div className="loader">Caricamento dashboard...</div>;
    if (!data) return <div>Errore nel caricamento dei dati.</div>;

    return (
        <div className="dashboard-container">
            <h1>Dashboard Produzione</h1>
            
            <div className="kpi-grid">
                <div className="kpi-card">
                    <h3>Ordini Totali</h3>
                    <p className="kpi-value">{data.ordiniTotali}</p>
                </div>
                <div className="kpi-card danger">
                    <h3>Ordini in Ritardo</h3>
                    <p className="kpi-value">{data.ordiniInRitardo}</p>
                </div>
                <div className="kpi-card info">
                    <h3>Task in Corso</h3>
                    <p className="kpi-value">{data.taskInCorsso}</p>
                </div>
                <div className="kpi-card success">
                    <h3>Efficienza</h3>
                    <p className="kpi-value">{data.efficienza.toFixed(1)}%</p>
                </div>
            </div>

            <section className="alerts-section">
                <h2>Alert Attivi</h2>
                <ul className="alert-list">
                    {data.alerts.map((alert, idx) => (
                        <li key={idx} className={`alert-item severity-${alert.severita}`}>
                            {alert.messaggio}
                        </li>
                    ))}
                </ul>
            </section>
        </div>
    );
};

export default DashboardPage;
