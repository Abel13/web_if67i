import styled, { css } from "styled-components";

import { lighten, shade } from "polished";

import Colors from "../../../styles/colors.json";

const buttonTypeVariations = {
  default: css`
    display: flex;
    justify-content: center;
    align-items: center;
    background: ${Colors.primary};
    color: ${Colors.light};
    width: 100%;
    height: 50px;

    &:hover {
      background: ${shade(0.2, Colors.primary)};
    }
  `,
  danger: css`
    background: ${Colors.danger};
    color: ${Colors.light};
    width: 100%;

    &:hover {
      background: ${shade(0.2, Colors.danger)};
    }
  `,
  transparent: css`
    background: ${Colors.transparent};
    padding: 5px;
    color: ${Colors.primary};
    font-size: 20px;
    transition: color 0.2s;

    &:hover {
      color: ${lighten(0.3, Colors.primary)};
    }
  `,
  smallRounded: css`
    color: ${Colors.white};
    background-color: ${Colors.primary};
    border-radius: 50%;
    width: 48px;
    height: 48px;

    &:hover {
      background: ${shade(0.2, Colors.primary)};
      color: ${shade(0.2, Colors.white)};
    }
  `,
};

export const Container = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 2px;
  border: 0;
  transition: background-color 0.2s;

  ${(props) => buttonTypeVariations[props.buttonType || "default"]}
`;
