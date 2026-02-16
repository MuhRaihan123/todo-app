// Import DataTypes dari Sequelize
const { DataTypes } = require('sequelize');

// Import koneksi database
const sequelize = require('../config/database');

// Definisikan Model Todo
const Todo = sequelize.define('Todo', {
  // Kolom id (otomatis sebagai primary key)
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  
  // Kolom title
  title: {
   type: DataTypes.STRING(255),
    allowNull: false,  // Wajib diisi
    validate: {
      notEmpty: {
        msg: 'Title tidak boleh kosong'
      }
    }
  },
  
  // Kolom completed
  completed: {
    type: DataTypes.BOOLEAN,
    defaultValue: false  // Default: belum selesai
  },
  
  // Kolom priority
  priority: {
    type: DataTypes.ENUM('low', 'medium', 'high'),
    defaultValue: 'medium'
  }
}, {
  // Opsi tambahan
  tableName: 'todos',  // Nama tabel di database
  timestamps: true     // Aktifkan createdAt & updatedAt
});

// Export model
module.exports = Todo;