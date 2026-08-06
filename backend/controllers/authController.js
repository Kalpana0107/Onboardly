const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const generateToken = (user) => {
    return jwt.sign({
        userId: user._id,
        role: user.role,

    },
        process.env.JWT_SECRET,
        {
            expiresIn: "7d",

        }
    );
};

exports.register = async (req, res) => {
    try {
        const { fullName, email, password, role } = req.body;

        if (!fullName || !email || !password) {
            return res.status(400).json({
                message: " all requires fields must be provided",

            });

        }
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                message: " user already exists",
            });

        }
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            fullName,
            email,
            password: hashedPassword,
            role,

        });

        const token = generateToken(user);

        res.status(201).json({
            token,
            user: {
                id: user._id,
                fullName: user.fullName,
                email: user.email,
                role: user.role,

            },
        });


    } catch (err) {
        console.error(err);

        res.status(500).json({
            message: "server error",

        });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({
                message: " invalid credentials",

            });
        } const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({
                message: " invalid credentials",

            });
        }

        const token = generateToken(user);
        res.json({
            token,
            user: {
                id: user._id,
                fullName: user.fullName,
                email: user.email,
                role: user.role,

            },

        });

    } catch (err) {

        console.error(err);

        res.status(500).json({
            message: " server error",
        });

    }
};

