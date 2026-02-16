const express = require('express');
const jwt = require('jsonwebtoken');
const { User } = require('../models');

const router = express.Router();

// =========== REGISTER ==============
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

      // Validasi
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        error: 'Semua field wajib diisi'
      });
    }

        //  Cek email sudah terdaftar
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        error: 'Email sudah terdaftar'
      });
    }
      
    // Buat User
    const user = await User.create({ name, email, password });

    res.status(201).json({
      success: true,
      message: 'Registrasi berhasil',
      user
    });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

// ============= LOGIN ================
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Cari user
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({
        success: false,
        error: 'Email atau password salah'
      });
    }

      // Cek password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        error: 'Email atau password salah'
      });
    }

     // Generate JWT token
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    res.json({
      success: true,
      message: 'Login berhasil',
      user,
      token
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
