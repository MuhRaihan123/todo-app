const express = require('express');
const { Content } = require('../models');
const { authenticate } = require('../middleware/auth');

const router = express.Router();

// Get /api/cms/:section - Public
router.get('/:section', async (req, res ) => {
    try {
        const content = await Content.findOne({
    where: { section: req.params.section }
 });

        if (!content) {
            return res.status(404).json({ success: false, error: 'Not found' });
        }

        res.json({ success: true, data: content.data });   
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// PUT/api/cms/:section - Protected (admin only)
router.put('/:section', authenticate, async (req, res) => { 
 try {
   const [content, created] = await Content.upsert({
    section: req.params.section,
    data: req.body
}, { returning: true }); // pastikan mengembalikan instance terbaru

res.json({
    success: true,
    message: created ? 'Created' : 'Updated',
    data: req.body // bisa langsung kirim body, atau content.data
});

 } catch (error) {
    res.status(400).json({ success: false, error: error.message });
 }
});

module.exports = router;