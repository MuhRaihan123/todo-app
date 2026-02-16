const sequelize = require('../config/database');
const Todo = require('./Todo');
const User = require('./User');
const Content = require('./Content');

// ================= RELASI =================

// User - Todo
User.hasMany(Todo, { foreignKey: 'userId', as: 'todos' });
Todo.belongsTo(User, { foreignKey: 'userId', as: 'user' });

// User - Content
User.hasMany(Content, { foreignKey: 'userId', as: 'contents' });
Content.belongsTo(User, { foreignKey: 'userId', as: 'user' });

// ==========================================

const syncDatabase = async () => {
  try {
    await sequelize.sync({ alter: true });
    console.log('✅ Database synced!');
  } catch (error) {
    console.error('❌ Sync failed:', error.message);
  }
};

module.exports = { sequelize, Todo, User, Content, syncDatabase };
