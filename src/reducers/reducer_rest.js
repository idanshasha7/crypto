import { REST_COINS} from '../constants';

export default (state= [], action) => {
  switch (action.type) {
    case REST_COINS:
        const { restCoins } = action;
        return restCoins;
    default:
        return state;
  }
}
