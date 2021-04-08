import styled, { css } from "styled-components";
import Colors from "../../../styles/colors.json";

export const Container = styled.div`
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  /* align-items: center; */
  background-color: ${Colors.dark};
  border-radius: 10px;
  padding: 0px 0px 10px 0px;
`;

export const PostHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-radius: 10px 10px 0px 0px;
  background-color: ${Colors.blackTransparent};
`;

export const HeaderText = styled.span`
  font-size: 10px;
  color: ${Colors.gray};
  margin: 10px;
`;

export const BodyContent = styled.div`
  margin: 10px;
`;

export const BodyText = styled.span`
  font-size: 15px;
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
