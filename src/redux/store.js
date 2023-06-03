import { applyMiddleware, compose, legacy_createStore as createStore} from 'redux';
import mainReducer from './reducer'
import { socketMiddleware } from './middleware';

const webSocket = new WebSocket("wss://ws-feed.exchange.coinbase.com");
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(mainReducer, composeEnhancers(applyMiddleware(socketMiddleware(webSocket))));

export default store;