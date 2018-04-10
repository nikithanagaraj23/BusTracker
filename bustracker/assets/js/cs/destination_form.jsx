
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, FormGroup, Label, Input } from 'reactstrap';
import api from '../api';
import Autocomplete from 'react-google-autocomplete';
import Geolocation from "react-geolocation";

export default function DestinationForm(params) {
  return<div>
    <Geolocation
      onSuccess={console.log}
      render={({
        fetchingPosition,
        position: { coords: { latitude, longitude } = {} } = {},
        error,
        getCurrentPosition
      }) =>
        <div>
          <button onClick={getCurrentPosition}>Get Position</button>
          {error &&
            <div>
              {error.message}
            </div>}
          <pre>
            latitude: {latitude}
            longitude: {longitude}
          </pre>
        </div>}
    />
    <Autocomplete style={{width:"90%"}}
      onPlaceSelected={(place) => {
        console.log(place.geometry.location.lat());
        console.log(place.geometry.location.lng());
      }}
      types={['(regions)']}
      />
    <Button> Find Buses</Button>
  </div>;
}
