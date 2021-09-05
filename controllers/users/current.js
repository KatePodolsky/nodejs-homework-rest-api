const { User } = require('../../models');
const bcrypt = require('bcryptjs');
const { Unauthorized } = require('http-errors');
const jwt = require('jsonwebtoken');

const current = async (req, res, next) => {
        const { token } = req.body;
        const user = await User.findOne({ token });
    if (!user) {
            throw new Unauthorized("Not authorized")
        }
      res.json({
            token
        })   
    
    // const payload = {
    //     id: user._id
    // }
    // const { SECRET_KEY } = process.env;

    // const token = jwt.sign(payload,SECRET_KEY)
    //     res.json({
    //         token
    //     })
}

module.exports = current;
