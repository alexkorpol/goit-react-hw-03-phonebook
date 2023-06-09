import React, { Component } from 'react';
import data from './data/data.json'
import Contacts from './Contacts';
import Forma from './Forma';
import { nanoid } from 'nanoid'
import { Notify } from 'notiflix';
import { Title } from './Wrapper/Wrapper.styled';
import Filter from './Filter';
import Wrapper from './Wrapper';

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
    addNewContact = ({ nameNew, numberNew}) => {
      console.log("nameNew, numberNew", nameNew, numberNew);

    const newNameToLowerCase = nameNew.toLowerCase();
      const { contacts } = this.state;

      let index = -1

     index = (contacts.findIndex(({ name, number }) => (name.toLowerCase() === newNameToLowerCase && number === numberNew)))
    if(index !== -1){
        Notify.failure(`${contacts[index].name} and number ${contacts[index].number}   is already in list contacts`);
        console.log("index >>>", index);
        return;
        }

    index = (contacts.findIndex(({ number }) => (number === numberNew)))
    if(index !== -1) {
        Notify.failure(`This number ${contacts[index].number} is already in list contacts ${contacts[index].name}`);
        return;
      }


    const newContact = {
      id: nanoid(),
      name: nameNew,
      number: numberNew,
    };

    this.setState(prevState => ({
      contacts: [...prevState.contacts, newContact],
    }));
  }

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
