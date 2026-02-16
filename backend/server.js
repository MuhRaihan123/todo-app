require('dotenv').config();
const express = require('express');
const cors = require('cors');

const { syncDatabase } = require('./models');

// Import Routes
const todoRoutes = require('./routes/todos');
const authRoutes = require('./routes/auth');
const dashboardRoutes = require('./routes/dashboard');
const cmsRoutes = require('./routes/cms');

const app = express();

app.use(cors());
app.use(express.json());

syncDatabase();

// Root endpoint
app.get('/', (req, res) => {
  res.json({ message: 'Todo API Server' });
});

console.log('authRoutes:', typeof authRoutes);
console.log('todoRoutes:', typeof todoRoutes);
console.log('dashboardRoutes:', typeof dashboardRoutes);

// ================= ROUTES =================
app.use('/api/auth', authRoutes);
app.use('/api/todos', todoRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/cms', cmsRoutes);


// 404 handler (HARUS PALING BAWAH)
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint tidak ditemukan' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log('🚀 Server running on port ' + PORT);
});
