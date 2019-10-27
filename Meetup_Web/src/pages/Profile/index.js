import React from 'react';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Input } from '@rocketseat/unform';
import { MdAddCircleOutline, MdKeyboardArrowLeft } from 'react-icons/md';
import { useHistory } from 'react-router-dom';
import { Container } from './styles';
import { updateUserRequest } from '~/store/modules/User/actions';

export default function Profile() {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user.user);
  const history = useHistory();

  const schema = Yup.object().shape({
    name: Yup.string(),
    email: Yup.string().email(),
    oldPassword: Yup.string().test(
      'senha atual',
      'Senha atual incorreta',
      value => {
        if (value) {
          const schema2 = Yup.string()
            .required()
            .min(6);
          return schema2.isValidSync(value);
        }
        return true;
      }
    ),
    password: Yup.string().test(
      'nova senha',
      'Nova senha deve possuir 6 caracteres',
      value => {
        if (value) {
          const schema2 = Yup.string()
            .required()
            .min(6);
          return schema2.isValidSync(value);
        }
        return true;
      }
    ),
    confirmPassword: Yup.string().when('password', (password, field) =>
      password
        ? field
            .required()
            .oneOf(
              [Yup.ref('password')],
              'Confirmação de nova senha não corresponde com a informada '
            )
        : field
    ),
  });

  function handleSubmit(data, { resetForm }) {
    dispatch(updateUserRequest(data));
    resetForm({
      name: data.name,
      email: data.email,
      oldPassword: '',
      password: '',
      confirmPassword: '',
    });
  }

  return (
    <Container>
      <button type="button" onClick={() => history.push('dashboard')}>
        <MdKeyboardArrowLeft size={30} color="#FFF" />
        Voltar
      </button>
      <Form onSubmit={handleSubmit} initialData={user} schema={schema}>
        <Input type="text" placeholder="Nome" name="name" autoComplete="off" />
        <Input
          type="email"
          placeholder="Email"
          name="email"
          autoComplete="off"
        />
        <hr />
        <Input type="password" placeholder="Senha Atual" name="oldPassword" />
        <Input type="password" placeholder="Nova senha" name="password" />
        <Input
          type="password"
          placeholder="Confirmação de Senha"
          name="confirmPassword"
        />
        <button type="submit">
          <MdAddCircleOutline size={30} color="#FFF" />
          Salvar Perfil
        </button>
      </Form>
    </Container>
  );
}
