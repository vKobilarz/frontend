import React, { FC, useCallback, useRef } from 'react';

import { FaServer } from 'react-icons/fa';
import { FormHandles } from '@unform/core';
import { toast } from 'react-toastify';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import getValidationErrors from '../../utils/getValidationErrors';
import Input from '../../components/Input';
import Button from '../../components/Button';

import { Container, Content, Background, AnimationContainer } from './styles';
import api from '../../services/api';
import { useHistory } from 'react-router-dom';

interface SetupUrlFormData {
  url: string;
}

const SetupUrl: FC = () => {
  const formRef = useRef<FormHandles>(null);
  const history = useHistory();

  const handleSubmit = useCallback(
    async (data: SetupUrlFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          url: Yup.string().required('URL obrigatória'),
        });

        await schema.validate(data, { abortEarly: false });

        api.defaults.baseURL = data.url;
        toast.success('URL definida com sucesso!');
        history.push('/login');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);
        } else {
          if (err.response.status === 401) {
            toast.error('Erro na autenticação. Verifique suas credenciais.');
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
    [history],
  );

  return (
    <Container>
      <Content>
        <AnimationContainer>
          <h1>Comunidade Solidária</h1>
          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Insira a URL</h1>
            <Input name="url" icon={FaServer} placeholder="URL" />
            <Button type="submit">Acessar</Button>
          </Form>
        </AnimationContainer>
      </Content>
      <Background />
    </Container>
  );
};

export default SetupUrl;
