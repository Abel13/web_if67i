import React from "react";
import { Link } from "react-router-dom";
import { Container, Image } from "./styles";

const Profile = ({ name, ...rest }) => {
  return (
    <Container>
      <Image {...rest} />
      <div>
        <span>{"Seja bem vindo!"}</span>
        <Link to="/dashboard">
          <strong>{name}</strong>
        </Link>
      </div>
    </Container>
  );
};

export default Profile;
