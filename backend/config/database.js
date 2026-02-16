// Import Sequelize
const { Sequelize } = require('sequelize');

// Load environment Variables
require('dotenv').config();

// Buat instance Sequelize untuk PostgreSQL
const sequelize = new Sequelize(
    process.env.DB_NAME,     // postgres
    process.env.DB_USER,     // postgres.mntrqfdrfwdptvgbyqsh
    process.env.DB_PASSWORD, // password dari Supabase
    {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT || 5432, // ⚠️ UBAH INI: dari 5432 ke 6543
        dialect: 'postgres',
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false // Diperlukan untuk Supabase
            }
        },
        // Tambahan config untuk stabilitas
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        },
        logging: false // Matikan log SQL query (optional)
    }
);

// Test koneksi
const testConnection = async () => {
    try {
        await sequelize.authenticate();
        console.log('✅ Database connected successfully!');
    } catch (error) {
        console.error('❌ Database connection failed:', error.message);
    }
};

// Jalankan test
testConnection();

// Export untuk digunakan di file Lain
module.exports = sequelize;