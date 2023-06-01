import React from 'react';
import { Item, List } from './Contacts.styled';
import { Button, Span } from 'components/Forma/Forma.styled';
import PropTypes from 'prop-types';

const Contacts = ({ contacts, pressDeleteContact }) => {
  return (
    <List>
      {contacts.map(({ id, name, number }) => (
        <Item key={id}>
          {name + ' : ' + number}
          <Button type="button"
            onClick={() => pressDeleteContact(id)}
          >
            <Span>Delete</Span>
          </Button>
        </Item>
      ))}
    </List>
  );
};

Contacts.propTypes = {
  contacts: PropTypes.array.isRequired
};

export default Contacts;





