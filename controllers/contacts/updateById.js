const contactOperations = require('../../model/index');
const joiContactSchema = require('../../validation/contactSchema');

const updateById = async (req, res, next) => {
  try {
    const { error } = joiContactSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        message: error.message
      })
    }
    const { contactId } = req.params;
    const updateContact = await contactOperations.updateContact(contactId, req.body);
    if (!updateContact) {
      return res.status(404).json({
        'message': 'Not found'
      });
    }
    res.json({
      updateContact
    })
  }
  catch (error) {
    next(error)
  }
}

module.exports = updateById;