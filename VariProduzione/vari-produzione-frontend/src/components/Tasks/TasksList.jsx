import React from 'react';
import './Tasks.css';

const TasksList = () => {
    return (
        <div className="tasks-list">
            <div className="tasks-list-content">
                <div className="tasks-list-actions">
                    <button className="btn-primary">Back</button>
                </div>
                <div className="tasks-list-card">
                    <div className="tasks-list-card-content">
                        <div className="tasks-list-card-actions">
                            <button className="btn-primary">Back</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TasksList;