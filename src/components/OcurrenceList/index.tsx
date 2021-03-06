import React, { FC } from 'react';

import { Ocurrence } from '../../hooks/OcurrencesContext';

import { Container, OcurrenceItem, OcurrenceRow } from './styles';

interface OcurrenceList {
  ocurrences: Ocurrence[];

  setSelectedItem(ocurrence: Ocurrence): void;
}

const OcurrenceList: FC<OcurrenceList> = ({ ocurrences, setSelectedItem }) => {
  function handleItemClick(ocurrence: Ocurrence) {
    setSelectedItem(ocurrence);
  }

  return (
    <Container>
      {ocurrences.map(ocurrence => (
        <OcurrenceItem
          key={ocurrence._id}
          onClick={() => handleItemClick(ocurrence)}
          selected={ocurrence.selected}
        >
          <OcurrenceRow>
            <h3>{ocurrence.description}</h3>
          </OcurrenceRow>
          <OcurrenceRow>
            <p>Tipo: {ocurrence.formattedType}</p>
            <p>Ocorrência: {ocurrence.formattedDate}</p>
          </OcurrenceRow>

          <OcurrenceRow>
            <p>CEP: {ocurrence.zip_code}</p>
            <p>Cidade: {ocurrence.city}</p>
          </OcurrenceRow>

          <OcurrenceRow>
            <p>Bairro: {ocurrence.neighborhood}</p>
            {ocurrence.number && <p>Número: {ocurrence.number}</p>}
          </OcurrenceRow>

          <OcurrenceRow>
            <p>Rua: {ocurrence.street}</p>
          </OcurrenceRow>

          {ocurrence.complement && (
            <OcurrenceRow>
              <p>Complemento: {ocurrence.complement}</p>
            </OcurrenceRow>
          )}

          {!ocurrence.anonymous && ocurrence.user_name && (
            <OcurrenceRow>
              <p>Responsável: {ocurrence.user_name}</p>
            </OcurrenceRow>
          )}
        </OcurrenceItem>
      ))}
    </Container>
  );
};

export default OcurrenceList;
