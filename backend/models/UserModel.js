import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import validator from 'validator';


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
        validate: [ validator.isEmail, 'Please use a valid email address.'],
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
        default: null,
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
        validate: {
            validator: function(value) {
                return Object.values(value).every((url) => validator.isURL(url))
            }
        },
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
    const saltRounds = process.env.SALT_ROUNDS || 10;
    const salt = await bcrypt.genSalt(saltRounds);
    this.password = await bcrypt.hash(this.password, salt);
})

userSchema.methods.matchPassword = async function (enteredPassword) {
    return  await bcrypt.compare(enteredPassword, this.password)
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
        expiresIn: process.env.JWT_EXPIRY || '1h',
    }
    const token = await jwt.sign(payload, secretKey, options)
    return token
}

userSchema.set('toJSON', {
    transform:(doc, ret) => {
        delete ret.password;
        delete ret.otp;
        delete ret.otpExp;
        delete ret.isAdmin
        return ret;
    },
});
userSchema.index({ email: 1 });
userSchema.index({ username: 1});
userSchema.index({ isVerified: 1});

const User = mongoose.model('User', userSchema);
export default User;