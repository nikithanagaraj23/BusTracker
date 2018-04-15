import store from './store';

class TheServer {
  request_history() {
    $.ajax("/api/v1/history", {
      method: "get",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      success: (resp) => {
        store.dispatch({
          type: 'HISTORIES_LIST',
          posts: resp.data,
        });
      },
    });
  }

  request_users() {
    $.ajax("/api/v1/users", {
      method: "get",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      success: (resp) => {
        store.dispatch({
          type: 'USERS_LIST',
          users: resp.data,
        });
      },
    });
  }

  submit_history(data) {
    $.ajax("/api/v1/history", {
      method: "post",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      data: JSON.stringify({ token: data.token, post: data }),
      success: (resp) => {
        store.dispatch({
          type: 'ADD_HISTORY',
          post: resp.data,
        });
      },
    });
  }

  submit_login(data) {
   $.ajax("/api/v1/token", {
     method: "post",
     dataType: "json",
     contentType: "application/json; charset=UTF-8",
     data: JSON.stringify(data),
     success: (resp) => {
       store.dispatch({
         type: 'SET_TOKEN',
         token: resp,
       });
     },
   });
 }
}

export default new TheServer();
