import styled, { keyframes } from "styled-components";
import { shade } from "polished";

import Colors from "../../styles/colors.json";

export const Container = styled.div`
  height: 100vh;

  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: ${Colors.secondary};
  border-radius: 10px;
  box-shadow: 0px 0px 5px ${Colors.blackTransparent};

  width: 100%;
  max-width: 500px;
  height: 600px;
`;

const appearFromRight = keyframes`
from{
  opacity: 0;
  transform: translateX(50px);
}
to{
  opacity: 1;
  transform: translateX(0);
}
`;

export const AnimationContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  animation: ${appearFromRight} 1s;

  form {
    margin: 20px 0;
    width: 340px;
    text-align: center;

    h1 {
      margin-bottom: 24px;
    }

    button {
      margin-top: 16px;
    }
  }

  > a {
    color: ${Colors.primary};
    display: block;
    text-decoration: none;
    transition: color 0.2s;

    display: flex;
    align-items: center;

    &:hover {
      color: ${shade(0.2, Colors.primary)};
    }

    svg {
      margin-right: 16px;
    }
  }
`;
