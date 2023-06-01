import { legacy_createStore as createStore} from 'redux';
import mainReducer from './reducer'

const store = createStore(mainReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default store;