import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { withNavigationFocus } from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Alert, TouchableOpacity } from 'react-native';

import { format, subDays, addDays, isBefore, parseISO } from 'date-fns';
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
  DateContainer,
  DateTime,
  List,
  LoadingIcon,
  NoItens,
} from './styles';

function Dashboard({ isFocused }) {
  const [meetups, setMeetups] = useState([]);
  const [subscriptions, setSubscriptions] = useState([]);
  const [date, setDate] = useState(new Date());
  const [meetupPages, setMeetupPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const dateFormatted = useMemo(
    () => format(date, "d 'de ' MMMM ", { locale: pt }),
    [date]
  );

  function handlePrevDay() {
    setDate(subDays(date, 1));
    setMeetupPages(1);
    setLoading(true);
  }

  function handleNextDay() {
    setDate(addDays(date, 1));
    setMeetupPages(1);
    setLoading(true);
  }

  useEffect(() => {
    const source = axios.CancelToken.source();
    async function loadMeetups() {
      if (isFocused) {
        try {
          const subscribedMeetups = await api.get(`subscription`, {
            cancelToken: source.token,
          });

          const response = await api.get(`meetups`, {
            params: {
              page: 1,
              date: date.getTime(),
            },
          });

          response.data.forEach(meetup => {
            meetup.subscribed =
              subscribedMeetups.data.findIndex(
                subscription => subscription.meetup_id === meetup.id
              ) !== -1;
          });

          setMeetups(response.data);
          setMeetupPages(prevState => prevState + 1);
          setSubscriptions(subscribedMeetups.data);
          setLoading(false);
        } catch (error) {
          Alert.alert('Ops', `Algo deu errado, tente novamente mais tarde`);
        }
      }
    }
    loadMeetups();
    return () => {
      source.cancel();
      setLoading(false);
    };
  }, [date, isFocused]);

  async function loadNewMeetups() {
    const source = axios.CancelToken.source();

    try {
      const subscribedMeetups = await api.get(`subscription`, {
        cancelToken: source.token,
      });

      const response = await api.get(`meetups`, {
        params: {
          page: meetupPages,
          date: date.getTime(),
        },
      });

      if (response.data.length !== 0) {
        response.data.forEach(meetup => {
          meetup.subscribed =
            subscribedMeetups.data.findIndex(
              subscription => subscription.meetup_id === meetup.id
            ) !== -1;
        });

        setMeetups([...meetups, ...response.data]);
        setSubscriptions(subscribedMeetups.data);
        setMeetupPages(meetupPages + 1);
      }
    } catch (error) {
      Alert.alert('Ops', `Algo deu errado, tente novamente mais tarde`);
    }
  }

  async function handleSubscribe(meetupId) {
    try {
      const response = await api.post(`subscription/${meetupId}`);
      const subscription = response.data;

      const index = meetups.findIndex(
        meetup => meetup.id === subscription.meetup_id
      );

      setMeetups(
        meetups.map(meetup => {
          if (meetup.id === meetupId)
            return {
              ...meetup,
              subscribed: true,
            };
          return meetup;
        })
      );

      if (index !== -1) {
        meetups[index].subscribed = true;
      }

      Alert.alert('Tudo certo', 'Inscrição realizada com sucesso!');
    } catch (error) {
      Alert.alert('Falha na inscrição', error.response.data.error);
    }
  }

  return (
    <Background>
      <TopLogo />
      <DateContainer>
        <TouchableOpacity
          disabled={isBefore(subDays(date, 0), new Date())}
          onPress={handlePrevDay}
          style={
            isBefore(subDays(date, 0), new Date())
              ? { opacity: 0 }
              : { opacity: 1 }
          }
        >
          <Icon name="navigate-before" size={36} color="#FFF" />
        </TouchableOpacity>
        <DateTime>{dateFormatted}</DateTime>
        <TouchableOpacity onPress={handleNextDay}>
          <Icon name="navigate-next" size={36} color="#FFF" />
        </TouchableOpacity>
      </DateContainer>
      <Container>
        {loading && <LoadingIcon size="large" color="#fff" />}
        {!loading && (
          <List
            onEndReachedThreshold={0.2}
            onEndReached={loadNewMeetups}
            data={meetups}
            keyExtractor={meetup => String(meetup.id)}
            ListEmptyComponent={
              <NoItens>Não há Meetups agendadas para este dia.</NoItens>
            }
            refreshing={<LoadingIcon size="large" color="#fff" />}
            renderItem={({ item: meetup }) => (
              <MeetUp>
                <Banner
                  source={{
                    uri: meetup.banner.url,
                  }}
                  style={{ resizeMode: 'stretch' }}
                />
                <Title>{meetup.title}</Title>
                <DetailContainer>
                  <Icon name="event" size={20} color="#999" />
                  <Detail>
                    {format(
                      parseISO(meetup.date),
                      "dd 'de' MMMM, 'às' HH:mm'h",
                      {
                        locale: pt,
                      }
                    )}
                  </Detail>
                </DetailContainer>
                <DetailContainer>
                  <Icon name="location-on" size={20} color="#999" />
                  <Detail>{meetup.locale}</Detail>
                </DetailContainer>
                <DetailContainer>
                  <Icon name="person" size={20} color="#999" />
                  <Detail>Organizador: {meetup.owner.name}</Detail>
                </DetailContainer>
                <SubmitButton
                  style={
                    meetup.subscribed || meetup.past
                      ? { opacity: 0.5 }
                      : { opacity: 1 }
                  }
                  disabled={meetup.subscribed || meetup.past}
                  onPress={() => handleSubscribe(meetup.id)}
                >
                  <SubmitText>
                    {meetup.subscribed && !meetup.past && 'Inscrito'}
                    {!meetup.subscribed &&
                      meetup.past &&
                      'Inscrições encerradas'}
                    {!meetup.past && !meetup.subscribed && 'Inscreva-se'}
                  </SubmitText>
                </SubmitButton>
              </MeetUp>
            )}
          />
        )}
      </Container>
    </Background>
  );
}

Dashboard.navigationOptions = {
  tabBarLabel: 'Meetups',
  // eslint-disable-next-line react/prop-types
  tabBarIcon: ({ tintColor }) => (
    <Icon name="list" size={20} color={tintColor} />
  ),
};

Dashboard.defaultProps = {
  isFocused: false,
};

export default withNavigationFocus(Dashboard);
