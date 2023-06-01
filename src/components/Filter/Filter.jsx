import React from 'react';
import { FormFilter, Label } from './Filter.styled';
import { Input } from 'components/Forma/Forma.styled';

const Filter = ({ value, onChange }) => {
  return (
    <FormFilter>
      <Label>
        <Input
          type="name"
          value={value}
          onChange={onChange}
          placeholder="Please enter a name to search"
        />
      </Label>
    </FormFilter>
  );
};



export default Filter;
