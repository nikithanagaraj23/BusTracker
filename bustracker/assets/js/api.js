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

  register_user(data) {
    $.ajax("/api/v1/users", {
      method: "post",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      data: JSON.stringify({ token: data.token, user: data }),
      success: (resp) => {
        store.dispatch({
          type: 'REGISTER_USER',
          user: resp.data,
        });
        document.getElementById("regForm").className = "hidden";
        alert("You have successfully registered. Please login to use Task Tracker!!");
      },
      error: function(err) {
        if(err.responseJSON.errors.password_confirmation){
          alert(err.responseJSON.errors.password_confirmation);
        }
        else {
          alert(err.responseJSON.errors.password);
        }
      }
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
     error: function(err) {
       alert('Opps something went wrong:' + err)
     }
   });
 }

getStopName(stopID) {
  var newdata = $.ajax({
   type: 'GET',
   async: false,
   url: 'https://api-v3.mbta.com/stops/'+stopID,
   data: {
     'response-format': "jsonp",
     'api-key': '0119e1c013dd48009e5fddae784c2ed4',
   },
   success: function(data) {
     // console.log("stop name received",data);
   },
   error: function(err) {
      console.log('Opps something went wrong:' + err)
   }
 });
 return newdata;
}

getSchedule(routeID,tripID) {
  var newdata = $.ajax({
   type: 'GET',
   async: false,
   url: 'https://api-v3.mbta.com/predictions?page%5Blimit%5D=30&filter%5Broute%5D='+routeID+'&filter%5Btrip%5D='+ tripID,
   data: {
     'response-format': "jsonp",
     'api-key': '0119e1c013dd48009e5fddae784c2ed4',
   },
   success: function(data) {
     console.log("schedule received",data);
   },
   error: function(err) {
      console.log('Opps something went wrong:' + err)
   }
 });
 return newdata;
}


getTripDestination(routeID) {
  var newdata = $.ajax({
   type: 'GET',
   async: false,
   url: 'https://api-v3.mbta.com/trips?page%5Blimit%5D=1&filter%5Bdirection_id%5D=1&filter%5Broute%5D='+ routeID,
   data: {
     'response-format': "jsonp",
     'api-key': '0119e1c013dd48009e5fddae784c2ed4',
   },
   success: function(data) {
     // console.log("Trips received",data);
   },
   error: function(err) {
      console.log('Opps something went wrong:' + err)
   }
 });
 return newdata;
}

getRouteShape(routeID) {
  var newdata = $.ajax({
   type: 'GET',
   async: false,
   url: 'https://api-v3.mbta.com/shapes?filter%5Broute%5D='+routeID+'&filter%5Bdirection_id%5D=1',
   data: {
     'response-format': "jsonp",
     'api-key': '0119e1c013dd48009e5fddae784c2ed4',
   },
   success: function(data) {
     // console.log("Trips received",data);
   },
   error: function(err) {
      console.log('Opps something went wrong:' + err)
   }
 });
 return newdata;
}


getStopIDs(latitude,longitude){
  var newdata = $.ajax({
   type: 'GET',
   async: false,
   url: 'https://api-v3.mbta.com/stops?latitude='+latitude+'&longitude='+ longitude+'&radius=0.003&route_type=3',
   data: {
     'response-format': "jsonp",
     'api-key': '0119e1c013dd48009e5fddae784c2ed4',
   },
   success: function(data) {
     console.log("get stops id",data);
   },
   error: function(err) {
      alert('Opps something went wrong:' + err)
   }
 });
 return newdata;
}

}

export default new TheServer();
