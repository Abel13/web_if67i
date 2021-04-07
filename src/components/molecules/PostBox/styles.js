import styled from "styled-components";

import Colors from "../../../styles/colors.json";

export const Container = styled.div`
  margin-top: 10px;
  width: 100%;
  border-radius: 10px;
  background-color: ${Colors.dark};
`;

export const ActionButtons = styled.div`
  margin-top: 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  padding-bottom: 10px;
`;

export const ImageContainer = styled.div`
  margin: 10px;
  display: flex;
  justify-content: center;
`;

export const Image = styled.img`
  border: 2px solid ${Colors.whiteTransparent};
  border-radius: 5px;
  padding: 10px;
  max-width: 300px;
  max-height: 300px;
`;
