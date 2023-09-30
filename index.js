import * as contactsServise from './contacts.js';
import { program } from 'commander';

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case 'list':
      const contactsList = await contactsServise.listContacts();
      return console.table(contactsList);

    case 'getById':
      const contactById = await contactsServise.getContactById(id);
      return console.log(contactById);

    case 'remove':
      const removedContact = await contactsServise.removeContact(id);
      return console.log(removedContact);

    case 'add':
      const newContact = await contactsServise.addContact({
        name,
        email,
        phone,
      });
      return console.log(newContact);
    default:
      console.log('unknown action');
  }
};

program
  .option('--action <type>')
  .option('--id <type>')
  .option('--name <type>')
  .option('--email <type>')
  .option('--phone <type>');

program.parse();
const option = program.opts();
invokeAction(option);
