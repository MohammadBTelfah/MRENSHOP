const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const multer = require('multer');
const authMiddleware = require('../middleware/authMiddleware');

//upload confing
const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});
const upload = multer({ storage });

router.post('/register', upload.single('profileImage'), userController.register);
router.post('/login', userController.login);
router.get('/profile', authMiddleware, userController.getProfile);

module.exports = router;