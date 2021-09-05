const { User } = require('../../models');
const bcrypt = require('bcryptjs');
const { Unauthorized } = require('http-errors');
const jwt = require('jsonwebtoken');

const login = async (req, res, next) => {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
    if (!user) {
            throw new Unauthorized("Email or password is wrong")
        }
        const hashPassword = user.password;
        const compareData = bcrypt.compareSync(password, hashPassword);
    if (!compareData) {
            throw new Unauthorized("Email or password is wrong")
    }
    
    const payload = {
        id:user._id
    }
    const { SECRET_KEY } = process.env;

    const token = jwt.sign(payload,SECRET_KEY)
        res.json({
            token
        })
}

module.exports = login;
