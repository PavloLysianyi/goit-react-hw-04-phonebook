import React, { useState, useEffect } from 'react';
import ContactForm from './ContactForm';
import Filter from './Filter';
import ContactList from './ContactList';

const App = () => {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const storedContacts = localStorage.getItem('contacts');
    if (storedContacts) {
      setContacts(JSON.parse(storedContacts));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const handleFilterChange = event => {
    setFilter(event.target.value);
  };

  const handleAddContact = newContact => {
    const { name } = newContact;
    const isNameExists = contacts.some(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );

    if (isNameExists) {
      alert(`Контакт з ім'ям ${name} вже існує у телефонній книзі.`);
      return;
    }

    setContacts(prevContacts => [...prevContacts, newContact]);
  };

  const handleDeleteContact = id => {
    setContacts(prevContacts =>
      prevContacts.filter(contact => contact.id !== id)
    );
  };

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="container">
      <h1 className="heading">Phonebook</h1>
      <ContactForm onAddContact={handleAddContact} contacts={contacts} />
      <h2 className="sub-heading">Contacts</h2>
      <Filter filter={filter} onFilterChange={handleFilterChange} />
      <ContactList
        contacts={filteredContacts}
        onDeleteContact={handleDeleteContact}
      />
    </div>
  );
};

export default App;
