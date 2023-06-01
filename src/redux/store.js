import { applyMiddleware, compose, legacy_createStore as createStore} from 'redux';
import mainReducer from './reducer'
import thunk from 'redux-thunk';
import { crashReporter } from './middaleware';

const webSocket = new WebSocket("wss://ws-feed.exchange.coinbase.com");

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

function logger({ getState }) {
  return next => action => {
    return next(action)
    // // console.log('will dispatch', action)
    // // const returnValue = next(action)
    // // console.log('state after dispatch', getState())
    // return returnValue
  }
}

const store = createStore(mainReducer, composeEnhancers(applyMiddleware(crashReporter, thunk, logger)));


export default store;