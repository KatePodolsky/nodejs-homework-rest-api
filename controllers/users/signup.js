const { User } = require('../../models');
const bcrypt = require('bcryptjs');
const { Conflict } = require('http-errors');

const signup = async (req, res, next) => {
        const { email, password } = req.body;
        const userExist = await User.findOne({ email });
    if (userExist) {
            throw new Conflict("Email in use")
        }
        const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(8));

        const user = await User.create({ email, password:hashPassword });
        res.status(201).json({
            user
        });
};

module.exports =  signup ;