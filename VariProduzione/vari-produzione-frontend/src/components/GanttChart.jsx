import { useState, useEffect, useCallback } from 'react';
import { Gantt, ViewMode } from 'gantt-task-react';
import 'gantt-task-react/dist/index.css';
import { getTasks } from '../services/api';
import toast from 'react-hot-toast';

// Helper per parsing sicuro delle date
const parseDate = (dateValue, fallback = new Date()) => {
  if (!dateValue) return fallback;
  const parsed = new Date(dateValue);
  return isNaN(parsed.getTime()) ? fallback : parsed;
};

export default function GanttChart({ tasks: propTasks, viewMode = ViewMode.Day }) {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadTasks = useCallback(async () => {
    try {
      setLoading(true);
      
      if (propTasks && propTasks.length > 0) {
        setTasks(formatTasks(propTasks));
        setLoading(false);
        return;
      }

      const data = await getTasks();
      setTasks(formatTasks(data));
    } catch (err) {
      toast.error('Errore caricamento dati Gantt');
      console.error('Gantt error:', err);
    } finally {
      setLoading(false);
    }
  }, [propTasks]);

  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

  const formatTasks = (rawTasks) => {
    if (!Array.isArray(rawTasks) || rawTasks.length === 0) {
      return [];
    }

    return rawTasks.map((task) => {
      // Parsing sicuro delle date
      const start = parseDate(task.dataInizio, parseDate(task.dataCreazione, new Date()));
      
      // Calcola end: se c'è dataFine, usala; altrimenti aggiungi durata stimata a start
      let end;
      if (task.dataFine) {
        end = parseDate(task.dataFine);
      } else if (task.durataStimataMinuti && task.durataStimataMinuti > 0) {
        end = new Date(start.getTime() + task.durataStimataMinuti * 60000);
      } else {
        end = new Date(start.getTime() + 60 * 60000); // Default 1 ora
      }

      // Colori in base allo stato
      const colors = {
        0: '#6b7280', // DaFare - gray
        1: '#3b82f6', // InCorso - blue
        2: '#10b981', // Completato - green
        3: '#ef4444'  // Bloccato - red
      };

      const progress = calculateProgress(task);

      return {
        start,
        end,
        name: task.titolo || 'Task senza nome',
        id: `Task-${task.id}`,
        type: 'task',
        progress,
        styles: {
          backgroundColor: colors[task.stato] || '#6b7280',
          progressColor: '#1d4ed8',
          progressSelectedColor: '#1e40af',
        },
        dependencies: task.ordineId ? [`Ordine-${task.ordineId}`] : [],
        taskData: task
      };
    });
  };

  const calculateProgress = (task) => {
    if (task.stato === 2) return 100; // Completato
    if (task.stato === 0) return 0;   // DaFare
    if (typeof task.progressoPercentuale === 'number') return task.progressoPercentuale;
    return 50; // Default
  };

  const handleTaskChange = async (task) => {
    console.log('Task modificato:', task);
    toast.success('Modifica registrata (da sincronizzare con il backend)');
  };

  const handleProgressChange = async (task) => {
    console.log('Progresso modificato:', task);
  };

  const handleDoubleClick = (task) => {
    toast(`Task: ${task.name}`, { duration: 3000, icon: 'ℹ️' });
  };

  const handleSelect = (task, isSelected) => {
    console.log(isSelected ? 'Selezionato' : 'Deselezionato', task);
  };

  if (loading) {
    return (
      <div className="card" style={{ minHeight: 400, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div>Caricamento Gantt...</div>
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div className="card">
        <h3>Timeline Produzione</h3>
        <p style={{ color: '#6b7280', marginTop: '1rem' }}>
          Nessun task disponibile per la visualizzazione Gantt.
        </p>
      </div>
    );
  }

  return (
    <div className="card gantt-wrapper">
      <div className="card-header" style={{ marginBottom: '1.5rem' }}>
        <h3>📊 Timeline Produzione</h3>
      </div>

      <div style={{ overflowX: 'auto' }}>
        <Gantt
          tasks={tasks}
          viewMode={viewMode}
          onDateChange={handleTaskChange}
          onProgressChange={handleProgressChange}
          onDoubleClick={handleDoubleClick}
          onSelect={handleSelect}
          listCellWidth="155px"
          columnWidth={60}
          barCornerRadius={4}
          barFill={70}
          rowHeight={50}
          ganttHeight={400}
        />
      </div>

      {/* Legenda */}
      <div style={{ 
        display: 'flex', 
        gap: '1.5rem', 
        marginTop: '1.5rem',
        paddingTop: '1rem',
        borderTop: '1px solid #e5e7eb'
      }}>
        <LegendItem color="#6b7280" label="Da Fare" />
        <LegendItem color="#3b82f6" label="In Corso" />
        <LegendItem color="#10b981" label="Completato" />
        <LegendItem color="#ef4444" label="Bloccato" />
      </div>
    </div>
  );
}

function LegendItem({ color, label }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
      <div style={{ width: 16, height: 16, borderRadius: 4, background: color }} />
      <span style={{ fontSize: '0.875rem', color: '#4b5563' }}>{label}</span>
    </div>
  );
}