import React, { useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Background from '~/Components/Background';
import TopLogo from '~/Components/TopLogo';
import * as AuthActions from '~/Store/Modules/auth/actions';
import * as UserActions from '~/Store/Modules/user/actions';

import { Container, Form, FormInput, SubmitButton, SubmitText } from './styles';

export default function Profile() {
  const dispatch = useDispatch();
  const profile = useSelector(state => state.user.profile);

  const emailRef = useRef();
  const oldPasswordRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  const [name, setName] = useState(profile.name);
  const [email, setEmail] = useState(profile.email);
  const [oldPassword, setOldPassword] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  function handleUpdate() {
    dispatch(
      UserActions.updateUserRequest({
        name,
        email,
        oldPassword,
        password,
        confirmPassword,
      })
    );
    setOldPassword('');
    setPassword('');
    setConfirmPassword('');

    if (oldPassword || password || confirmPassword) {
      oldPasswordRef.current.clear();
      passwordRef.current.clear();
      confirmPasswordRef.current.clear();
    }
  }

  function handleSignOut() {
    dispatch(AuthActions.signOut());
  }

  return (
    <Background>
      <TopLogo />
      <Container>
        <Form>
          <FormInput
            autoCorrect={false}
            autoCapitalize="none"
            returnKeyType="next"
            placeholder="Nome completo"
            value={name}
            onChangeText={text => setName(text)}
            onSubmitEditing={() => emailRef.current.focus()}
          />
          <FormInput
            autoCorrect={false}
            autoCapitalize="none"
            returnKeyType="next"
            placeholder="Digite seu email"
            keyboardType="email-address"
            value={email}
            onChangeText={text => setEmail(text)}
            ref={emailRef}
            onSubmitEditing={() => oldPasswordRef.current.focus()}
          />

          <FormInput
            secureTextEntry
            autoCorrect={false}
            autoCapitalize="none"
            returnKeyType="next"
            placeholder="Sua senha atual"
            onChangeText={text => setOldPassword(text)}
            ref={oldPasswordRef}
            onSubmitEditing={() => passwordRef.current.focus()}
          />

          <FormInput
            secureTextEntry
            autoCorrect={false}
            autoCapitalize="none"
            returnKeyType="next"
            placeholder="Nova senha"
            onChangeText={text => setPassword(text)}
            ref={passwordRef}
            onSubmitEditing={() => confirmPasswordRef.current.focus()}
          />

          <FormInput
            secureTextEntry
            autoCorrect={false}
            autoCapitalize="none"
            returnKeyType="send"
            placeholder="Confirmação de senha"
            onChangeText={text => setConfirmPassword(text)}
            ref={confirmPasswordRef}
            onSubmitEditing={handleUpdate}
          />
          <SubmitButton onPress={handleUpdate}>
            <SubmitText>Salvar perfil</SubmitText>
          </SubmitButton>
          <SubmitButton onPress={handleSignOut}>
            <SubmitText>Sair do Meetup</SubmitText>
          </SubmitButton>
        </Form>
      </Container>
    </Background>
  );
}

Profile.navigationOptions = {
  tabBarLabel: 'Perfil',
  // eslint-disable-next-line react/prop-types
  tabBarIcon: ({ tintColor }) => (
    <Icon name="person" size={20} color={tintColor} />
  ),
};
