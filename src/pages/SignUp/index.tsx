import React, { FC, useCallback, useRef } from 'react';
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
import MaskedInput from '../../components/MaskedInput';
import Button from '../../components/Button';

import { Container, Content, Background, AnimationContainer } from './styles';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../../hooks/AuthConfig';
import { toast } from 'react-toastify';

interface SignUpCredentials {
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

const SignUp: FC = () => {
  const { signUp } = useAuth();
  const formRef = useRef<FormHandles>(null);
  const history = useHistory();

  const handleSubmit = useCallback(
    async (data: SignUpCredentials) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required('Nome obrigatório'),
          email: Yup.string()
            .email('Insira um e-mail válido')
            .required('Email obrigatório'),
          password: Yup.string().min(6, 'No mínimo 6 dígitos'),
          zipCode: Yup.string().required('CEP obrigatório'),
          city: Yup.string().required('Cidade obrigatória'),
          neighborhood: Yup.string().required('Bairro obrigatório'),
          street: Yup.string().required('Rua obrigatória'),
          number: Yup.number()
            .typeError('Insira um valor numérico')
            .required('Número obrigatório'),
          complement: Yup.string(),
          latitude: Yup.number()
            .typeError('Insira um valor numérico')
            .required('Latitude obrigatória'),
          longitude: Yup.number()
            .typeError('Insira um valor numérico')
            .required('Longitude obrigatória'),
          phone: Yup.string().required('Telefone obrigatório'),
        });

        await schema.validate(data, { abortEarly: false });

        await signUp(data);
        history.push('/login');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);
        } else {
          if (err.response.status === 400) {
            toast.error(err.response.data.error);
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
    [history, signUp],
  );

  return (
    <Container>
      <Background />
      <Content>
        <AnimationContainer>
          <h1>Comunidade Solidária</h1>
          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Faça seu cadastro</h1>
            <Input name="name" icon={FiUser} placeholder="Nome" />
            <Input name="email" icon={FiMail} placeholder="E-mail" />
            <Input
              name="password"
              icon={FiLock}
              type="password"
              placeholder="Senha"
            />

            <MaskedInput
              mask={'99999-999'}
              name="zipCode"
              icon={FaRoute}
              placeholder="CEP"
            />
            <Input name="city" icon={GiModernCity} placeholder="Cidade" />
            <Input name="neighborhood" icon={FaCity} placeholder="Bairro" />
            <Input
              name="street"
              icon={MdConfirmationNumber}
              placeholder="Rua"
            />
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
            <MaskedInput
              mask={'(99) 9 9999-9999'}
              name="phone"
              icon={AiFillPhone}
              placeholder="Telefone"
            />

            <Button type="submit">Cadastrar</Button>
          </Form>
          <Link to="/login">
            <FiArrowLeft /> Voltar para logon
          </Link>
        </AnimationContainer>
      </Content>
    </Container>
  );
};

export default SignUp;
