import { SET_COINS} from '../constants';

export default (state= [], action) => {
  switch (action.type) {
    case SET_COINS:
        const { coins } = action;
        return coins;
    default:
        return state;
  }
}
