import express from 'express'
import user from '../controllers/authController.js'
import protect from '../middleware/authMiddleware.js'

const router = express.Router()

router.post('/register', user.register);
router.post('/signin', user.signin);

router.get('/profile', protect, user.getUser);

export default router;