 import { createStore, combineReducers } from 'redux';
import deepFreeze from 'deep-freeze';

function histories(state = [], action) {
  return state;
}

function users(state = [], action) {
  return state;
}

function token(state = null, action) {
  switch (action.type) {
    case 'SET_TOKEN':
      return action.token;
    default:
      return state;
  }
}

let empty_login = {
  name: "",
  pass: "",
};

function login(state = empty_login, action) {
  switch (action.type) {
    case 'UPDATE_LOGIN_FORM':
      return Object.assign({}, state, action.data);
    default:
      return state;
  }
}

function history(state = [], action) {
  switch (action.type) {
  case 'HISTORIES_LIST':
    return [...action.histories];
  case 'ADD_HISTORY':
    return [action.history, ...state];
  default:
    return state;
  }
}

function users(state = [], action) {
  switch (action.type) {
  case 'USERS_LIST':
    return [...action.users];
  case 'REGISTER_USER':
    return [action.user, ...state];
  default:
    return state;
  }
}

let empty_form = {
  name: "",
  user_id: "",
  body: "",
  token: "",
};

function form(state = empty_form, action) {
  switch (action.type) {
    case 'UPDATE_FORM':
      return Object.assign({}, state, action.data);
    case 'CLEAR_FORM':
      return empty_form;
    case 'SET_TOKEN':
      return Object.assign({}, state, action.token);
    default:
      return state;
  }
}


function root_reducer(state0, action) {
  console.log("reducer", action);
  // {histories, users, form} is ES6 shorthand for
  // {histories: histories, users: users, form: form}
  let reducer = combineReducers({histories, users, token, login, form});
  let state1 = reducer(state0, action);
  console.log("state1", state1);
  return deepFreeze(state1);
};


let store = createStore(root_reducer);
export default store;
