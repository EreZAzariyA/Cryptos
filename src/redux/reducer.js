import { createReducer } from 'redux-promise-middleware-actions';
import { MainActions } from './actions';
import { combineReducers } from 'redux';
import { CoinsTypes } from '../utils/helpers';


const reducer = createReducer(null, (handleAction) => [
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

// const liveDataReducer = createReducer(null, (handleAction) => [
//   handleAction(MainActions.setLiveCoinsData, (state, { payload }) => {
//     return {
//       ...state,
//       ...payload
//     }
//   })
// ]);

const setCurrencySet = (state = {currency: CoinsTypes.USD}, action) => {
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
  currencyReducer: setCurrencySet,
  // liveDataReducer: liveDataReducer
});