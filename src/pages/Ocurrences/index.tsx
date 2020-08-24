import React, { FC } from 'react';

import { FiPower } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import { useAuth } from '../../hooks/AuthConfig';

import { Container, Header, HeaderContent, Profile } from './styles';

const Ocurrences: FC = () => {
  const { signOut, user } = useAuth();

  return (
    <Container>
      <Header>
        <HeaderContent>
          <Profile>
            <div>
              <span>Bem vindo,</span>
              <Link to={'/profile'}>
                <strong>{user.name}</strong>
              </Link>
            </div>
          </Profile>
          <button type="button" onClick={signOut}>
            <FiPower />
          </button>
        </HeaderContent>
      </Header>
    </Container>
  );
};

export default Ocurrences;
