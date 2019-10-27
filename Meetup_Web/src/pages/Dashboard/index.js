import React, { useEffect, useState } from 'react';
import { MdAddCircleOutline, MdKeyboardArrowRight } from 'react-icons/md';
import { useHistory } from 'react-router-dom';
import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import { Container, TitleHeader, Meetups, Meetupdata } from './styles';
import api from '~/services/api';

export default function Dashboard() {
  const history = useHistory();

  const [meetups, setMeetups] = useState([]);

  useEffect(() => {
    async function loadSchedule() {
      try {
        const response = await api.get('organizer');
        setMeetups(response.data);
      } catch (error) {
        // eslint-disable-next-line no-alert
        alert('Ops, algo de estranho ocorreu. Tente novamente mais tarde');
      }
    }
    loadSchedule();
  }, []);

  return (
    <Container>
      <TitleHeader>
        <h2>Meus Meetups</h2>
        <button type="button" onClick={() => history.push('/new')}>
          <MdAddCircleOutline size={30} color="#FFF" />
          Novo Meetup
        </button>
      </TitleHeader>
      <Meetups>
        {meetups.map(meetup => (
          <Meetupdata
            key={meetup.id}
            onClick={() => history.push('/meetup', { meetup })}
            past={meetup.past}
          >
            <strong>{meetup.title}</strong>
            <span>
              <p>
                {format(parseISO(meetup.date), "dd 'de' MMMM, 'às' HH:mm'h", {
                  locale: pt,
                })}
              </p>
              <MdKeyboardArrowRight size={20} color="#FFF" />
            </span>
          </Meetupdata>
        ))}
      </Meetups>
      {meetups.length === 0 && <p>Você não possui Meetups cadastradas</p>}
    </Container>
  );
}
