const jwt = require('jsonwebtoken');
const { User } = require('../models');

const authenticate = async (req, res, next) => {
  try {
    // Ambil token dari header
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        error: 'Token tidak ditemukan'
      });
    }
    
    const token = authHeader.split(' ')[1];

    // ✅ Tambahkan sementara console
console.log("TOKEN DARI HEADER:", token);
console.log("JWT_SECRET YANG DIPAKAI:", process.env.JWT_SECRET);
    
    // Verifikasi token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Cari user
    const user = await User.findByPk(decoded.id);
    if (!user) {
      return res.status(401).json({
        success: false,
        error: 'User tidak ditemukan'
      });
    }
    
    // Simpan user di request
    req.user = user;
    next();
 } catch (error) {

  // ✅ TAMBAHKAN DI SINI (BARIS PERTAMA DALAM CATCH)
  console.log("ERROR VERIFY:", error.message);

  if (error.name === 'TokenExpiredError') {
    return res.status(401).json({
      success: false,
      error: 'Token expired'
    });
  }

  res.status(401).json({
    success: false,
    error: 'Token tidak valid'
  });
}
};

module.exports = { authenticate };