import express from 'express'
import user from '../controllers/authController.js'
import protect from '../middleware/authMiddleware.js'

const authRouter = express.Router()

authRouter.post('/register', user.register);
authRouter.post('/signin', user.signin);

authRouter.get('/profile', protect, user.getUser);
authRouter.delete('/logout', protect, user.logout);
authRouter.post('/verify-user', user.verifyOTP);
authRouter.post('/forgot-password', user.sendOtp);
authRouter.post('/reset-password', user.passwordReset)


export default authRouter;