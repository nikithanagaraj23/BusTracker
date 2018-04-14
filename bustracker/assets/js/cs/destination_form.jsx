
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, FormGroup, Label, Input } from 'reactstrap';
import api from '../api';
import Autocomplete from 'react-google-autocomplete';
import Geolocation from "react-geolocation";



export default function DestinationForm(params) {
  function getaddress(lat, lon){
    fetch('https://maps.googleapis.com/maps/api/geocode/json?address=' + lat + ',' + lon + '&key=' + 'AIzaSyDs3GeKIvLr4uKv4ChTRx10ktEUzh4WAvY')
          .then((response) => response.json())
          .then((responseJson) => {
              // console.log('ADDRESS GEOCODE is BACK!! => ' + JSON.stringify(responseJson));
              var address = responseJson.results[0].formatted_address;
              // console.log ("formatted_address", address);
              document.getElementById("addr").value = address;
  })

  let allRoutes = getBuses();
  console.log(lat,lon);
  //getStops(42.345466,-71.0698);
  // api.getStops(lat,lon);
  let allStops = api.getStopIDs(lat,lon);
  console.log('destination',allStops.responseJSON.data);

  }

  function getBuses(){
    api.getBuses();
  }

  function getStopsRouteID(){
    api.getStopsForRouteID(43)
  }

  function getStops(latitude,longitude){
    // console.log("From getSTops")
    api.getStops(latitude,longitude);
  }

  return <div>
    <Geolocation
      onSuccess={console.log}
      render={({
        fetchingPosition,
        position: { coords: { latitude, longitude } = {} } = {},
        error,
        getCurrentPosition
      }) =>
        <div>
          {getaddress(latitude, longitude)}
          <Autocomplete id="addr" placeholder="Enter your current location" style={{width:"90%"}}
            onPlaceSelected={(place) => {
              getaddress(place.geometry.location.lat(), place.geometry.location.lng())
               console.log(place.geometry.location.lat());
               console.log(place.geometry.location.lng());
            }}
            types={['geocode']}
            />
        </div>}
    />
  <Autocomplete placeholder="Enter your destination" style={{width:"90%"}}
      onPlaceSelected={(place) => {
        getaddress(place.geometry.location.lat(), place.geometry.location.lng())
        // console.log(place.geometry.location.lat());
        // console.log(place.geometry.location.lng());
      }}
      types={['geocode']}
      />
    <Button onClick={getBuses}> Find Buses</Button>
    <Button onClick={getStopsRouteID}> Find Routes </Button>
  </div>;
}
