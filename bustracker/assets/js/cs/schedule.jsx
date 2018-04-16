
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, FormGroup, Label, Input } from 'reactstrap';
import api from '../api';
import Autocomplete from 'react-google-autocomplete';
import Geolocation from "react-geolocation";



function Schedule(params) {
  var url = window.location.href;
  var query = url.substring(url.lastIndexOf('/')+1).split("&");
  var routeID = query[0].split("=")[1];
  var tripID = query[1].split("=")[1];

  console.log("trips and routes",routeID,tripID);
  let schedule = api.getSchedule(routeID,tripID);
  console.log(schedule.responseJSON.data);

  function formatDate(time){
      var dt = new Date(time);
      var t = dt.toLocaleTimeString();
      t = t.replace(/\u200E/g, '');
      t = t.replace(/^([^\d]*\d{1,2}:\d{1,2}):\d{1,2}([^\d]*)$/, '$1$2');
      var result = t;
      return result;
  }

  let schedules = _.map(schedule.responseJSON.data, (uu) => <div>
    {api.getStopName(uu.relationships.stop.data.id).responseJSON.data.attributes.name} {formatDate(uu.attributes.departure_time)}
    </div>);

  return<div>
    {schedules}
  </div>;
}


function state2props(state) {
  return { form: state.form};
}

export default connect(state2props)(Schedule);
