
export const socketMiddleware = (socket) => (params) => (next) => (action) => {
  const { dispatch, getState } = params;
  const { type } = action;

  console.log(socket);

  switch (type) {
    case 'socket/connect':
      socket.connect("wss://ws-feed.exchange.coinbase.com")

      socket.on('open', () => {
        console.log('open');
        socket.send({
          type: "subscribe",
          product_ids: ['BTC-USD'],
          channels: ["ticker_batch"],
        })
      })
      socket.on('message', (data) => {
        console.log(JSON.parse(data.data));
      })
      
      break

    case 'socket/disconnect':
      socket.disconnect();
      console.log('closed');
      break

    default:
      break
  }

  return next(action)
}


