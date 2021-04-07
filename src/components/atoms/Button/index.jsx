import React from 'react';
import { Container } from './styles';

import { Loading } from '..';

const Button = ({
  children,
  buttonType,
  loading,
  ...rest
}) => (
  <Container type="button" buttonType={buttonType} {...rest}>
    {loading ? (
      <Loading loading color="text" size={20} type="puff" />
    ) : (
      children
    )}
  </Container>
);

export default Button;
