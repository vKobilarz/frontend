import React, { FC, useCallback, useRef, useEffect, useState } from 'react';
import { FiLock, FiMail, FiUser, FiArrowLeft } from 'react-icons/fi';
import { FaRoute, FaCity } from 'react-icons/fa';
import {
  AiOutlineFieldNumber,
  AiOutlineAppstoreAdd,
  AiFillPhone,
} from 'react-icons/ai';
import { MdConfirmationNumber } from 'react-icons/md';
import { GiModernCity, GiPositionMarker } from 'react-icons/gi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import getValidationErrors from '../../utils/getValidationErrors';
import Input from '../../components/Input';
import Button from '../../components/Button';

import { Container, Content } from './styles';
import { Link, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../../services/api';
import { useAuth } from '../../hooks/AuthConfig';

interface ProfileCredentials {
  name: string;
  email: string;
  password: string;
  zipCode: string;
  city: string;
  neighborhood: string;
  street: string;
  number: string;
  complement?: string;
  latitude: string;
  longitude: string;
  phone: string;
}

interface ResponseTemp {
  user: ProfileCredentials;
}

const NewOcurrence: FC = () => {
  const formRef = useRef<FormHandles>(null);
  const history = useHistory();
  const { setUserName, signOut } = useAuth();

  const [initialData, setInitialData] = useState<ProfileCredentials>();

  useEffect(() => {
    async function getUserData() {
      try {
        const response = await api.get<ProfileCredentials>('/me');

        const user = response.data;

        setInitialData(user);
      } catch (err) {
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

    getUserData();
  }, [history]);

  const handleSubmit = useCallback(
    async (data: ProfileCredentials) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string(),
          password: Yup.string(),
          zipCode: Yup.string(),
          city: Yup.string(),
          neighborhood: Yup.string(),
          street: Yup.string(),
          number: Yup.number().typeError('Insira um valor numérico'),
          complement: Yup.string(),
          latitude: Yup.number().typeError('Insira um valor numérico'),
          longitude: Yup.number().typeError('Insira um valor numérico'),
          phone: Yup.string(),
        });

        await schema.validate(data, { abortEarly: false });

        await api.put('/user', {
          name: data.name,
          password: data.password,
          zip_code: data.zipCode,
          city: data.city,
          neighborhood: data.neighborhood,
          street: data.street,
          number: Number(data.number),
          complement: data.complement,
          latitude: Number(data.latitude),
          longitude: Number(data.longitude),
          phone: data.phone,
        });

        setUserName(data.name);

        toast.success('Usuário atualizado com sucesso!');
        history.push('/ocurrences');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);
        } else {
          if (err.response.status === 400) {
            toast.error(err.response.data.error);
          } else if (err?.response?.status === 401) {
            toast.error('Realize o login para realizar esta requisição.');

            signOut();
            history.push('/login');
          } else if (err.response.status === 409) {
            toast.error(`O e-mail ${data.email} já está em uso.`);
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
    [history, setUserName, signOut],
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
        <h1>Meu Perfil</h1>
        <Form
          ref={formRef}
          onSubmit={handleSubmit}
          // @ts-ignore
          initialData={{ ...initialData, zipCode: initialData?.zip_code }}
        >
          <Input name="name" icon={FiUser} placeholder="Nome" />
          <Input name="email" icon={FiMail} placeholder="E-mail" disabled />
          <Input
            name="password"
            icon={FiLock}
            type="password"
            placeholder="Senha"
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
          <Input
            name="latitude"
            icon={GiPositionMarker}
            placeholder="Latitude"
          />
          <Input
            name="longitude"
            icon={GiPositionMarker}
            placeholder="Longitude"
          />
          <Input name="phone" icon={AiFillPhone} placeholder="Telefone" />

          <Button type="submit">Confimar mudanças</Button>
        </Form>
      </Content>
    </Container>
  );
};

export default NewOcurrence;
