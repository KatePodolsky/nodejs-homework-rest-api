const contactOperations = require('../../model/index');
const joiContactSchema = require('../../validation/contactSchema');

const add = async (req, res, next) => {
  try {
    const { error } = joiContactSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        'message':'missing required name field'
      })
    }
    const newContact = await contactOperations.addContact(req.body);
    res.status(201).json({
      newContact
    });
  }
  catch (error) {
    next(error)
  }
}

module.exports = add;