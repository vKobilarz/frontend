import React, { FC, useEffect } from 'react';

import Map from '../../components/Map';
import Header from '../../components/Header';
import OcurrenceList from '../../components/OcurrenceList';

import { useOcurrences } from '../../hooks/OcurrencesContext';
import { FiInfo } from 'react-icons/fi';

import {
  Container,
  OcurrencesContainer,
  OcurrencesContent,
  MapContainer,
  MapInfoContainer,
  MapInfoContent,
} from './styles';

const Ocurrences: FC = () => {
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
      <Header />
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
