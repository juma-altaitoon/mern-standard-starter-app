import * as jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

module.exports = (req, res, next) => {
    const cookie = req.header("cookie");
    const token = cookie.split('=')[1]
    console.log(token);
    
    if (!token){
        return res.status(401).json({ message: "You are not authorised, API Protected" });
    }
    jwt.verify(
        token,
        process.env.JWT_SECRET,
        (err, user) => {
            console.log(user)
            if (err) {
                return res.status(401).json({ message:"Invalid Token" })
            }
            req.user = user;
        }
    ) 
    next();
}
