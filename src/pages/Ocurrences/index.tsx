import React, { FC, useEffect } from 'react';

import { FiPower } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import Map from '../../components/Map';
import OcurrenceList from '../../components/OcurrenceList';

import { useAuth } from '../../hooks/AuthConfig';
import { useOcurrences } from '../../hooks/OcurrencesContext';
import { FiInfo } from 'react-icons/fi';

import {
  Container,
  Header,
  HeaderContent,
  Profile,
  OcurrencesContainer,
  OcurrencesContent,
  MapContainer,
  MapInfoContainer,
  MapInfoContent,
} from './styles';

const Ocurrences: FC = () => {
  const { signOut, user } = useAuth();
  const { ocurrences, getOcurrences, setSelectedItem } = useOcurrences();

  useEffect(() => {
    async function fetchData() {
      await getOcurrences();
    }

    fetchData();
    // eslint-disable-next-line
  }, []);

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
      <MapInfoContainer>
        <MapInfoContent>
          <FiInfo />
          <p>Selecione a posição no mapa para inserir uma nova ocorrência.</p>
        </MapInfoContent>
      </MapInfoContainer>
      <OcurrencesContainer>
        <OcurrencesContent>
          <OcurrenceList
            ocurrences={ocurrences}
            setSelectedItem={setSelectedItem}
          />
          <MapContainer>
            <Map />
          </MapContainer>
        </OcurrencesContent>
      </OcurrencesContainer>
    </Container>
  );
};

export default Ocurrences;
