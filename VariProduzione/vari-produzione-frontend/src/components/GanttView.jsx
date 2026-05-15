import { useEffect, useState } from 'react';
import { getGanttData } from '../services/api';
import toast from 'react-hot-toast';

export default function GanttView() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadGanttData();
  }, []);

  const loadGanttData = async () => {
    try {
      const data = await getGanttData();
      setTasks(data.tasks || []);
    } catch (err) {
      toast.error('Errore caricamento dati Gantt');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Caricamento...</div>;

  return (
    <div className="gantt-container">
      <h2>Timeline Produzione</h2>
      <div className="gantt-chart">
        {tasks.map(task => (
          <div key={task.id} className="gantt-bar" style={{
            left: `${calculatePosition(task.inizio)}%`,
            width: `${calculateDuration(task.inizio, task.fine)}%`
          }}>
            <span className="gantt-label">{task.nome}</span>
            <div className="gantt-progress" style={{ width: `${task.progresso}%` }} />
          </div>
        ))}
      </div>
    </div>
  );
}

function calculatePosition(date) {
  // Logica di posizionamento semplificata
  return 0;
}

function calculateDuration(start, end) {
  const hours = (new Date(end) - new Date(start)) / (1000 * 60 * 60);
  return Math.min(hours * 2, 100); // Scala semplificata
}