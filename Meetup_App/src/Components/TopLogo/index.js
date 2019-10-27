import React from 'react';

import { Container, LogoImage } from './styles';

import logo from '~/assets/logo_2.png';

export default function TopLogo() {
  return (
    <Container>
      <LogoImage source={logo} />
    </Container>
  );
}
