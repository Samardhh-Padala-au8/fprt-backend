const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
    },
    isActive: { type: String, default: true },
    role:{
        type:String,
        default:"buyer"
    },
    tokens: [
        {
            token: {
                type: String,
                required: true,
            },
        },
    ],
}, { timestamps: true })

userSchema.pre("save", async function (next) {
    const user = this;
    if (user.isModified("password")) {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
    }
    next();
});

userSchema.methods.generateAuthToken = async function () {
    // Generate an auth token for the user
    const user = this;
    const token = jwt.sign({ _id: user._id }, process.env.JWT_KEY, { expiresIn: "6h" });
    user.tokens = user.tokens.concat({ token });
    await user.save();
    return token;
};

userSchema.statics.findByCredentials = async function (email, password) {
    // Search for a user by email and check if password matched.
    const user = await User.findOne({ email });
    if (user) {
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (isPasswordMatch) {
            return user;
        }
        else {
            return 'password incorrect'
        }
    }
};

const User = mongoose.model("buyer", userSchema);

module.exports = User;