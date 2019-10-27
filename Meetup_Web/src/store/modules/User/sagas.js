import { all, takeLatest, call, put } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import api from '~/services/api';
import { updateUserSuccess, updateUserFailure } from './actions';
import history from '~/services/history';

export function* updateUser({ payload }) {
  try {
    const { name, email, ...rest } = payload;
    const user = {
      name,
      email,
      ...(rest.oldPassword ? rest : {}),
    };

    const response = yield call(api.put, 'users', user);
    toast.success('Perfil atualizado com sucesso');

    yield put(updateUserSuccess(response.data));

    history.push('/profile');
  } catch (error) {
    toast.error(error.response.data.error);
    yield put(updateUserFailure());
  }
}

export default all([takeLatest('@user/UPDATE_USER_REQUEST', updateUser)]);
