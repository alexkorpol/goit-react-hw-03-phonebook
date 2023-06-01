import React, { Component } from 'react';
import { Button, Form, Input, Label, Span } from './Forma.styled';
import { nanoid } from 'nanoid'


class Forma extends Component {
  state = {
    name: '',
    number: '',
  };

handleChange = nameValueInput => event => {
    const { target } = event;
    this.setState({
      [nameValueInput]: target.value,
    });
  };


handleSubmit = e => {
    e.preventDefault();
    const { onSubmit } = this.props;
    onSubmit(this.state);
    this.resetForm();
  };

  resetForm = () => {
    this.setState({
      name: '',
      number: '',
    });
  };

  render() {
    const { name, number } = this.state;

    return (
      <Form  onSubmit={this.handleSubmit}>
        <Label htmlFor={nanoid()} >
            <Span>Name</Span>
        </Label>

          <Input
            type="text"
            placeholder="Enter name of contact"
            name="name"
            id={nanoid()}
            value={name}
            onChange={this.handleChange('name')}
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
          />

        <Label htmlFor={nanoid()}>
          <Span>Number</Span>
        </Label>

          <Input
            type="tel"
            placeholder="Enter number of contact"
            name="number"
            id={nanoid()}
            value={number}
            onChange={this.handleChange('number')}
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
          />

        <Button type="submit">Add contact
        </Button>
      </Form>

    )
   }
}

  export default Forma;



