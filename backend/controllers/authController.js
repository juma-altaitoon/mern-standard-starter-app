import User from '../models/UserModel.js';

// Register New User
export const register = async (req, res) => {

    const {
        email,
        username,
        password,
        firstName,
        lastName,
        dateOfBirth,
        phoneNumber,
        address,
        socialMedia,
        profilePicture,
        bio,
        isAdmin
    } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
        res.status(400);
        throw new Error("User already exists.");
    }
    await User(req.body).save()
    .then((user)=> {
        res.status(201).json(user)
    })
    .catch ((error) => {
        res.status(400).json({message: "Invalid user data", error});
        throw new Error("Invalid user data");
    })
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
        await user.generateToken()
        .then((token) => {
            res.cookie(
                user.username,
                token,
                {
                    path: "/",
                    expires: new Date ( Date.now() + 3600000 ),
                    httpOnly: true,
                    samesite: 'lax'
                }
            );
            console.log("token generated: ",token)
            return res.status(200).json({ message: "Successfully signed in", user: user._id, token });
        }).catch((error) => {
            console.error(error);
            res.status(500).json({ message: "Server Error" });
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
}

export const getUser = async (req, res) => {
    const userId = req.user.id
    // console.log("req.user.id", req.user.id)
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

export default { register, signin, getUser }