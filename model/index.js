const fs = require('fs/promises')
const contacts = require('./contacts.json')
const path = require("path");
const { v4 } = require("uuid");

const contactsPath = path.join(__dirname, "/contacts.json");

const listContacts = async () => {
  try {
        const data = await fs.readFile(contactsPath);
        const contacts = JSON.parse(data)
        return contacts
      }
  catch (error) {
       throw error;
      }}

const getById = async (contactId) => {
  try {
        const contacts = await listContacts();
        const selectContact = contacts.find(item => item.id === +contactId)
        if (!selectContact) {
            return null
        }
        return selectContact
    }
    catch (error) {
        throw error
    }
}

const addContact = async (body) => {
  try {
        const newContact = {
            id: v4(),
            ...body
        }
        const contacts = await listContacts();
        contacts.push(newContact);
        const contactsString = JSON.stringify(contacts);
        await fs.writeFile(contactsPath, contactsString);
        return newContact;
    }
    catch (error) {
         throw error
    }
}

const removeContact = async (contactId) => {
   try {
        const contacts = await listContacts();
        const idx = contacts.findIndex(item => item.id === +contactId);
        if (idx === -1) {
            return null
        }
        const newContacts = contacts.filter(item => item.id !== +contactId);
        const contactsString = JSON.stringify(newContacts);
        await fs.writeFile(contactsPath, contactsString);
        return contacts[idx];

    }
    catch (error) {
        throw error
    }
}

const updateContact = async (contactId, body) => {
  try {
    const contacts = await listContacts();
      const idx = contacts.findIndex(item => item.id === +contactId);
        if (idx === -1) {
            return null
    }
    contacts[idx] = { ...contacts[idx], ...body };
    const contactsString = JSON.stringify(contacts);
    await fs.writeFile(contactsPath, contactsString);
    return contacts[idx]
  }
  catch (error) {
     throw error
  }
}

module.exports = {
  listContacts,
  getById,
  removeContact,
  addContact,
  updateContact,
}
