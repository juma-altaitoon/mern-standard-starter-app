import express from 'express'
import user from '../controllers/authController.js'
import protect from '../middleware/authMiddleware.js'
import upload from '../config/multer.js'
const authRouter = express.Router()

authRouter.post('/register', upload.single('avatar'), user.register);
authRouter.post('/signin', user.signin);

authRouter.get('/profile', protect, user.getUser);
authRouter.post('/logout', protect, user.logout);
authRouter.post('/verify-user', protect, user.verifyOTP);
authRouter.post('/forgot-password', user.sendOtp);
authRouter.post('/reset-password', user.passwordReset)


export default authRouter;