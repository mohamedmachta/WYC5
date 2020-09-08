// Store/configureStore.js

import { createStore } from 'redux';
import { combineReducers } from 'redux'
import userToken from './Reducers/routeReducer'
import userScore from './Reducers/scoreReducer'
    

export default createStore(combineReducers({userScore, userToken}))