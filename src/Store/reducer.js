import {combineReducers} from 'redux';

const initialState = {
  connection: [],
};

function dashboardReducer(state = initialState, action) {
  switch (action.type) {
    case 'newConnection':
      return Object.assign({}, state, {
        connection: action.connection,
      });

    default:
      return state;
  }
}

const Reducers = combineReducers({
  dashboardReducer,
});

export default Reducers;
