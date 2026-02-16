const express = require('express');
const { Todo, User } = require('../models');
const { authenticate } = require('../middleware/auth');

const router = express.Router();

router.use(authenticate);

// GET /api/dashboard/stats
router.get('/stats', async (req, res) => {
  try {
    const totalUsers = await User.count();
    const totalTodos = await Todo.count();
    const completedTodos = await Todo.count({ where: { completed: true } });
    const pendingTodos = totalTodos - completedTodos;
    
    res.json({
      success: true,
      data: {
        totalUsers,
        totalTodos,
        completedTodos,
        pendingTodos,
        completionRate: totalTodos > 0 
          ? Math.round((completedTodos / totalTodos) * 100) 
          : 0
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// GET /api/dashboard/todos - semua todos
router.get('/todos', async (req, res) => {
  try {
    const todos = await Todo.findAll({
      include: [{ model: User, as: 'user', attributes: ['id', 'name', 'email'] }],
      order: [['createdAt', 'DESC']]
    });
    res.json({ success: true, data: todos });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// GET /api/dashboard/users
router.get('/users', async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ['password'] },
      order: [['createdAt', 'DESC']]
    });
    res.json({ success: true, data: users });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;