import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TaskInput from './components/TaskInput';
import TaskList from './components/TaskList';
import './App.css';

const API_URL = process.env.REACT_APP_API_URL;
console.log("API URL:", API_URL);

function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const completedCount = tasks.filter((task) => task.completed).length;
  const pendingCount = tasks.length - completedCount;

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get(API_URL);
      setTasks(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching tasks:', error);
      setLoading(false);
    }
  };

  const addTask = async (title, description) => {
    try {
      await axios.post(API_URL, { title, description });
      fetchTasks();
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setTasks(tasks.filter((task) => task._id !== id));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const toggleTask = async (id, completed) => {
    try {
      const response = await axios.put(`${API_URL}/${id}`, { completed: !completed });
      setTasks(tasks.map((task) => (task._id === id ? response.data : task)));
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  return (
    <div className="App">
      <div className="app-shell">
        <section className="hero-card">
          <div className="hero-copy">
            <p className="eyebrow">Focused workflow</p>
            <h1>Task Manager</h1>
            <p className="hero-text">
              Keep priorities visible, capture ideas quickly, and move through your day with a cleaner task board.
            </p>
          </div>

          <div className="hero-stats">
            <div className="stat-card">
              <span className="stat-value">{tasks.length}</span>
              <span className="stat-label">Total tasks</span>
            </div>
            <div className="stat-card">
              <span className="stat-value">{pendingCount}</span>
              <span className="stat-label">In progress</span>
            </div>
            <div className="stat-card">
              <span className="stat-value">{completedCount}</span>
              <span className="stat-label">Completed</span>
            </div>
          </div>
        </section>

        <TaskInput onAddTask={addTask} />

        <section className="tasks-panel">
          <div className="section-heading">
            <div>
              <p className="section-kicker">Today&apos;s board</p>
              <h2>Your tasks</h2>
            </div>
            {!loading && (
              <span className="task-badge">
                {tasks.length} {tasks.length === 1 ? 'item' : 'items'}
              </span>
            )}
          </div>

          {loading ? (
            <p className="loading-state">Loading tasks...</p>
          ) : (
            <TaskList
              tasks={tasks}
              onDeleteTask={deleteTask}
              onToggleTask={toggleTask}
            />
          )}
        </section>
      </div>
    </div>
  );
}

export default App;
