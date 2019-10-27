import React from 'react';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';
import { useDispatch } from 'react-redux';
import { signUpRequest } from '~/store/modules/Auth/actions';
import logo from '~/assets/logo.png';
import { Container } from './styles';

const schema = Yup.object().shape({
  name: Yup.string().required('Nome é obrigatório'),
  email: Yup.string()
    .email('Insira um email Válido')
    .required('Email é obrigatório'),
  password: Yup.string()
    .min(6, 'Minimo de 6 caracteres para a senha')
    .required('Senha é obrigatória'),
});

export default function SignUp() {
  const dispatch = useDispatch();

  function handleSubmit(data, { resetForm }) {
    const { name, email, password } = data;
    dispatch(signUpRequest(name, email, password));
    resetForm({
      name,
    });
  }

  return (
    <Container>
      <img src={logo} alt="Meetup" />
      <Form schema={schema} onSubmit={handleSubmit}>
        <Input
          name="name"
          type="text"
          placeholder="Nome completo"
          autoComplete="off"
        />
        <Input
          name="email"
          type="email"
          placeholder="Digite seu e-mail"
          autoComplete="off"
        />
        <Input name="password" type="password" placeholder="Sua senha" />
        <button type="submit">Acessar</button>
        <Link to="/">Voltar</Link>
      </Form>
    </Container>
  );
}
