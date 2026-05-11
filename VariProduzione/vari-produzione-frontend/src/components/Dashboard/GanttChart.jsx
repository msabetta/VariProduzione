import React from 'react';
import './Dashboard.css';

const GanttChart = ({ data }) => {
  const getWeeks = () => {
    const weeks = [];
    const start = new Date(Math.min(...data.map(d => new Date(d.dataInizio))));
    const end = new Date(Math.max(...data.map(d => new Date(d.dataFine))));
    
    let current = new Date(start);
    while (current < end) {
      weeks.push(new Date(current));
      current.setDate(current.getDate() + 7);
    }
    return weeks;
  };

  const calculatePosition = (date, weeks) => {
    const start = new Date(weeks[0]);
    const diff = new Date(date) - start;
    const weekWidth = 100 / weeks.length;
    return (diff / (7 * 24 * 60 * 60 * 1000)) * weekWidth;
  };

  const calculateWidth = (start, end, weeks) => {
    const totalDays = (new Date(end) - new Date(start)) / (24 * 60 * 60 * 1000);
    const totalWeeks = weeks.length;
    return (totalDays / (totalWeeks * 7)) * 100;
  };

  const weeks = getWeeks();

  return (
    <div className="gantt-container">
      <h2>📅 Timeline Produzione (Gantt)</h2>
      <div className="gantt-wrapper">
        <div className="gantt-header">
          <div className="gantt-label-col">Task</div>
          <div className="gantt-timeline">
            {weeks.map((week, idx) => (
              <div key={idx} className="gantt-week">
                {week.toLocaleDateString('it-IT', { day: '2-digit', month: '2-digit' })}
              </div>
            ))}
          </div>
        </div>

        <div className="gantt-body">
          {data.map(task => (
            <div key={task.id} className="gantt-row">
              <div className="gantt-label-col">
                <span className="task-name">{task.nome}</span>
                <span className="task-progress">{task.progresso}%</span>
              </div>
              <div className="gantt-timeline">
                <div
                  className="gantt-bar"
                  style={{
                    left: `${calculatePosition(task.dataInizio, weeks)}%`,
                    width: `${calculateWidth(task.dataInizio, task.dataFine, weeks)}%`,
                    backgroundColor: task.colore,
                  }}
                  title={`${task.nome}: ${task.dataInizio.split('T')[0]} → ${task.dataFine.split('T')[0]}`}
                >
                  <div className="bar-progress" style={{ width: `${task.progresso}%` }}></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GanttChart;

