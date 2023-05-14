import {useState, useEffect} from "react";
import {isEqual} from 'lodash'
import ContactForm from "./ContactForm";
import Filter from "./Filter";
import ContactList from "./ContactList";
import ContactsItem from "./ContactItem";
import s from './ContactForm/contactForm.module.css'

export default function App() {
  const [contacts, setContacts] = useState(() => {
    return JSON.parse(window.localStorage.getItem('contacts')) ?? []
  });
  const [filter, setFilter] = useState('');

  const eraseContact = (elem) => {
   setContacts(state => state.filter(contact => contact.name !== elem),
    );
  }

  const accumulateContacts = (data) => {
    const test = contacts.some((user) => isEqual(data, user));
    !test ? setContacts([data, ...contacts],
    ) : alert(`${data.name} is already in contacts!` )
  }

  const handleFilteredItems = (e) => {
    setFilter(e.currentTarget.value)
  }

  const filteredItems = () => {
    const loweredFilter = filter.toLowerCase();
    return contacts.filter(elem => elem.name.toLowerCase().includes(loweredFilter));
  }

useEffect(() => {
  window.localStorage.setItem('contacts', JSON.stringify(contacts))
}, [contacts]);

  return (
    <div className={s.container}>
      <div className={s.form_container}>
        <h2 className={s.title}>Phonebook</h2>
        <ContactForm data={accumulateContacts} />
        <h2 className={s.title}>Contacts</h2>
        <Filter eventHandler={handleFilteredItems} options={filter} />
      </div>
      <ContactList>
        <ContactsItem erase={eraseContact} filtered={filteredItems} />
      </ContactList>
    </div>
  );
}