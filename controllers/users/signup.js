const fs = require("fs/promises");
const bcrypt = require('bcryptjs');
const { Conflict } = require('http-errors');
const gravatar = require("gravatar");

const { User } = require('../../models');
const path = require("path");

const avatarsDir = path.join(__dirname, "../../", "public/avatars");

const signup = async (req, res, _) => {
    const { email, password } = req.body;
    const userExist = await User.findOne({ email });
    if (userExist) {
        throw new Conflict("Email in use")
    }
    const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(8));
    const defaultAvatar = gravatar.url(email);
    const user = await User.create({ email, password: hashPassword, avatarURL: `https:${defaultAvatar}` });

    const dirPath = path.join(avatarsDir, user._id.toString());
    await fs.mkdir(dirPath);

    res.status(201).json({
        User: {
            email: user.email,
            subscription: user.subscription
        }
    });
};

module.exports =  signup ;