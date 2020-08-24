import React, { FC, useCallback, useRef } from 'react';
import { FiMail, FiArrowLeft } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import getValidationErrors from '../../utils/getValidationErrors';
import Input from '../../components/Input';
import Button from '../../components/Button';

import { Container, Content, Background, AnimationContainer } from './styles';
import { Link, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../../services/api';

interface SignUpCredentials {
  email: string;
}

const SignUp: FC = () => {
  const formRef = useRef<FormHandles>(null);
  const history = useHistory();

  const handleSubmit = useCallback(
    async (data: SignUpCredentials) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          email: Yup.string()
            .email('Insira um e-mail válido')
            .required('Email obrigatório'),
        });

        await schema.validate(data, { abortEarly: false });

        await api.get('/forgotPassword', { params: { email: data.email } });

        toast.success(
          'Senha redefinida com sucesso, acesse sua caixa de entrada.',
        );
        history.push('/login');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);
        } else {
          toast.error(
            'Ocorreu um erro inesperado. Verifique o console para mais informações.',
          );
          console.log(err);
          console.log(err.response);
        }
      }
    },
    [history],
  );

  return (
    <Container>
      <Background />
      <Content>
        <AnimationContainer>
          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Esqueceu a Senha</h1>
            <Input name="email" icon={FiMail} placeholder="E-mail" />
            <Button type="submit">Redefinir senha</Button>
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
