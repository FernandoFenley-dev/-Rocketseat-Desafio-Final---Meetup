import { all } from 'redux-saga/effects';

import userSaga from '~/Store/Modules/user/sagas';
import authSaga from '~/Store/Modules/auth/sagas';

export default function* rootSaga() {
  yield all([userSaga, authSaga]);
}
