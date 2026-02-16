const express = require('express');
const { Todo } = require('../models');
const { authenticate } = require('../middleware/auth');

const router = express.Router();

// Middleware authenticate untuk semua routes
router.use(authenticate);

// ============= GET ALL TODOS =============
router.get('/', async (req, res) => {
  try {
    const todos = await Todo.findAll({
      where: { userId: req.user.id },
      order: [['createdAt', 'DESC']]
    });

    res.json({ success: true, data: todos });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// ============= GET SINGLE TODO =============
router.get('/:id', async (req, res) => {
  try {
    const todo = await Todo.findOne({
      where: { 
        id: req.params.id,
        userId: req.user.id 
      }
    });

    if (!todo) {
      return res.status(404).json({ 
        success: false, 
        error: 'Todo tidak ditemukan' 
      });
    }

    res.json({ success: true, data: todo });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// ============= CREATE TODO =============
router.post('/', async (req, res) => {
  try {
    const { title, description, priority, dueDate } = req.body;

    // Validasi
    if (!title) {
      return res.status(400).json({
        success: false,
        error: 'Title wajib diisi'
      });
    }

    const todo = await Todo.create({
      title,
      description,
      priority: priority || 'medium',
      dueDate,
      userId: req.user.id
    });

    res.status(201).json({ 
      success: true, 
      message: 'Todo berhasil dibuat',
      data: todo 
    });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

// ============= UPDATE TODO =============
router.put('/:id', async (req, res) => {
  try {
    const { title, description, priority, completed, dueDate } = req.body;

    // Cari todo
    const todo = await Todo.findOne({
      where: { 
        id: req.params.id,
        userId: req.user.id 
      }
    });

    if (!todo) {
      return res.status(404).json({ 
        success: false, 
        error: 'Todo tidak ditemukan' 
      });
    }

    // Update todo
    await todo.update({
      title: title || todo.title,
      description: description !== undefined ? description : todo.description,
      priority: priority || todo.priority,
      completed: completed !== undefined ? completed : todo.completed,
      dueDate: dueDate !== undefined ? dueDate : todo.dueDate
    });

    res.json({ 
      success: true, 
      message: 'Todo berhasil diupdate',
      data: todo 
    });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

// ============= DELETE TODO =============
router.delete('/:id', async (req, res) => {
  try {
    const todo = await Todo.findOne({
      where: { 
        id: req.params.id,
        userId: req.user.id 
      }
    });

    if (!todo) {
      return res.status(404).json({ 
        success: false, 
        error: 'Todo tidak ditemukan' 
      });
    }

    await todo.destroy();

    res.json({ 
      success: true, 
      message: 'Todo berhasil dihapus' 
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;