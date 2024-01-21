import React, { useState } from 'react';
import { nanoid } from 'nanoid';

const ContactForm = ({ onAddContact }) => {
  const [formData, setFormData] = useState({ name: '', number: '' });

  const handleInputChange = event => {
    const { name, value } = event.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleAddContact = () => {
    const { name, number } = formData;

    if (name.trim() === '' || number.trim() === '') {
      alert("Будь ласка, введіть ім'я та номер контакту.");
      return;
    }

    const newContact = {
      id: nanoid(),
      name,
      number,
    };

    onAddContact(newContact);
    setFormData({ name: '', number: '' });
  };

  return (
    <div className="form-container">
      <label className="label">
        Ім'я контакту:
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          required
          className="input"
        />
      </label>
      <label className="label">
        Номер телефону:
        <input
          type="tel"
          name="number"
          value={formData.number}
          onChange={handleInputChange}
          required
          className="input"
        />
      </label>
      <button type="button" onClick={handleAddContact} className="button">
        Додати контакт
      </button>
    </div>
  );
};

export default ContactForm;
