const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Content = sequelize.define('Content', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  section: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true
  },
  data: {
    type: DataTypes.JSON,
    allowNull: false
  }
}, {
  tableName: 'contents',
  timestamps: true
});

module.exports = Content;   // ✅ HARUS SAMA NAMA VARIABELNYA
