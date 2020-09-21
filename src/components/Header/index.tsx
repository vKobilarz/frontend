import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { FiPower } from 'react-icons/fi';

import { useAuth } from '../../hooks/AuthConfig';

import {
  Header as HeaderStyle,
  HeaderContent,
  Profile,
  UserActions,
} from './styles';

const Header: FC = () => {
  const { signOut, user } = useAuth();

  return (
    <HeaderStyle>
      <HeaderContent>
        <Profile>
          <div>
            <span>Bem vindo,</span>
            <Link to={'/profile'}>
              <strong>{user.name}</strong>
            </Link>
          </div>
        </Profile>
        <UserActions>
          <Link to="/ocurrences">Todas Ocorrências</Link>
          <Link to="/ocurrences/me">Minhas Ocorrências</Link>
          {user.role === 'admin' && (
            <Link to="/ocurrences/admin">Administrar Ocorrências</Link>
          )}
          <button type="button" onClick={signOut}>
            <FiPower />
          </button>
        </UserActions>
      </HeaderContent>
    </HeaderStyle>
  );
};

export default Header;
