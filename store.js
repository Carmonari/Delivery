import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'remote-redux-devtools';
import rootReducer from './src/reducers';

const initialState = {};
const middleware = [thunk];
const composeEnhancers = composeWithDevTools({realtime: true, port: 8000});

const store = createStore(
  rootReducer,
  initialState,
  composeEnhancers(applyMiddleware(...middleware)),
);

export default store;
