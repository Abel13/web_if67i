import React from 'react';
import { FiLogOut } from 'react-icons/fi';
import { useAuth } from '../../../hooks/Auth';
import { Button, DynamicContent, ButtonBack } from '../../atoms';
import {Profile} from '..';
import { Container, Content } from './styles';

const Header = ({
  backButtonVisible,
  exitButtonVisible,
  profileVisible,
}) => {
  const { user, signOut } = useAuth();
  return (
    <Container>
      <Content>
        <DynamicContent visible={!!backButtonVisible}>
          <ButtonBack />
        </DynamicContent>
        <DynamicContent visible={!!profileVisible}>
          <Profile
            name={user.name}
            src={`https://api.hello-avatar.com/adorables/${user.name}`}
          />
        </DynamicContent>
        <DynamicContent
          visible={!!exitButtonVisible}
          style={{ marginLeft: 'auto' }}
        >
          <Button
            buttonType="transparent"
            onClick={signOut}
          >
            <FiLogOut />
          </Button>
        </DynamicContent>
      </Content> 
    </Container>
  );
};

export default Header;
