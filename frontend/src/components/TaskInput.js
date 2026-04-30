import React, { useState } from 'react';
import axios from 'axios';
import './TaskInput.css';

function TaskInput({ onAddTask, aiApiUrl }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [subtasks, setSubtasks] = useState([]);
  const [priority, setPriority] = useState('');
  const [aiLoading, setAiLoading] = useState(false);
  const [aiError, setAiError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim()) {
      onAddTask(title, description);
      setTitle('');
      setDescription('');
      setSubtasks([]);
      setPriority('');
      setAiError('');
    }
  };

  const handleGenerateWithAI = async () => {
    if (!title.trim()) {
      setAiError('Please enter a task title first.');
      return;
    }

    setAiLoading(true);
    setAiError('');

    try {
      const response = await axios.post(aiApiUrl, { title });
      setDescription(response.data.description || '');
      setSubtasks(response.data.subtasks || []);
      setPriority(response.data.priority || '');
    } catch (error) {
      console.error('Error generating task with AI:', error);
      setAiError('Could not generate task details. Please try again.');
    } finally {
      setAiLoading(false);
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

      <button
        className="ai-button"
        type="button"
        onClick={handleGenerateWithAI}
        disabled={aiLoading}
      >
        {aiLoading ? 'Generating...' : 'Generate with AI'}
      </button>

      <label className="field-group">
        <span>Description</span>
        <textarea
          placeholder="Outline the agenda, attach notes, and share the meeting link."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows="4"
        />
      </label>

      {(subtasks.length > 0 || priority) && (
        <div className="ai-result">
          {priority && <p>Priority: {priority}</p>}
          {subtasks.length > 0 && (
            <ul>
              {subtasks.map((subtask, index) => (
                <li key={`${subtask}-${index}`}>{subtask}</li>
              ))}
            </ul>
          )}
        </div>
      )}

      {aiError && <p className="ai-error">{aiError}</p>}

      <button type="submit">Create Task</button>
    </form>
  );
}

export default TaskInput;
