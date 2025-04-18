import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const protect = async (req, res, next) => {
    console.log("protect " )
    const token = req.cookies.token
    
    if (!token){
        return res.status(401).json({ message: "You are not authorised, API Protected" });
    }
    try {
        const user = jwt.verify(token, process.env.JWT_SECRET);
        req.user = user;
        console.log("req.user = ", user);
        next();
    } catch (error) {
        if (error.name === 'TokenExpiredError'){
            return res.status(401).json({ message: "Token expired, please log in again." })
        }
        if (error) {
            return res.status(401).json({ message: "Invalid Token, please login." })
        }
    }
}

export default protect;
