import { configureStore } from '@reduxjs/toolkit'
import mainReducer from './reducer'
import { Socket } from '../utils/websocket-utils';
import { socketMiddleware } from './middleware';
// import { applyMiddleware, legacy_createStore as createStore} from 'redux'


const store = configureStore({
  reducer: mainReducer,
  middleware: [socketMiddleware(new Socket())],
});

export default store;