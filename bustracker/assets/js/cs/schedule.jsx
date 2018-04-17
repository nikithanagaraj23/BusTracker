
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

  function google_map(){
    let routeShape = api.getRouteShape(routeID);
    var polyline = routeShape.responseJSON.data[0].attributes.polyline;
    var decodedPath = google.maps.geometry.encoding.decodePath(polyline);
    var decodedLevels = decodeLevels("BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB");
    var myLatlng = new google.maps.LatLng(decodedPath[0].lat(), decodedPath[0].lng());
    var myOptions = {
        zoom: 15,
        center: myLatlng,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    }
    $('#map').css("height", "100%");
    var map = new google.maps.Map(document.getElementById("map"), myOptions);
    var markerDest = new google.maps.Marker({
           position: {lat: decodedPath[0].lat(), lng: decodedPath[0].lng()},
           icon: '/images/MapMarker.png',
           map: map,
         });
    var markerStart = new google.maps.Marker({
        position: {lat: decodedPath[decodedPath.length-1].lat(), lng: decodedPath[decodedPath.length-1].lng()},
        map: map,
        });
    var setRegion = new google.maps.Polyline({
        path: decodedPath,
        levels: decodedLevels,
        strokeColor: "#0AC2FF",
        strokeOpacity: 1.0,
        strokeWeight: 5,
        map: map
    });
}

function decodeLevels(encodedLevelsString) {
    var decodedLevels = [];

    for (var i = 0; i < encodedLevelsString.length; ++i) {
        var level = encodedLevelsString.charCodeAt(i) - 63;
        decodedLevels.push(level);
    }
    return decodedLevels;
  }

  google_map();
  let schedule = api.getSchedule(routeID,tripID);

  function formatDate(time){
      var dt = new Date(time);
      var t = dt.toLocaleTimeString();
      t = t.replace(/\u200E/g, '');
      t = t.replace(/^([^\d]*\d{1,2}:\d{1,2}):\d{1,2}([^\d]*)$/, '$1$2');
      var result = t;
      return result;
  }

  let schedules = _.map(schedule.responseJSON.data, (uu) =>
    <div key={uu.id}>
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
