import React, {
  createContext,
  FC,
  useContext,
  useEffect,
  useState,
} from 'react';

import formatDate from 'dateformat';

import api from '../services/api';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';
import { useAuth } from './AuthConfig';

export interface Ocurrence {
  _id: string;
  description: string;
  type:
    | 'assalto'
    | 'agressao'
    | 'covid'
    | 'pertubacao'
    | 'homicidio'
    | 'atividade_suspeita'
    | 'acidente'
    | 'desaparecimento'
    | 'animal_perdido';
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
  user_name?: string;
  user_id?: string;
  number?: string;
  selected: boolean;
}

export interface OcurrenceRequest {
  _id: string;
  description: string;
  type:
    | 'assalto'
    | 'agressao'
    | 'covid'
    | 'pertubacao'
    | 'homicidio'
    | 'atividade_suspeita'
    | 'acidente'
    | 'desaparecimento'
    | 'animal_perdido';
  ocurred_at: number;
  zip_code: string;
  latitude: number;
  longitude: number;
  city: string;
  neighborhood: string;
  street: string;
  complement: string;
  anonymous: boolean;
  user_name?: string;
  user_id?: string;
}

interface Position {
  latitude: number;
  longitude: number;
}

interface OcurrencesContextState {
  ocurrences: Ocurrence[];
  newOcurrencePosition: Position;

  getOcurrences(): Promise<void>;
  getMyOcurrences(): Promise<void>;
  setSelectedItem(ocurrence: Ocurrence): void;
  setUniqueSelectedItem(ocurrence: Ocurrence): void;
  createOcurrence(position: Position): void;
  deleteOcurrence(ocurrence: Ocurrence): Promise<void>;
}

enum Options {
  ASSALTO = 'assalto',
  AGRESSAO = 'agressao',
  COVID = 'covid',
  PERTUBACAO = 'pertubacao',
  HOMICIDIO = 'homicidio',
  ATIVIDADE_SUSPEITA = 'atividade_suspeita',
  ACIDENTE = 'acidente',
  DESAPARECIMENTO = 'desaparecimento',
  ANIMAL_PERDIDO = 'animal_perdido',
}

type FormattedType = {
  [key in Options]: string;
};

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
  const history = useHistory();
  const { signOut } = useAuth();

  const [ocurrences, setOcurrences] = useState<Ocurrence[]>([]);
  const [newOcurrencePosition, setNewOcurrencePosition] = useState<Position>(
    () => {
      const ocurrenceString = localStorage.getItem('@Community:position');

      if (!ocurrenceString) {
        return { latitude: 0, longitude: 0 };
      }

      const ocurrencePosition: Position = JSON.parse(ocurrenceString);

      return ocurrencePosition;
    },
  );

  useEffect(() => {
    localStorage.setItem(
      '@Community:position',
      JSON.stringify(newOcurrencePosition),
    );
  }, [newOcurrencePosition]);

  async function getOcurrences() {
    try {
      const { data } = await api.get<OcurrenceRequest[]>('ocurrences');

      const formattedOcurrences: Ocurrence[] = data.map(d => ({
        ...d,
        formattedType: formattedType[d.type],
        ocurred_at: new Date(d.ocurred_at),
        formattedDate: getFormattedDate(new Date(d.ocurred_at)),
        selected: false,
      }));

      setOcurrences(formattedOcurrences);
    } catch (err) {
      if (err?.response?.status === 401) {
        toast.error('Realize o login para realizar esta requisição.');

        signOut();
        history.push('/login');
      }
    }
  }

  async function getMyOcurrences() {
    try {
      const { data } = await api.get<OcurrenceRequest[]>('ocurrences/me');

      const formattedOcurrences: Ocurrence[] = data.map(d => ({
        ...d,
        formattedType: formattedType[d.type],
        ocurred_at: new Date(d.ocurred_at),
        formattedDate: getFormattedDate(new Date(d.ocurred_at)),
        selected: false,
      }));

      setOcurrences(formattedOcurrences);
    } catch (err) {
      if (err?.response?.status === 401) {
        toast.error('Realize o login para realizar esta requisição.');

        signOut();
        history.push('/login');
      }
    }
  }

  function createOcurrence({ latitude, longitude }: Position) {
    const position: Position = {
      latitude,
      longitude,
    };

    setNewOcurrencePosition(position);
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

  function setUniqueSelectedItem(ocurrence: Ocurrence) {
    const selectedOcurrenceIndex = ocurrences.findIndex(
      oc => oc._id === ocurrence._id,
    );

    if (selectedOcurrenceIndex === -1) {
      return;
    }

    const updatedOcurrences: Ocurrence[] = [...ocurrences].map((o, i) => ({
      ...o,
      selected: i === selectedOcurrenceIndex,
    }));

    setOcurrences(updatedOcurrences);
  }

  async function deleteOcurrence(ocurrence: Ocurrence) {
    try {
      await api.delete(`/ocurrences/${ocurrence._id}`);

      toast.success(
        `Ocorrência "${ocurrence.description}" removida com sucesso!`,
      );

      setOcurrences(ocurrences.filter(o => o._id !== ocurrence._id));
    } catch (err) {
      if (err?.response?.status === 401) {
        toast.error('Realize o login para realizar esta requisição.');

        signOut();
        history.push('/login');
      }
    }
  }

  return (
    <OcurrencesContext.Provider
      value={{
        ocurrences,
        newOcurrencePosition,
        getOcurrences,
        setSelectedItem,
        setUniqueSelectedItem,
        createOcurrence,
        getMyOcurrences,
        deleteOcurrence,
      }}
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
