import { createStore, applyMiddleware, combineReducers } from 'redux';
import {
  userDetailsReducer,
  userLoginReducer,
  userTopLawyersReducer,
} from './reducers/userReducer';
import ReduxThunk from 'redux-thunk';
const rootReducer = combineReducers({
  userDetails: userDetailsReducer,
  userLogin: userLoginReducer,
  userTopLawyers: userTopLawyersReducer,
});
const store = createStore(rootReducer, applyMiddleware(ReduxThunk));
export default store;
