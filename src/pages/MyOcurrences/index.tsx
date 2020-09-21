import React, { FC, useEffect } from 'react';

import { FiInfo } from 'react-icons/fi';

import Map from '../../components/Map';
import Header from '../../components/Header';
import OcurrenceList from '../../components/OcurrenceList';

import { useOcurrences } from '../../hooks/OcurrencesContext';

import {
  Container,
  OcurrencesContainer,
  OcurrencesContent,
  MapContainer,
  MapInfoContainer,
  MapInfoContent,
} from './styles';
import Button from '../../components/Button';
import { Link } from 'react-router-dom';

const MyOcurrences: FC = () => {
  const {
    ocurrences,
    getMyOcurrences,
    setUniqueSelectedItem,
    deleteOcurrence,
  } = useOcurrences();

  useEffect(() => {
    async function fetchData() {
      await getMyOcurrences();
    }

    fetchData();
    // eslint-disable-next-line
  }, []);

  function handleDeleteClick() {
    const ocurrence = ocurrences.filter(o => o.selected)[0];

    deleteOcurrence(ocurrence);
  }

  return (
    <Container>
      <Header />
      <MapInfoContainer>
        {ocurrences.filter(o => o.selected)[0] ? (
          <MapInfoContent>
            <Link
              to={`/ocurrences/update/${
                ocurrences.filter(o => o.selected)[0]._id
              }`}
            >
              Atualizar Ocorrência
            </Link>
            <Button onClick={handleDeleteClick}>Remover Ocorrência</Button>
          </MapInfoContent>
        ) : (
          <>
            <FiInfo />
            <p>
              Para remover / atualizar uma ocorrência, a selecione na lista
              abaixo.
            </p>
          </>
        )}
      </MapInfoContainer>
      <OcurrencesContainer>
        <OcurrencesContent>
          <OcurrenceList
            ocurrences={ocurrences}
            setSelectedItem={setUniqueSelectedItem}
          />
          <MapContainer>
            <Map />
          </MapContainer>
        </OcurrencesContent>
      </OcurrencesContainer>
    </Container>
  );
};

export default MyOcurrences;
