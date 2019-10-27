import React, { useState, useEffect } from 'react';
import { withNavigationFocus } from 'react-navigation';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Alert } from 'react-native';

import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Background from '~/Components/Background';
import TopLogo from '~/Components/TopLogo';
import api from '~/services/api';

import {
  Container,
  MeetUp,
  Banner,
  DetailContainer,
  Detail,
  Title,
  SubmitButton,
  SubmitText,
  List,
  NoItens,
} from './styles';

function Subscriptions({ isFocused }) {
  const [subscriptions, setSubscriptions] = useState([]);

  async function loadMeetups() {
    try {
      const subscribedMeetups = await api.get(`subscription`);
      setSubscriptions(subscribedMeetups.data);
    } catch (error) {
      Alert.alert('Ops, algo deu errado', 'Tente novamente mais tarde');
    }
  }

  useEffect(() => {
    if (isFocused) {
      loadMeetups();
    }
  }, [isFocused]);

  async function handleUnsubscribe(subscriptionId) {
    try {
      await api.delete(`subscription/${subscriptionId}`);
      setSubscriptions(
        subscriptions.filter(subscription => {
          return subscription.id !== subscriptionId;
        })
      );
      Alert.alert(
        'Incrição cancelada com sucesso',
        `Sua inscrição no evento foi cancelada`
      );
    } catch (error) {
      Alert.alert('Ops, algo deu errado', error.response.data.error);
    }
  }

  return (
    <Background>
      <TopLogo />
      <Container>
        <List
          data={subscriptions}
          keyExtractor={subscription => String(subscription.id)}
          ListEmptyComponent={
            <NoItens>
              Você não possui inscrições em Meetups ativas no momento.
            </NoItens>
          }
          renderItem={({ item: subscription }) => (
            <MeetUp>
              <Banner
                source={{
                  uri: subscription.meetup.banner.url,
                }}
                style={{ resizeMode: 'stretch' }}
              />
              <Title>{subscription.meetup.title}</Title>
              <DetailContainer>
                <MaterialIcon name="event" size={20} color="#999" />
                <Detail>
                  {format(
                    parseISO(subscription.meetup.date),
                    "dd 'de' MMMM, 'às' hh:mm'h'",
                    {
                      locale: pt,
                    }
                  )}
                </Detail>
              </DetailContainer>
              <DetailContainer>
                <MaterialIcon name="location-on" size={20} color="#999" />
                <Detail>{subscription.meetup.locale}</Detail>
              </DetailContainer>
              <DetailContainer>
                <MaterialIcon name="person" size={20} color="#999" />
                <Detail>Organizador: {subscription.meetup.owner.name}</Detail>
              </DetailContainer>
              <SubmitButton onPress={() => handleUnsubscribe(subscription.id)}>
                <SubmitText>Cancelar Inscrição</SubmitText>
              </SubmitButton>
            </MeetUp>
          )}
        />
      </Container>
    </Background>
  );
}

Subscriptions.navigationOptions = {
  tabBarLabel: 'Inscrições',
  // eslint-disable-next-line react/prop-types
  tabBarIcon: ({ tintColor }) => (
    <MaterialCommunityIcon name="tag" size={20} color={tintColor} />
  ),
};

Subscriptions.defaultProps = {
  isFocused: false,
};

export default withNavigationFocus(Subscriptions);
