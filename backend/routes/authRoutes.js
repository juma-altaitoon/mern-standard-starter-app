import express from 'express'
import user from '../controllers/authController.js'

const router = express.Router()

router.post('/register', user.register);
router.post('/signin', user.signin);

router.get('/profile', user.getUser);

export default router;