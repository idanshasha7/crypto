import { combineReducers } from 'redux';
import user from './reducer_user';
import coins from './reducer_coins';
import restCoins from './reducer_rest';

export default combineReducers({
  user,
  coins,
  restCoins
})
