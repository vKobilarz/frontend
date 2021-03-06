import React, { FC, useCallback, useRef, useState } from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import { FaRoute, FaCity } from 'react-icons/fa';
import {
  AiOutlineAppstoreAdd,
  AiOutlineClockCircle,
  AiOutlineFieldNumber,
} from 'react-icons/ai';
import { MdConfirmationNumber, MdDescription } from 'react-icons/md';
import { GiModernCity } from 'react-icons/gi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import getValidationErrors from '../../utils/getValidationErrors';
import Input from '../../components/Input';
import MaskedInput from '../../components/MaskedInput';
import Button from '../../components/Button';

import { Container, Content } from './styles';
import { Link, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../../services/api';
import { useOcurrences } from '../../hooks/OcurrencesContext';
import { useAuth } from '../../hooks/AuthConfig';

interface OcurrenceData {
  description: string;
  zipCode: string;
  city: string;
  neighborhood: string;
  street: string;
  number?: string;
  ocurred_at: string;
  complement?: string;
}

const NewOcurrence: FC = () => {
  const [type, setType] = useState('assalto');
  const [anonymous, setAnonymous] = useState(false);
  const formRef = useRef<FormHandles>(null);
  const history = useHistory();
  const { signOut } = useAuth();
  const { newOcurrencePosition } = useOcurrences();

  const handleSubmit = useCallback(
    async (formData: OcurrenceData) => {
      try {
        formRef.current?.setErrors({});

        const [day, month, rest] = formData.ocurred_at.split('/');

        const ocurred_at = new Date(`${month}/${day}/${rest}`);

        const data = {
          ...formData,
          ...newOcurrencePosition,
          ocurred_at,
          anonymous,
          type,
        };

        const schema = Yup.object().shape({
          description: Yup.string().required('Descrição obrigatória'),
          type: Yup.string().required(),
          anonymous: Yup.string().required(),
          zipCode: Yup.string().required('CEP obrigatório'),
          city: Yup.string().required('Cidade obrigatória'),
          neighborhood: Yup.string().required('Bairro obrigatória'),
          street: Yup.string().required('Rua obrigatória'),
          latitude: Yup.number().required('Latitude obrigatória'),
          longitude: Yup.number().required('Longitude obrigatória'),
          complement: Yup.string(),
          number: Yup.string(),
          ocurred_at: Yup.date()
            .typeError('Formato de data inválida')
            .required('Data de ocorrência obrigatória'),
        });

        await schema.validate(data, { abortEarly: false });
        try {
          await api.post('/ocurrences', {
            description: data.description,
            zip_code: data.zipCode,
            neighborhood: data.neighborhood,
            street: data.street,
            complement: data.complement,
            ocurred_at: data.ocurred_at.getTime(),
            type: data.type,
            anonymous: data.anonymous,
            city: data.city,
            number: data.number,
            longitude: data.longitude,
            latitude: data.latitude,
          });

          toast.success('Ocorrência cadastrada com sucesso!');
          history.push('/ocurrences');
        } catch (err) {
          if (err?.response?.status === 401) {
            toast.error('Realize o login para realizar esta requisição.');

            signOut();
            history.push('/login');
          }
        }
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);
        } else {
          if (err.response.status === 400) {
            toast.error(err.response.data.error);
          } else if (err.response.status === 401) {
            toast.error('Realize o login para realizar esta requisição.');
            history.push('/login');
          } else {
            toast.error(
              'Ocorreu um erro inesperado. Verifique o console para mais informações.',
            );
            console.log(err);
            console.log(err.response);
          }
        }
      }
    },
    [history, anonymous, newOcurrencePosition, type, signOut],
  );

  return (
    <Container>
      <header>
        <div>
          <Link to="/ocurrences">
            <FiArrowLeft />
          </Link>
        </div>
      </header>
      <Content>
        <h1>Cadastro de Ocorrência</h1>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <Input
            name="description"
            icon={MdDescription}
            placeholder="Descrição"
          />
          <Input name="zipCode" icon={FaRoute} placeholder="CEP" />
          <Input name="city" icon={GiModernCity} placeholder="Cidade" />
          <Input name="neighborhood" icon={FaCity} placeholder="Bairro" />
          <Input name="street" icon={MdConfirmationNumber} placeholder="Rua" />
          <Input
            name="number"
            icon={AiOutlineFieldNumber}
            placeholder="Número"
          />
          <Input
            name="complement"
            icon={AiOutlineAppstoreAdd}
            placeholder="Complemento"
          />
          <MaskedInput
            name="ocurred_at"
            icon={AiOutlineClockCircle}
            placeholder="Data de Ocorrência"
            mask={'99/99/9999 99:99'}
          />
          <h4>Tipo da Ocorrência</h4>
          <label>
            <input
              name="type"
              type="radio"
              value="assalto"
              onChange={e => setType(e.target.value)}
              checked={type === 'assalto'}
            />
            <span />
            Assalto
          </label>
          <label>
            <input
              name="type"
              type="radio"
              value="agressao"
              onChange={e => setType(e.target.value)}
              checked={type === 'agressao'}
            />
            <span />
            Agressão
          </label>
          <label>
            <input
              name="type"
              type="radio"
              value="covid"
              onChange={e => setType(e.target.value)}
              checked={type === 'covid'}
            />
            <span />
            Covid 19
          </label>
          <label>
            <input
              name="type"
              type="radio"
              value="pertubacao"
              onChange={e => setType(e.target.value)}
              checked={type === 'pertubacao'}
            />
            <span />
            Pertubação
          </label>
          <label>
            <input
              name="type"
              type="radio"
              value="homicidio"
              onChange={e => setType(e.target.value)}
              checked={type === 'homicidio'}
            />
            <span />
            Homicídio
          </label>
          <label>
            <input
              name="type"
              type="radio"
              value="atividade_suspeita"
              onChange={e => setType(e.target.value)}
              checked={type === 'atividade_suspeita'}
            />
            <span />
            Atividade Suspeita
          </label>
          <label>
            <input
              name="type"
              type="radio"
              value="acidente"
              onChange={e => setType(e.target.value)}
              checked={type === 'acidente'}
            />
            <span />
            Acidente
          </label>
          <label>
            <input
              name="type"
              type="radio"
              value="desaparecimento"
              onChange={e => setType(e.target.value)}
              checked={type === 'desaparecimento'}
            />
            <span />
            Desaparecimento
          </label>
          <label>
            <input
              name="type"
              type="radio"
              value="animal_perdido"
              onChange={e => setType(e.target.value)}
              checked={type === 'animal_perdido'}
            />
            <span />
            Animal Perdido
          </label>

          <h4>Ocorrência Anônima?</h4>
          <label>
            <input
              name="anonymous"
              type="radio"
              checked={anonymous}
              onChange={() => setAnonymous(true)}
            />
            <span />
            Sim
          </label>
          <label>
            <input
              name="anonymous"
              type="radio"
              checked={!anonymous}
              onChange={() => setAnonymous(false)}
            />
            <span />
            Não
          </label>

          <Button type="submit">Cadastrar Ocorrência</Button>
        </Form>
      </Content>
    </Container>
  );
};

export default NewOcurrence;
