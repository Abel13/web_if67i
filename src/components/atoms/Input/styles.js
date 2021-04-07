import styled, { css } from "styled-components";

import Colors from "../../../styles/colors.json";
import Tooltip from "../Tooltip";

export const Container = styled.div`
  background: ${Colors.inputs};
  border-radius: 2px;
  border: 2px solid ${Colors.inputs};
  padding: 16px;
  width: 100%;
  color: ${Colors.grayHard};

  display: flex;
  align-items: center;

  & + div {
    margin-top: 8px;
  }

  ${(props) =>
    props.gotError &&
    css`
      transition: border-bottom-color 0.8s;

      border-bottom-color: ${Colors.danger};
    `}

  ${(props) =>
    props.isFocused &&
    css`
      transition: border-bottom-color 0.8s;

      border-bottom-color: ${Colors.primary};
      color: ${Colors.primary};
    `}

  ${(props) =>
    props.isFilled &&
    css`
      color: ${Colors.primary};
    `}

  input {
    flex: 1;
    border: 0;
    background: transparent;

    ${(props) =>
      props.disabled
        ? css`
            color: ${Colors.grayHard};
          `
        : css`
            color: ${Colors.light};
          `}

    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }

    &::placeholder {
      color: ${Colors.grayHard};
    }
  }

  svg {
    margin-right: 16px;
  }
`;

export const Currency = styled.div`
  margin-right: 10px;
`;

export const Error = styled(Tooltip)`
  height: 20px;
  margin-left: 16px;

  svg {
    margin: 0;
  }

  span {
    background: ${Colors.danger};

    &::before {
      border-color: ${Colors.danger} transparent;
    }
  }
`;
