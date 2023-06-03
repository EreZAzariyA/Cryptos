import { MainActions, SocketActions, SocketActionsTypes, fetchCoinsData } from "./actions";

export const socketMiddleware = (socket) => (store) => (next) => (action) => {
  const { dispatch, getState } = store;

  const currency = getState()?.currencyReducer?.currency;
  const coinsSet = getState()?.coinsReducer?.coinsData;
  const productsIds = getState()?.liveDataReducer;

  socket.onerror = ((err) => {
    console.log({err});
  });

  socket.onmessage = (data) => {
    const liveData = JSON.parse(data?.data);
    dispatch(SocketActions.setLiveData(liveData, currency));
  };

  switch (action.type) {
    case SocketActionsTypes.CONNECT:
      socket.onopen = () => {
        console.log('WebSocket connection opened');
        dispatch(SocketActions.getLiveData());
      };
      break;

    case SocketActionsTypes.GET_LIVE_DATA:
      console.log('Getting live data...');
      if (socket.readyState === WebSocket.OPEN) {
        if (coinsSet) {
          if (!coinsSet?.[currency]) {
            fetchCoinsData(currency).then((coins) => {
              dispatch(MainActions.setCoinsData({...coinsSet, [currency]: coins}));
            });
          };
          const products_ids = coinsSet?.[currency].map((crypto) => `${crypto.base}-${crypto.currency}`);

          console.log('Sending subscription request...');
          socket.send(JSON.stringify({
            type: "subscribe",
            product_ids: products_ids,
            channels: ["ticker_batch"],
          }));
        } else {
          console.log('No coins or currency not available');
        }
      };
      break;

    case SocketActionsTypes.DISCONNECT:
      socket.close();
      console.log('WebSocket connection closed');
      break;
    default:
      break;
  }
  return next(action);
};