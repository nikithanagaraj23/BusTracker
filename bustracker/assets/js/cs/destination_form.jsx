
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, FormGroup, Label, Input } from 'reactstrap';
import api from '../api';
import Autocomplete from 'react-google-autocomplete';
import Geolocation from "react-geolocation";
import {Socket} from "phoenix";


function DestinationForm(params) {

  function google_map(lat, lng){
    console.log("LAT", lat, "LONG", lng);
    var map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: lat, lng: lng},
      zoom: 15
    });
    $('#map').css("height", "100%");
    var marker = new google.maps.Marker({
           position: {lat: lat, lng: lng},
           map: map,
         });
  }

  if(!params.form.stops) {
    google_map(42.338643499999996, -71.0882297);
  }

  function getLocation() {
    console.log("waiting");
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
        console.log("Geolocation is not supported by this browser.");
    }
  }

function showPosition(position) {
  console.log("Latitude: " , position.coords.latitude ,
  "Longitude: " , position.coords.longitude);
  getaddress(position.coords.latitude,position.coords.longitude);
}

function showError(error) {
    switch(error.code) {
        case error.PERMISSION_DENIED:
            console.log("User denied the request for Geolocation.");
            break;
        case error.POSITION_UNAVAILABLE:
            console.log("Location information is unavailable.");
            break;
        case error.TIMEOUT:
            console.log("The request to get user location timed out.");
            break;
        case error.UNKNOWN_ERROR:
            console.log("An unknown error occurred.");
            break;
    }
}


  function getaddress(lat, lon){
    fetch('https://maps.googleapis.com/maps/api/geocode/json?address=' + lat + ',' + lon + '&key=' + 'AIzaSyDs3GeKIvLr4uKv4ChTRx10ktEUzh4WAvY')
          .then((response) => response.json())
          .then((responseJson) => {
              var address = responseJson.results[0].formatted_address;
              document.getElementById("addr").value = address;
              let data = {};
              if($("input[name=location]")){
                data['location'] = $("input[name=location]").val();
              }
              let action = {
                type: 'UPDATE_FORM',
                data: data,
              };
              params.dispatch(action);
              google_map(lat, lon);
  })

  let allStops = api.getStopIDs(lat,lon);
  let data = {};
  data['stops'] = allStops.responseJSON.data;
  let action = {
    type: 'UPDATE_FORM',
    data: data,
  };
  params.dispatch(action);
  }

  function fetchStops(ev) {
    let tgt = $(ev.target);
    let data = {};
    data[tgt.attr('name')] = tgt.val();
    if($("input[name=location]")){
      data['location'] = $("input[name=location]").val();
    }
    let action = {
      type: 'UPDATE_FORM',
      data: data,
    };
    params.dispatch(action);
  }

  function getView(data2){
    let predictions = data2["predictions"];
    let data = {};
    console.log("GET VIEW");
    data['predictions'] = predictions;
    let action = {
      type: 'UPDATE_FORM',
      data: data,
    };
    params.dispatch(action);
  }

  function getPrediction(){
    let socket = new Socket("/socket", {params: {token: window.userToken}});
    socket.connect();
    var stop = parseInt(params.form.stop);
    console.log(stop);
    let channel = socket.channel("prediction:"+ stop, {});
    channel.join()
               .receive("ok", resp => { getView(resp)})
               .receive("error", resp => { console.log("Unable to join", resp)});
    let allRoutes = _.map(params.form.predictions, (uu) => uu.relationships.route.data.id);
    console.log(allRoutes);
    let destinations = _.map(allRoutes, (uu) => api.getTripDestination(uu).responseJSON.data[0].attributes.headsign);
    console.log(destinations);
    setInterval(function(){channel.push("callpredictions", {stop: stop})
                                  .receive("ok", resp => { getView(resp)});}, 60000);
  }


  function formatDate(time){
    var cur = new Date();
    var d2 = new Date(time);
    var tdiff = Math.abs(cur.getTime()-d2.getTime());
    var result = Math.ceil(tdiff / (3600 * 60));
    if (result < 20 ){
      return result + " mins";
    }
    else{
      var dt = new Date(time);
      var t = dt.toLocaleTimeString();
      t = t.replace(/\u200E/g, '');
      t = t.replace(/^([^\d]*\d{1,2}:\d{1,2}):\d{1,2}([^\d]*)$/, '$1$2');
      var result = t;
      return result;
    }

  }

  function updateRoute(routeID,tripID){
    let data = {};
    data['routeID'] = routeID;
    data['tripID'] = tripID;
    let action = {
      type: 'UPDATE_FORM',
      data: data,
    };
    params.dispatch(action);
  }

  let stopsavailable = _.map(params.form.stops, (uu) => <option key={uu.id} value={uu.id}>{uu.attributes.name}</option>);
  let predictions = _.map(params.form.predictions, (uu) => <div><Link className="row" key={uu.id} to={'/schedule/route='+uu.relationships.route.data.id+'&trip='+uu.relationships.trip.data.id}>
  <div className="col-2"><span className="bus-number">{uu.relationships.route.data.id}</span></div>
  <span className="destination-name col-5">{api.getTripDestination(uu.relationships.route.data.id).responseJSON.data[0].attributes.headsign}</span>
  <span className="bus-time col-4">{formatDate(uu.attributes.arrival_time)} </span></Link></div>);


  return <div className="find-buses col-sm-12 col-md-10">
    <h5>Let your current location load or<br></br> Enter the location from where you want to catch your bus</h5>
      <FormGroup>
        <Geolocation
          onSuccess={console.log}
          render={({
            fetchingPosition,
            position: { coords: { latitude, longitude } = {} } = {},
            error,
            getCurrentPosition
          }) =>
            <div id="location-details">
              <Autocomplete className="form-control" id="addr" name="location" value={params.form.location ? params.form.location : getLocation()} onChange={fetchStops}
                onPlaceSelected={(place) => {
                  getaddress(place.geometry.location.lat(), place.geometry.location.lng())
                }}
                types={['geocode']}
                />
            </div>}
        />
    </FormGroup>
    <FormGroup>
         <Input type="select" className="form-control" name="stop" value={params.form.stop} onChange={fetchStops} >
           <option value="" selected disabled hidden>Choose here</option>
           {stopsavailable}
         </Input>
     </FormGroup>
    <Button onClick={getPrediction}> Get Predictions </Button>
    <div className="predictions">{predictions}</div>
  </div>;
}


function state2props(state) {
  return { form: state.form};
}

export default connect(state2props)(DestinationForm);
