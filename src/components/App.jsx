import React, { Component } from 'react';
import data from './data/data.json'
import Contacts from './Contacts';
import Forma from './Forma';
import { nanoid } from 'nanoid'
import { Notify } from 'notiflix';
import { Title } from './Wrapper/Wrapper.styled';
import Filter from './Filter';
import Wrapper from './Wrapper';
// import Wrapper from './Wrapper/Wrapper';

  class App extends Component {
    state = {
      contacts: data,
      filter: '',

    };
    // ! ====== Write from localStorage in state (if localStorage data exist)======
    componentDidMount() {
    console.log('App componentDidMount');

    const parsedContacts= JSON.parse(localStorage.getItem('contacts'));

      if (parsedContacts) {
        console.log("write contacts in state from localStorage", parsedContacts);
      this.setState({ contacts: parsedContacts });
    }
  }
    // ! ====== Write any change of state to localStorage ======
    componentDidUpdate(_, prevState) {
      console.log('App componentDidUpdate');

      const nextContacts = this.state.contacts;
      const prevContacts = prevState.contacts;

      if (nextContacts !== prevContacts) {
        console.log('Оновився об"єкт contacts із state, записуємо contacts у  localStorage');
        localStorage.setItem('contacts', JSON.stringify(nextContacts))
      }
    }


    // ! ====== Add contact to state ======
    addNewContact = ({ name, number, contactIsList }) => {
    const newNameToLowerCase = name.toLowerCase();
    const {  contacts } = this.state;

    contacts.forEach(contact => {
      if (contact.name.toLowerCase() === newNameToLowerCase && contact.number === number) {
        Notify.failure(`${contact.name}: ${contact.number} is already in contacts`)
        contactIsList = true;
        return;
      }
      if (contact.number === number) {
        Notify.failure(`${contact.number} existed in contact ${contact.name}`)
        contactIsList = true;
        return;
      }
    });

if (contactIsList) {
      return;
    }
    const newContact = {
      id: nanoid(),
      name: name,
      number: number,
    };

    this.setState(prevState => ({
      contacts: [...prevState.contacts, newContact],
    }));
  };

    // ! ====== Delete contact from state ======

    deleteContact = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),

    }));
  };

    // ! ====== Write a content of filter to state from user ======
    valueInputFilter = event => {
      this.setState({ filter: event.currentTarget.value });
    };

    // ! ====== Function-filter contacts for render ======
    visibleContacts = () => {
    console.log("visibleContacts was to work")
    const { filter, contacts } = this.state;
    const seekLetterOfFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(seekLetterOfFilter)
    );
  };


    render() {
      const { filter } = this.state;
      const visibleContacts = this.visibleContacts();
      return (
        <Wrapper>
          <Title>Phonebook</Title>
          <Forma onSubmit={this.addNewContact} />
          <Title>Contacts</Title>
          <Filter value={filter} onChange={this.valueInputFilter} />
          <Contacts
            contacts={visibleContacts}
            pressDeleteContact={this.deleteContact}
        />
        </Wrapper>

      )
    }
  }


  export default App;
