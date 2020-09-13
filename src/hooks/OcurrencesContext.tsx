import React, { createContext, FC, useContext, useState } from 'react';

import formatDate from 'dateformat';

import api from '../services/api';

export interface Ocurrence {
  _id: string;
  description: string;
  type: string;
  formattedType: string;
  ocurred_at: Date;
  formattedDate: string;
  zip_code: string;
  latitude: number;
  longitude: number;
  city: string;
  neighborhood: string;
  street: string;
  complement: string;
  anonymous: boolean;
  name?: string;
  selected: boolean;
}

export interface OcurrenceRequest {
  _id: string;
  description: string;
  type: string;
  ocurred_at: number;
  zip_code: string;
  latitude: number;
  longitude: number;
  city: string;
  neighborhood: string;
  street: string;
  complement: string;
  anonymous: boolean;
  name?: string;
}

interface OcurrencesContextState {
  ocurrences: Ocurrence[];

  getOcurrences(): Promise<void>;
  setSelectedItem(ocurrence: Ocurrence): void;
}

interface FormattedType {
  [key: string]: string;
}

const formattedType: FormattedType = {
  assalto: 'Assalto',
  agressao: 'Agressão',
  covid: 'Covid 19',
  pertubacao: 'Pertubação',
  homicidio: 'Homicídio',
  atividade_suspeita: 'Atividade Suspeita',
  acidente: 'Acidente',
  desaparecimento: 'Desaparecimento',
  animal_perdido: 'Animal Perdido',
};

const OcurrencesContext = createContext<OcurrencesContextState>(
  {} as OcurrencesContextState,
);

function getFormattedDate(date: Date): string {
  const formattedDate = formatDate(date, 'dd/mm/yyyy HH:MM');

  return formattedDate;
}

export const OcurrencesProvider: FC = ({ children }) => {
  const [ocurrences, setOcurrences] = useState<Ocurrence[]>([]);

  async function getOcurrences() {
    const { data } = await api.get<OcurrenceRequest[]>('ocurrences');

    const formattedOcurrences: Ocurrence[] = data.map(d => ({
      ...d,
      formattedType: formattedType[d.type],
      ocurred_at: new Date(d.ocurred_at),
      formattedDate: getFormattedDate(new Date(d.ocurred_at)),
      selected: false,
    }));

    setOcurrences(formattedOcurrences);
  }

  function setSelectedItem(ocurrence: Ocurrence) {
    const updatedOcurrences = [...ocurrences];
    const selectedOcurrenceIndex = updatedOcurrences.findIndex(
      oc => oc._id === ocurrence._id,
    );

    if (selectedOcurrenceIndex === -1) {
      return;
    }

    const selectedOcurrence = updatedOcurrences[selectedOcurrenceIndex];

    updatedOcurrences[selectedOcurrenceIndex] = {
      ...selectedOcurrence,
      selected: !selectedOcurrence.selected,
    };

    setOcurrences(updatedOcurrences);
  }

  return (
    <OcurrencesContext.Provider
      value={{ ocurrences, getOcurrences, setSelectedItem }}
    >
      {children}
    </OcurrencesContext.Provider>
  );
};

export function useOcurrences(): OcurrencesContextState {
  const context = useContext(OcurrencesContext);

  if (!context) {
    throw new Error('useOcurrences must be used within an OcurrenceProvider');
  }

  return context;
}
