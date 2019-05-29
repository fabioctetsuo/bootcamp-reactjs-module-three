import { createStore } from 'redux';
import reducers from './reducers';

// Import reducers right here
const store = createStore(reducers);

export default store;