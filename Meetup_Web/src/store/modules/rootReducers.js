import { combineReducers } from 'redux';
import auth from './Auth/reducer';
import user from './User/reducer';

const reducers = combineReducers({
  auth,
  user,
});

export default reducers;
