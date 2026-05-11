import { Link } from "react-router-dom"


export default function TasksPage() {
    return (
        <div>
            <h1>Pagina task</h1>
            <br />
            <ul style={{ listStyleType: 'none', padding: 0 }}>
                <li style={{ marginBottom: '0.5rem' }}><Link to="/tasks/overdue">Task Scaduti</Link></li>
                <li style={{ marginBottom: '0.5rem' }}><Link to="/tasks/in-progress">Task in Lavorazione</Link></li>
                <li style={{ marginBottom: '0.5rem' }}><Link to="/tasks/pending">Task in Sospeso</Link></li>
                <li style={{ marginBottom: '0.5rem' }}><Link to="/tasks/completed">Task Completati</Link></li>
                <li style={{ marginBottom: '0.5rem' }}><Link to="/tasks/all">Tutti i Task</Link></li>
            </ul>
            <br />
            <Link to="/">Torna alla Home</Link>
        </div>
    )
}