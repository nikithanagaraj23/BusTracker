
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, FormGroup, Label, Input } from 'reactstrap';
import api from '../api';
import Autocomplete from 'react-google-autocomplete';
import Geolocation from "react-geolocation";



function Schedule(params) {
  function addZero(i) {
      if (i < 10) {
          i = "0" + i;
      }
      return i;
  }

  var d = new Date();
  var h = addZero(d.getHours());
  var m = addZero(d.getMinutes());
  var currenttime= h + ":" + m ;
  var url = window.location.href;
  var routeID = url.substring(url.lastIndexOf('/')+1);
  let schedule = api.getSchedule(routeID,currenttime);
  console.log("schedule",schedule);

  return<div>
      hey
  </div>;
}


function state2props(state) {
  return { form: state.form};
}

export default connect(state2props)(Schedule);
