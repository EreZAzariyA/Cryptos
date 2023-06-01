import { SocketActionsTypes } from "./actions";

export const socketMiddleware = (socket) => (store) => (next) => (action) => {
  const { dispatch, getState } = store;
  const { type } = action;
  
  const mainCurrency = getState()?.currencyReducer?.currency;
  const state = getState()

  // console.log(state);

  switch (type) {
    case SocketActionsTypes.CONNECT:
      console.log('connecting...');
      socket.onopen = () => {
        console.log('Socket channel opened...');

        console.log('getting...');
        // if (coinsData && coinsData?.[mainCurrency]) {
        //   Object.values(coinsData[mainCurrency]).forEach((crypto) => {
        //     // const product_ids = [...coinsSet].map((crypto)=>(`${crypto.base}-${currency}`));
        //     socket.send(JSON.stringify({
        //       type: "subscribe",
        //       // product_ids: product_ids,
        //       product_ids: [`BTC-${mainCurrency}`],
        //       channels: ["ticker_batch"],
        //     }, {keep: false}));
        //   });
        // }
      };
      break;
      case SocketActionsTypes.GET_DATA:
      // console.log('getting...');
      // if (!socket.CONNECTING && action.payload.dataToFetch) {
      //   Object.entries(action.payload.dataToFetch).forEach(([currency, coinsSet]) => {
      //     // const product_ids = [...coinsSet].map((crypto)=>(`${crypto.base}-${currency}`));
      //     socket.send(JSON.stringify({
      //       type: "subscribe",
      //       // product_ids: product_ids,
      //       product_ids: [`BTC-${mainCurrency}`],
      //       channels: ["ticker_batch"],
      //     }, {keep: false}));
      //   });
      // }

      socket.onmessage = (data) => {
        const { channels, ...payload } = JSON.parse(data.data);
        // console.log(channels);
        if (payload.product_id) {
          console.log(payload);
        }
      
      }

      break;
    case 'CHANGE_CURRENCY_SET':
      socket.send(JSON.stringify({
        type: "unsubscribe",
        product_ids: [`BTC-${mainCurrency}`],
        channels: ["ticker_batch"],
      }));

      socket.send(JSON.stringify({
        type: "subscribe",
        // product_ids: product_ids,
        product_ids: [`BTC-${action.currency}`],
        channels: ["ticker_batch"],
      }));
      
      console.log(action.currency);
      break;

    case SocketActionsTypes.DISCONNECT:
      console.log('disconnect...');
      socket.onclose = (e) => {
        console.log(e);
      };
      break;
    default:
      return
  }

  return next(action)
}


