import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import GanttChart from '../components/GanttChart';

export default function GanttPage() {
  const navigate = useNavigate();

  return (
    <div>
      <div className="page-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <button 
            className="btn btn-secondary"
            onClick={() => navigate('/')}
          >
            <ArrowLeft size={18} />
          </button>
          <h1>Diagramma di Gantt</h1>
        </div>
      </div>

      <GanttChart viewMode="Day" />
    </div>
  );
}