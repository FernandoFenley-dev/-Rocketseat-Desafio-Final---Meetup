import React, { useState, useRef } from 'react';
import { Image } from 'react-native';
import { useDispatch } from 'react-redux';

import Background from '~/Components/Background';
import logo from '~/assets/logo_2.png';

import * as AuthActions from '~/Store/Modules/auth/actions';

import {
  Container,
  Form,
  FormInput,
  SubmitButton,
  SubmitText,
  SignLink,
  SignLinkText,
} from './styles';

export default function SignUp({ navigation }) {
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  function handleSubmit() {
    dispatch(AuthActions.signUpRequest(name, email, password));
  }

  return (
    <Background>
      <Container>
        <Image style={{ width: 50, height: 50 }} source={logo} />
        <Form>
          <FormInput
            autoCorrect={false} // não auto corrigir
            returnKeyType="next" // aparecer a tecla "Enviar" no teclado durante a digitação
            placeholder="Nome completo"
            keyboardType="ascii-capable"
            onChangeText={text => setName(text)} // ou apenas setEmail
            onSubmitEditing={() => emailRef.current.focus()} // evento disparado ao editar o botão
          />
          <FormInput
            autoCorrect={false} // não auto corrigir
            autoCapitalize="none" // não começar com letra maiúscula
            returnKeyType="next" // aparecer a tecla "Enviar" no teclado durante a digitação
            placeholder="Digite seu email"
            keyboardType="email-address"
            onChangeText={text => setEmail(text)} // ou apenas setEmail
            ref={emailRef}
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
            <SubmitText>Criar conta</SubmitText>
          </SubmitButton>
        </Form>
        <SignLink onPress={() => navigation.navigate('SignIn')}>
          <SignLinkText>Já possuo login</SignLinkText>
        </SignLink>
      </Container>
    </Background>
  );
}

