import { createReducer } from 'redux-promise-middleware-actions';
import { MainActions } from './actions';
import { combineReducers } from 'redux';


const reducer = createReducer({}, (handleAction) => [
  handleAction(MainActions.setCoinsData, (state, { payload }) => {
    return { ...state, ...payload };
  }),

  handleAction(MainActions.getCoinsData.pending, (state) => {
    return { ...state, pending: true };
  }),
  handleAction(MainActions.getCoinsData.rejected, (state) => {
    return { ...state, pending: false };
  }),
  handleAction(MainActions.getCoinsData.fulfilled, (state, { coins }) => {
    return { ...state, ...coins, pending: false };
  }),
]);

const setCurrencySet = (state = {currency: 'USD'}, action) => {
  switch (action.type) {
    case 'CHANGE_CURRENCY_SET':
      state.currency = action.currency;
      return {...state};
    default:
      return state;
  };
};


export default combineReducers({
  coinsReducer: reducer,
  currencyReducer: setCurrencySet
});