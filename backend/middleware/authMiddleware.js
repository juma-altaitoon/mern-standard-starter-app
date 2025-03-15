import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const protect = async (req, res, next) => {
    console.log("protect " )
    const token = req.cookies.token
    
    if (!token){
        return res.status(401).json({ message: "You are not authorised, API Protected" });
    }
    jwt.verify(
        token,
        process.env.JWT_SECRET,
        (err, user) => {
            // console.log("-", user)
            if (err) {
                return res.status(401).json({ message:"Invalid Token" })
            }
            console.log("--", user)
            req.user = user;
        }
    ) 
    next();
}

export default protect;
