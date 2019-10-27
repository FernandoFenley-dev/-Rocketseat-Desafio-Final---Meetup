import { all, takeLatest, call, put } from 'redux-saga/effects';
import { Alert } from 'react-native';
import { updateUserSuccess, updateUserFailure } from './actions';
import api from '~/services/api';

export function* updateUser({ payload }) {
  try {
    const { name, email, ...rest } = payload;
    const user = {
      name,
      email,
      ...(rest.oldPassword ? rest : {}),
    };

    const response = yield call(api.put, 'users', user);
    Alert.alert('Perfil atualizado', 'Perfil atualizado com sucesso');

    yield put(updateUserSuccess(response.data));
  } catch (error) {
    Alert.alert('Ops, dados incorretos', error.response.data.error);
    yield put(updateUserFailure());
  }
}

export default all([takeLatest('@user/UPDATE_USER_REQUEST', updateUser)]);
