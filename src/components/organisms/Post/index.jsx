import React from 'react';
import * as dayjs from 'dayjs'
import { useAuth } from '../../../hooks/Auth';

import { Container, HeaderText, PostHeader, BodyContent, BodyText, ImageContainer, Image } from './styles';
import { DynamicContent } from '../../atoms';

const Post = ({ text, date, user: postUser, file }) => {
  const { user } = useAuth();

  return (
    <Container>
      <PostHeader>
        <HeaderText>{
          user.secure_id === postUser.user_id ? "Eu" : postUser.name
        }</HeaderText>
        <HeaderText>{
          dayjs(date).format('DD-MMM hh:mm')
        }</HeaderText>
      </PostHeader>
      <BodyContent>
        <BodyText>{text}</BodyText>
        <DynamicContent visible={file}>
          <ImageContainer>
            <Image src={file}/>
          </ImageContainer>
        </DynamicContent>
      </BodyContent>
    </Container>
  );
};

export default Post;
