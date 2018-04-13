
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
              console.log('ADDRESS GEOCODE is BACK!! => ' + JSON.stringify(responseJson));
              var address = responseJson.results[0].formatted_address;
              console.log ("formatted_address", address);
              document.getElementById("addr").value = address;
  })
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
              console.log(place.geometry.location.lat());
              console.log(place.geometry.location.lng());
            }}
            types={['geocode']}
            />
        </div>}
    />
  <Autocomplete placeholder="Enter your destination" style={{width:"90%"}}
      onPlaceSelected={(place) => {
        console.log(place.geometry.location.lat());
        console.log(place.geometry.location.lng());
      }}
      types={['geocode']}
      />
    <Button> Find Buses</Button>
  </div>;
}
