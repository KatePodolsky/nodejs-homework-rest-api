const { Contact } = require("../../models");

const getAll = async (_, res, next) => {
  try {
    const contacts = await Contact.find({});
    res.json({ contacts });
  }
  catch (error) {
    next(error);
  }
}

module.exports = getAll;