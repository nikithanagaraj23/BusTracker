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

 getBuses() {
   let routeID = []
   $.ajax({
    type: 'GET',
    url: 'https://api-v3.mbta.com/routes?filter%5Btype%5D=03',
    data: {
      'response-format': "jsonp",
      'api-key': '0119e1c013dd48009e5fddae784c2ed4',
    },
    success: function(data) {
      console.log("Route ID:",data.data.length);
      var i=0;
      for (i = 0; i < data.data.length; ++i) {
        routeID[i] = data.data[i].id;
      }
    },
    error: function(err) {
      console.log('error:' + err)
    }
  });
  console.log("All Route IDS: ",routeID)
}

getStopsForRouteID(routeID){
  let stopID = []
  console.log("Route ID from getStops: ",routeID)
  $.ajax({
   type: 'GET',
   url: 'https://api-v3.mbta.com/stops?filter%5Broute%5D='+routeID,
   data: {
     'response-format': "jsonp",
     'api-key': '0119e1c013dd48009e5fddae784c2ed4',
   },
   success: function(data) {
     console.log("Stop ID length:",data.data.length);
     var i=0;
     for (i = 0; i < data.data.length; ++i) {
       stopID[i] = data.data[i].id;
       console.log("StopIDs:",data.data[i].id)
     }
   },
   error: function(err) {
     console.log('error:' + err)
   }
 });
 console.log("Route ID: "+routeID+"Stop IDS:"+stopID)
  return stopID
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
     console.log("stop name received",data);
   },
   error: function(err) {
     console.log('error:' + err)
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
     console.log('error:' + err)
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
     console.log('error:' + err)
   }
 });
 return newdata;
}


getPrediction(stopID) {
  var newdata = $.ajax({
   type: 'GET',
   async: false,
   url: 'https://api-v3.mbta.com/predictions?filter%5Bstop%5D='+ stopID,
   data: {
     'response-format': "jsonp",
     'api-key': '0119e1c013dd48009e5fddae784c2ed4',
   },
   success: function(data) {
     console.log("Predictions received",data);
   },
   error: function(err) {
     console.log('error:' + err)
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
     console.log('error:' + err)
   }
 });
 return newdata;
}

}

export default new TheServer();
