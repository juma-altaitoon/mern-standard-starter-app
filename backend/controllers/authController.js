import User from '../models/UserModel.js';
import transporter from '../config/nodemailer.js';
import crypto from 'crypto';

// Part of a future implementation of otp verifications.
const generateOTP = () => {
    // Generate OTP 
    return crypto.randomBytes(3).toString('hex');
};

// Register New User
export const register = async (req, res) => {
    try {
        const {
            email,
            username,
            password,
            firstName,
            lastName,
            dateOfBirth,
            phoneNumber, 
            bio,
        } = req.body;

        const existingUser = await User.findOne({ email });
        console.log(req.body)
        if (existingUser) {
            res.status(400);
            throw new Error("User already exists.");
        }
        // Parse nested fields
        const address = req.body.adress ? JSON.parse(req.body.address) : {};
        const social = req.body.socialMedial ? JSON.parse(req.body.socialMedial) : [];
        const avatar = req.file ? req.file.path : null;

        const user = new User({
            email,
            username,
            password,
            firstName,
            lastName,
            dateOfBirth,
            phoneNumber,
            address,
            social,
            avatar,
            bio,
        });
        
        // // Future implementation of OTP inclusion
        // const otp = generateOTP();
        // user.otp = otp;
        // user.otpExp = Date.now() + (30 * 60 * 1000);
        
        console.log(user)
        const savedUser = await user.save();

        // // Future Implementation of SMTP service that will also be used for OTP.
        // const mailOptions = {
        //     from: process.env.BASE_EMAIL,
        //     to: email,
        //     subject: "Welcome to our Community",
        //     text: `Hello!\nWelcome to our community!\nYour account has been successfully created with the email: ${email}\nYour OTP code is ${otp}.\nPlease verify your account on your next Login.\n\nThnk you for joining us!\n\n Best Regards,\nThe Team `
        // }
        // await transporter.sendMail(mailOptions);

        res.status(201).json({message: "User Registered", savedUser})
    } catch (error) {
        console.error(error);
        res.status(400).json({message: "Invalid user data", error});
    }
    
};

// User Sign In and authentication
export const signin = async (req, res) => {
    const { email, password } = req.body;
    // Validate Input
    if(!email || !password) {
        return res.status(400).json({ message: "All fields are required."})
    }

    try {
        const user = await User.findOne({email});
        if(!user || !(await user.matchPassword(password))){
            console.log("Invalid user or password")
            return res.status(404).json("Invalid Credentials")
        }

        // Generate JWT
        const token = await user.generateToken();
        res.cookie(
            'token',
            token,
            { expires: new Date(Date.now()+ (3600*1000)) , httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: "Strict" }
        );
        res.status(200).json({ message: "Successfully signed in", user: user._id });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
}

export const getUser = async (req, res) => {
    const userId = req.user.id

    try {
        const user = await User.findById(userId, "-password");
        if(user){
            return res.status(200).json({ message: "User Found", user});
        } else {
            console.log("User Not Found");
            res.status(404).json({message: "User Not Found"});
            throw new Error("User Not Found");
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error", error })
    }
};

export const logout = async (req, res) => {
    res.clearCookie('token');
    res.status(200).json({ message: 'Log Out Successful' })
};

// API to support OTP service 
export const verifyOTP = async (req, res) => {
    const {email, otp} = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ messenger: 'User not found'});
        }
        // Check if OTP is valid and not expired
        // Use timingSafeEqual to prevent timing attacks
        if (!crypto.timingSafeEqual(Buffer.from(user.otp), Buffer.from(otp)) || user.otpExp < Date.now()) {
            return res.status(400).json({ message: 'Invalid or Expired OTP' });
        }

        user.isVerified = true;
        user.otp = undefined;
        user.otpExp= undefined;
        await user.save();

        res.status(200).json({ message: "Email successfully verified" });
    } catch (error) {
        res.status(500).json({ message: "Error verifying email", error });
    }
};

// Password Reset Request
export const sendOtp = async (req, res) => {
    const { email } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ messenger: 'User not found'});
        }
        const otp = generateOTP();
        user.otp = otp;
        user.otpExp = Date.now() + (30 * 60 * 1000);
        await user.save();

        // Add nodemailer component
        const mailOptions = {
                from: process.env.BASE_EMAIL,
                to: email,
                subject: "Password Reset Request",
                text: `Hello!\nA password reset request made by ${email}.\nYour OTP code is ${otp}\nPlease use this code to reset your password.\n\nThank you,\nThe Team `
            }
        await transporter.sendMail(mailOptions);
        
        res.status(200).json({ message: 'OTP sent to email'});

    } catch (error) {
        console.error("Error sending OTP: ", error);
        res.status(500).json({ message: 'Error sending OTP', error });
    }
};

export const passwordReset = async (req, res) => {
    const { email, otp, newPassword } = req.body;

    try {
        const user = await User.findOne({ email });

        if(!user) {
            return res.status(400).json({ message: 'User not found' });
        }
        if (!crypto.timingSafeEqual(Buffer.from(user.otp), Buffer.from(otp)) || user.otpExp < Date.now()) {
            return res.status(400).json({ message: "Invalid OTP"});
        }

        user.password = newPassword;
        user.otp = undefined;
        user.otpExp = undefined;
        await user.save();

        res.status(200).json({ message: "Password Reset Successful"});

    } catch (error) {
        res.status(500).json({ message: "Error resetting password", error });
    }

};


export default { register, signin, getUser, logout, verifyOTP, sendOtp, passwordReset };