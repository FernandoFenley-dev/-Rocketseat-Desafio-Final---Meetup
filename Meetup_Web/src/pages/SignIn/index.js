import React from 'react';
import { Link } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';
import { useDispatch, useSelector } from 'react-redux';
import { signInRequest } from '~/store/modules/Auth/actions';
import logo from '~/assets/logo.png';

export default function SignIn() {
  const dispatch = useDispatch();

  const loading = useSelector(state => state.auth.loading);

  function handleSubmit(data, { resetForm }) {
    const { email, password } = data;
    dispatch(signInRequest(email, password));
    resetForm({
      email: '',
    });
  }

  return (
    <>
      <img src={logo} alt="Meetup" />
      <Form onSubmit={handleSubmit}>
        <Input
          name="email"
          type="email"
          placeholder="Digite seu e-mail"
          autoComplete="off"
        />
        <Input name="password" type="password" placeholder="Sua senha" />
        <button type="submit">{loading ? 'Carregando...' : 'Acessar'}</button>
        <Link to="/signup">Criar conta</Link>
      </Form>
    </>
  );
}
