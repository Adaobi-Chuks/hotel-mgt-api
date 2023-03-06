import { model, Schema } from 'mongoose';
import constants from "../config/constants.config";
const {ENUM, SALTROUNDS, DATABASES} = constants;
import bcrypt from "bcrypt";

const userSchema = new Schema({
    fullName: {
        type: String, 
        required: true, 
        minlength: 3, 
        maxlength: 100, 
        trim: true
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 60
    },
    age: {
        type: Number,
        required: true,
        min: 18
    },
    nationality: {
        type: String, 
        required: true, 
        trim: true
    },
    role: {
        type: String,
        enum: [ENUM.GUEST, ENUM.ADMIN],
        default: ENUM.GUEST,
        lowercase: true,
        required: true
    },
}, { 
    timestamps: true
});

userSchema.pre('save', async function (next) {
    if (this.isModified('password') || this.isNew) {
        const salt = await bcrypt.genSalt(SALTROUNDS);
        this.password = await bcrypt.hash(this.password, salt);
    }
    next();
});

userSchema.pre("findOneAndUpdate", async function (next) {
    const update: any = this.getUpdate();
    if (update.$set.password) {
        const salt = await bcrypt.genSalt(SALTROUNDS);
        const passwordHash = await bcrypt.hash(update.$set.password, salt);
        this.setUpdate({ $set: {
            password: passwordHash
        }});
    }
    next()
});

const User = model(DATABASES.USER, userSchema);
export default User;