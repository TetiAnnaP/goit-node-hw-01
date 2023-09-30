import fs from 'fs/promises';
import path from 'path';
import { nanoid } from 'nanoid';

const contactsPath = path.resolve('db', 'contacts.json');
const updateContacts = (allContacts) =>
  fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));

export const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
};

export const getContactById = async (id) => {
  const allContacts = await listContacts();
  const contactById = allContacts.find((contact) => contact.id === id);
  return contactById || null;
};

export const removeContact = async (id) => {
  const allContacts = await listContacts();
  const index = allContacts.findIndex((contact) => contact.id === id);
  if (index === -1) {
    return;
  }
  const [result] = allContacts.splice(index, 1);
  await updateContacts(allContacts);
  return result;
};

export const addContact = async ({ name, email, phone }) => {
  const allContacts = await listContacts();
  const contactExist = allContacts.some((contact) => contact.name === name);
  if (contactExist) {
    return console.log('this name already exists');
  }
  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };

  allContacts.push(newContact);
  await updateContacts(allContacts);
  return newContact || null;
};
