const express = require('express');
const crypto = require('crypto');
const router = express.Router();
const { getTasksContainer } = require('../config/db');

const mapTask = (task) => ({
  ...task,
  _id: task._id || task.id
});

// GET all tasks
router.get('/', async (req, res) => {
  try {
    const container = getTasksContainer();
    const query = {
      query: 'SELECT * FROM c ORDER BY c.createdAt DESC'
    };
    const { resources } = await container.items.query(query).fetchAll();

    res.json(resources.map(mapTask));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET single task
router.get('/:id', async (req, res) => {
  try {
    const container = getTasksContainer();
    const { resource } = await container.item(req.params.id, req.params.id).read();

    if (!resource) return res.status(404).json({ message: 'Task not found' });

    res.json(mapTask(resource));
  } catch (error) {
    if (error.code === 404) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.status(500).json({ message: error.message });
  }
});

// CREATE task
router.post('/', async (req, res) => {
  if (!req.body.title || !req.body.title.trim()) {
    return res.status(400).json({ message: 'Title is required' });
  }

  const now = new Date().toISOString();
  const id = crypto.randomUUID();
  const task = {
    id,
    _id: id,
    title: req.body.title,
    description: req.body.description || '',
    completed: false,
    createdAt: now,
    updatedAt: now
  };

  try {
    const container = getTasksContainer();
    const { resource } = await container.items.create(task);

    res.status(201).json(mapTask(resource));
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// UPDATE task
router.put('/:id', async (req, res) => {
  try {
    const container = getTasksContainer();
    const { resource: task } = await container.item(req.params.id, req.params.id).read();

    if (!task) return res.status(404).json({ message: 'Task not found' });

    if (req.body.title !== undefined) task.title = req.body.title;
    if (req.body.description !== undefined) task.description = req.body.description;
    if (req.body.completed !== undefined) task.completed = req.body.completed;
    task.updatedAt = new Date().toISOString();

    const { resource } = await container.item(req.params.id, req.params.id).replace(task);

    res.json(mapTask(resource));
  } catch (error) {
    if (error.code === 404) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.status(400).json({ message: error.message });
  }
});

// DELETE task
router.delete('/:id', async (req, res) => {
  try {
    const container = getTasksContainer();
    await container.item(req.params.id, req.params.id).delete();

    res.json({ message: 'Task deleted' });
  } catch (error) {
    if (error.code === 404) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
