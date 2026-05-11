import React from "react";
import "./Tasks.css";

const TaskForm = () => {
    return (
        <div className="task-form">
            <div className="task-form-content">
                <div className="task-form-actions">
                    <button className="btn-primary">Back</button>
                </div>
                <div className="task-form-card">
                    <div className="task-form-card-content">
                        <div className="task-form-card-actions">
                            <button className="btn-primary">Back</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TaskForm;