import React, { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { Image } from 'react-native';
import * as AuthActions from '~/Store/Modules/auth/actions';

import Background from '~/Components/Background';

import {
  Container,
  Form,
  FormInput,
  SubmitButton,
  SubmitText,
  SignLink,
  SignLinkText,
} from './styles';
import logo from '~/assets/logo_2.png';

export default function SignIn({ navigation }) {
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const passwordRef = useRef(null);

  function handleSubmit() {
    dispatch(AuthActions.signInRequest(email, password));
  }

  return (
    <Background>
      <Container>
        <Image style={{ width: 50, height: 50 }} source={logo} />
        <Form>
          <FormInput
            autoCorrect={false}
            autoCapitalize="none"
            keyboardType="email-address"
            returnKeyType="next"
            placeholder="Digite seu e-mail"
            onChangeText={text => setEmail(text)}
            onSubmitEditing={() => passwordRef.current.focus()} // evento disparado ao editar o botão
          />
          <FormInput
            secureTextEntry
            returnKeyType="send" // aparecer a tecla "Enviar" no teclado durante a digitação
            placeholder="Sua senha secreta"
            onChangeText={text => setPassword(text)} // ou apenas setEmail
            ref={passwordRef}
            onSubmitEditing={handleSubmit}
          />
          <SubmitButton onPress={handleSubmit}>
            <SubmitText>Acessar</SubmitText>
          </SubmitButton>
        </Form>
        <SignLink onPress={() => navigation.navigate('SignUp')}>
          <SignLinkText>Criar Conta gratuita</SignLinkText>
        </SignLink>
      </Container>
    </Background>
  );
}
