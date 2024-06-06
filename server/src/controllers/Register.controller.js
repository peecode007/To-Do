import { validationResult } from "express-validator";
import { jsonGenerate } from "../utils/helpers.js";
import { StatusCode, JWT_TOKEN_SECRET } from "../utils/constants.js";
import bcrypt from 'bcrypt';
import User from "../models/user.js";
import Jwt from 'jsonwebtoken';

const Register = async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.json(jsonGenerate(StatusCode.VALIDATION_ERROR, "Validation error", errors.mapped()));
    }

    const { name, username, password, email } = req.body;

    try {
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        const userExist = await User.findOne({
            $or: [
                { email: email },
                { username: username }
            ]
        });

        if (userExist) {
            return res.json(jsonGenerate(StatusCode.UNPROCESSABLE_ENTITY, "User or Email already exists"));
        }

        // Save to db
        const result = await User.create({
            name,
            email,
            password: hashPassword,
            username
        });

        const token = Jwt.sign({ userId: result._id }, JWT_TOKEN_SECRET);

        return res.json(jsonGenerate(StatusCode.SUCCESS, "Registration successful", { userId: result._id, token }));
    } catch (error) {
        console.log(error);
        return res.json(jsonGenerate(StatusCode.INTERNAL_SERVER_ERROR, "An error occurred during registration"));
    }
}

export default Register;
