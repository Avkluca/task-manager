import React from 'react';
import './TaskList.css';

function TaskList({ tasks, onDeleteTask, onToggleTask }) {
  if (tasks.length === 0) {
    return (
      <div className="no-tasks">
        <h3>No tasks yet</h3>
        <p>Add your first task above to start building your workflow.</p>
      </div>
    );
  }

  return (
    <div className="task-list">
      {tasks.map((task) => (
        <div key={task._id} className={`task-item ${task.completed ? 'completed' : ''}`}>
          <div className="task-content">
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => onToggleTask(task._id, task.completed)}
              className="task-checkbox"
            />
            <div className="task-text">
              <div className="task-header">
                <h3>{task.title}</h3>
                <span className={`task-status ${task.completed ? 'done' : 'open'}`}>
                  {task.completed ? 'Done' : 'Active'}
                </span>
              </div>
              {task.description && <p>{task.description}</p>}
            </div>
          </div>
          <button
            className="delete-btn"
            onClick={() => onDeleteTask(task._id)}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default TaskList;
