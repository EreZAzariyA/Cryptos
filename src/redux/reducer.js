import { createReducer } from 'redux-promise-middleware-actions';
import { MainActions, SocketActions, SocketActionsTypes } from './actions';
import { combineReducers } from 'redux';
import { CoinsTypes } from '../utils/helpers';

const reducer = createReducer(null, (handleAction) => [
  handleAction(MainActions.setCoinsData, (state, { payload }) => {
    return { ...state, ...payload };
  }),
  // handleAction(SocketActions.setLiveData, (state, { payload }) => {
  //   const coinCurrency = payload.currency;
  //   const updatedCoinsData = state.coinsData[coinCurrency]?.map((coin) => {
  //     if (`${coin.base}-${coin.currency}` === payload.updatedCoin.product_id) {
  //       // console.log(coin);
  //       return {
  //         ...coin,
  //         latest: payload.updatedCoin.price,
  //         volume_24h: payload.updatedCoin.volume_24h
  //       };
  //     }
  //     return coin;
  //   });
  //   return {
  //     ...state,
  //     coinsData: {
  //       ...state.coinsData,
  //       [coinCurrency]: updatedCoinsData
  //     }
  //   };
  // }),
  handleAction(SocketActions.setLiveData, (state, { payload }) => {
    const coinCurrency = payload.currency;
    const coinsData = state.coinsData[coinCurrency];
  
    if (!coinsData) {
      return state; // Return the existing state if the coinsData array doesn't exist
    }
  
    const updatedCoinIndex = coinsData.findIndex((coin) => `${coin.base}-${coin.currency}` === payload.updatedCoin.product_id);
  
    if (updatedCoinIndex === -1) {
      return state; // Return the existing state if the updated coin is not found
    }
  
    const updatedCoinsData = [...coinsData];
    const updatedCoin = {
      ...coinsData[updatedCoinIndex],
      latest: payload.updatedCoin.price,
      volume_24h: payload.updatedCoin.volume_24h,
    };
    updatedCoinsData[updatedCoinIndex] = updatedCoin;
  
    return {
      ...state,
      coinsData: {
        ...state.coinsData,
        [coinCurrency]: updatedCoinsData,
      },
    };
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


const setCurrencySet = (state = {currency: CoinsTypes.USD}, action) => {
  switch (action.type) {
    case 'CHANGE_CURRENCY_SET':
      state.currency = action.currency;
      return {...state};
    default:
      return state;
  };
};

// const setLiveDataSet = (state = null, action) => {
//   switch (action.type) {
//     case SocketActionsTypes.SET_LIVE_DATA:
//       console.log(action.payload);
//       break;
//     default:
//       return state;
//   }
//   return state;
  // switch (action.type) {
  //   case SocketActionsTypes.SET_LIVE_DATA:
  //     const { channels, ...payload } = action.payload.liveData;
  //     if (channels && channels.length) {
  //       const productsIds = channels[0].product_ids;
  //       state.products_id = productsIds;
  //     };
  //     if (payload.product_id) {
  //       console.log({[payload.product_id]: payload.price});
  //       state.product = payload;
  //     };
  //     break;
  //   default:
  //     break;
  // }
  // return state;
// };
// const setLiveDataSet = (state = {products_id: [], product: null} , action) => {
//   switch (action.type) {
//     case SocketActionsTypes.SET_LIVE_DATA:
//       const { channels, ...payload } = action.payload.liveData;
//       if (channels && channels.length) {
//         const productsIds = channels[0].product_ids;
//         state.products_id = productsIds;
//       };
//       if (payload.product_id) {
//         console.log({[payload.product_id]: payload.price});
//         state.product = payload;
//       };
//       break;
//     default:
//       break;
//   }
//   return state;
// };

export default combineReducers({
  coinsReducer: reducer,
  currencyReducer: setCurrencySet,
  // liveDataReducer: setLiveDataSet,
});