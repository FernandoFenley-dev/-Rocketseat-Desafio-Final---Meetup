import React from 'react';
import * as Yup from 'yup';
import { Form, Input, Textarea } from '@rocketseat/unform';
import { MdAddCircleOutline, MdKeyboardArrowLeft } from 'react-icons/md';
import { toast } from 'react-toastify';
import DateInput from '~/pages/Components/DatePicker';
import BannerInput from '~/pages/Components/BannerInput';
import { Container } from './styles';
import api from '~/services/api';
import history from '~/services/history';

const schema = Yup.object().shape({
  title: Yup.string().required('Título é obrigatório'),
  description: Yup.string().required('Descrição é obrigatória'),
  locale: Yup.string().required('Local é obrigatório'),
  date: Yup.date().required('Data é obrigatória'),
  banner_id: Yup.string().required(
    'Imagem de um baner para o evento é obrigatório'
  ),
});

export default function New_Edit({ location }) {
  async function handleSubmit(data) {
    try {
      await api.post('meetups', data);
      toast.success('Meetup criada com sucesso!');
      history.push('/dashboard');
    } catch (err) {
      toast.error(err.response.data.error);
    }
  }

  async function handleUpdate(data, meetupId) {
    try {
      await api.put(`meetups/${meetupId}`, data);
      toast.success('Meetup atualizada com sucesso');
      history.push('/dashboard');
    } catch (err) {
      toast.error(err.response.data.error);
    }
  }

  try {
    const { meetup } = location.state;

    if (meetup) {
      return (
        <Container>
          <button type="button" onClick={() => history.push('dashboard')}>
            <MdKeyboardArrowLeft size={30} color="#FFF" />
            Voltar
          </button>
          <Form
            initialData={meetup}
            onSubmit={data => handleUpdate(data, meetup.id)}
            schema={schema}
          >
            <BannerInput name="banner_id" />
            <Input
              type="text"
              placeholder="Título do Meetup"
              name="title"
              autoComplete="off"
            />
            <Textarea
              name="description"
              cols="30"
              rows="10"
              placeholder="Descrição completa"
              className="description"
              autoComplete="off"
            />
            <DateInput name="date" />
            <Input
              type="text"
              placeholder="Localização"
              name="locale"
              autoComplete="off"
            />
            <button type="submit">
              <MdAddCircleOutline size={30} color="#FFF" />
              Editar Meetup
            </button>
          </Form>
        </Container>
      );
    }
  } catch (err) {
    return (
      <Container>
        <button type="button" onClick={() => history.push('dashboard')}>
          <MdKeyboardArrowLeft size={30} color="#FFF" />
          Voltar
        </button>
        <Form onSubmit={handleSubmit} schema={schema}>
          <BannerInput name="banner_id" />
          <Input
            type="text"
            placeholder="Título do Meetup"
            name="title"
            autoComplete="off"
          />
          <Textarea
            name="description"
            cols="30"
            rows="10"
            placeholder="Descrição completa"
            className="description"
            autoComplete="off"
          />
          <DateInput name="date" />
          <Input
            type="text"
            placeholder="Localização"
            name="locale"
            autoComplete="off"
          />
          <button type="submit">
            <MdAddCircleOutline size={30} color="#FFF" />
            Criar Meetup
          </button>
        </Form>
      </Container>
    );
  }
}
