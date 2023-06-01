import React from 'react';
import { Container } from './Wrapper.styled';
import PropTypes from 'prop-types';

 const Wrapper = ({ children }) => {
  return (
    <Container>
      <main>{children}</main>
    </Container>
  );
};

Wrapper.propTypes = {
   children: PropTypes.any.isRequired,
};

export default Wrapper;
