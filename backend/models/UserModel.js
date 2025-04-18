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
        match: [ /^\S+@\S+\.\S+$/, 'Please use a valid email address.'],
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
        trim: true,
        minlength: 10,
        maxlength: 15,
        default:"0000-0000-00",
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
    social: {
        type: Map,
        of: String,
        trim: true,
    },
    avatar: {
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
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    otp: {
        type: String,
    },
    otpExp: {
        type: Date
    },
}, {timestamps: true}
);

userSchema.pre('save', async function(next){
    if(!this.isModified("password")){
        return next();
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
        username:this.username,

    }
    // JWT Secret Key
    const secretKey = process.env.JWT_SECRET;
    const options = {
        expiresIn: '1h',
    }
    const token = await jwt.sign(payload, secretKey, options)
    return token
}

userSchema.set('toJSON', {
    transform:(doc, ret) => {
        delete ret.password;
        return ret;
    },
});
userSchema.index({ email: 1 });
userSchema.index({ username: 1});

const User = mongoose.model('User', userSchema);
export default User;