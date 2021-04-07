import React from 'react';
import * as dayjs from 'dayjs'
import { useAuth } from '../../../hooks/Auth';

import { Container, HeaderText, PostHeader, BodyContent, BodyText } from './styles';

const Post = ({ text, date, user: postUser, file }) => {
  const { user } = useAuth();

  console.log(user.secure_id , postUser)

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
      </BodyContent>
    </Container>
  );
};

export default Post;
