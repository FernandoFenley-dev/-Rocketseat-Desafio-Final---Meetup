import React from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import { MdDeleteForever, MdEdit, MdKeyboardArrowLeft } from 'react-icons/md';
import { FiCalendar, FiMapPin } from 'react-icons/fi';
import { useHistory } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert'; // Import

import { Container, TitleHeader, Meetups, ActionButton } from './styles';
import api from '~/services/api';

export default function Dashboard({ location }) {
  const { meetup } = location.state;
  const history = useHistory();

  async function deleteMeetup() {
    try {
      await api.delete(`meetups/${meetup.id}`);
      toast.success('Meetup cancelada com sucesso!');
      history.push('/dashboard');
    } catch (err) {
      toast.success('Falha na exclução, tente novamente mais tarde');
    }
  }

  function handleDelete() {
    confirmAlert({
      title: 'Confirmar cancelamento',
      message: 'Deseja realmente cancelar esta Meetup?',
      buttons: [
        {
          label: 'Sim',
          onClick: () => deleteMeetup(),
        },
        {
          label: 'Não',
          onClick: () => {},
        },
      ],
    });
  }

  return (
    <Container>
      <TitleHeader>
        <h2>{meetup.title}</h2>
        <span>
          {!meetup.past ? (
            <>
              <ActionButton
                color="#4DBAF9"
                type="button"
                onClick={() => history.push('/new', { meetup })}
              >
                <MdEdit size={30} color="#FFF" />
                Editar
              </ActionButton>
              <ActionButton
                color="#D44059"
                type="button"
                onClick={handleDelete}
              >
                <MdDeleteForever size={30} color="#FFF" />
                Cancelar
              </ActionButton>
            </>
          ) : (
            <ActionButton
              color="#D44059"
              type="button"
              onClick={() => history.push('dashboard')}
            >
              <MdKeyboardArrowLeft size={30} color="#FFF" />
              Voltar
            </ActionButton>
          )}
        </span>
      </TitleHeader>
      <Meetups>
        <img
          style={{ width: '100%', height: '200px' }}
          src={meetup.banner.url}
          alt="src="
        />
        <p>{meetup.description}</p>
        <ul>
          <li>
            <FiCalendar />{' '}
            {format(parseISO(meetup.date), "dd 'de' MMMM, 'às' HH:mm'h", {
              locale: pt,
            })}
          </li>
          <li>
            <FiMapPin /> {meetup.locale}
          </li>
        </ul>
      </Meetups>
      <ActionButton
        color="#D44059"
        type="button"
        onClick={() => history.push('dashboard')}
      >
        <MdKeyboardArrowLeft size={30} color="#FFF" />
        Voltar
      </ActionButton>
    </Container>
  );
}

Dashboard.propTypes = {
  location: PropTypes.shape({
    state: PropTypes.shape({
      meetup: PropTypes.shape.isRequired,
    }).isRequired,
  }).isRequired,
};
