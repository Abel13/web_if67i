import React from 'react';

import { Body } from './styles';

const Tooltip = ({ title, className, children }) => {
  return (
    <Body className={className}>
      {children}
      <span>{title}</span>
    </Body>
  );
};

export default Tooltip;
