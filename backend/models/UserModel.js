import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3,
        maxlength: 20,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        unique: true,
        minlength: 12,
    },
    firstName: {
        type: String,
        required: true,
        trim: true,
        maxlength: 50,
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        maxlength: 50,
    },
    dateOfBirth: {
        type: Date,
    },
    phoneNumber: {
        type: String,
        unique: true,
        trim: true,
        minlength: 10,
        maxlength: 15,
    },
    address: {
        street: {
            type: String,
            trim: true,
            maxlength: 50,
        },
        city: {
            type: String,
            trim: true,
            maxlength: 50,
        },
        postalCode: {
            type: String,
            trim: true,
            minlength: 4,
            maxlength: 10,
        },
        country: {
            type: String,
            trim: true,
            maxlength: 50,
        },
    },
    socialMedia: {
        type: Map,
        of: String,
        trim: true,
    },
    profilePicture: {
        type: String,
        trim: true,
    },
    bio: {
        type: String,
        trim: true,
        maxlength: 500,
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
}, {timestamps: true}
);

userSchema.pre('save', async function(next){
    if(!this.isModified("password")){
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
})

userSchema.methods.matchPassword = async function (enteredPassword) {
    return bcrypt.compare(enteredPassword, this.password)
}
userSchema.methods.generateToken = async function(){
    // Token Payload
    const payload = {
        id: this.id,
        email: this.email,
    }
    // JWT Secret Key
    const secretKey = process.env.JWT_SECRET;
    const options = {
        expiresIn: '1h',
    }
    const token = await jwt.sign(payload, secretKey, options)
    return token
}

const User = mongoose.model('User', userSchema);
export default User;