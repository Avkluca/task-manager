import React, { useState } from 'react';
import './TaskInput.css';

function TaskInput({ onAddTask }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim()) {
      onAddTask(title, description);
      setTitle('');
      setDescription('');
    }
  };

  return (
    <form className="task-input" onSubmit={handleSubmit}>
      <div className="input-heading">
        <div>
          <p className="input-kicker">Quick capture</p>
          <h2>Add a new task</h2>
        </div>
        <p className="input-note">Start with a short title, then add helpful context if you need it.</p>
      </div>

      <label className="field-group">
        <span>Task title</span>
        <input
          type="text"
          placeholder="Plan sprint review"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </label>

      <label className="field-group">
        <span>Description</span>
        <textarea
          placeholder="Outline the agenda, attach notes, and share the meeting link."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows="4"
        />
      </label>

      <button type="submit">Create Task</button>
    </form>
  );
}

export default TaskInput;
