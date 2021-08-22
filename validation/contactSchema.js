const Joi = require("joi");

const joiContactSchema = Joi.object({
    name: Joi.string()
        .min(3)
        .max(30)
        .required(),
    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
    phone: Joi.string()
        .pattern(/^[' '\-()0-9]{3,30}$/)
        .required(),
});

module.exports = joiContactSchema;