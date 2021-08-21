const contactOperations = require('../../model/index')

const getAll = async (req, res, next) => {
  try {
    const contacts = await contactOperations.listContacts();
    res.json({ contacts });
  }
  catch (error) {
    next(error);
  }
}

module.exports = getAll;