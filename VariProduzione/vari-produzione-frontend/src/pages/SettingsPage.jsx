import { Link } from "react-router-dom";


export default function SettingsPage() {
    return (
        <div>
            <h1>Impostazioni</h1>
            <br />
            <ul style={{ listStyleType: 'none', padding: 0 }}>
                <li style={{ marginBottom: '0.5rem' }}><Link to="/settings/users">Gestione Utenti</Link></li>
                <li style={{ marginBottom: '0.5rem' }}><Link to="/settings/alert-types">Gestione Tipi Alert</Link></li>
                <li style={{ marginBottom: '0.5rem' }}><Link to="/settings/order-types">Gestione Tipi Ordine</Link></li>
                <li style={{ marginBottom: '0.5rem' }}><Link to="/settings/raw-material-types">Gestione Tipi Materie Prime</Link></li>
                <li style={{ marginBottom: '0.5rem' }}><Link to="/settings/machines">Gestione Macchine</Link></li>
                <li style={{ marginBottom: '0.5rem' }}><Link to="/settings/configurations">Gestione Configurazioni</Link></li>
            </ul>
            <br />
            <Link to="/">Torna alla Home</Link>
        </div>
    );
}