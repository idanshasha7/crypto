import {SIGNED_IN,SET_COINS,REST_COINS} from '../constants';


export function logUser(email) {
  const action = {
    type: SIGNED_IN,
    email
  }
  return action;
}

export function setCoins(coins){
  const action = {
    type: SET_COINS,
    coins
  }
  return action;
}


export function restCoins(restCoins){
  const action = {
    type: REST_COINS,
    restCoins
  }
  return action;
}
