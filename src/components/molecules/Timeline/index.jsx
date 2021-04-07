import React from "react";
import { Link } from "react-router-dom";
import { Container } from "./styles";

const Timeline = ({ children }) => {
  return (
    <Container>
      {children}
    </Container>
  );
};

export default Timeline;
