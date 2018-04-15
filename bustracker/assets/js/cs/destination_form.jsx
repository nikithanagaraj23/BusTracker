
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, FormGroup, Label, Input } from 'reactstrap';
import api from '../api';
import Autocomplete from 'react-google-autocomplete';
import Geolocation from "react-geolocation";



function DestinationForm(params) {
  var stopsavailable;
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
  console.log('data received',allStops.responseJSON.data);
  stopsavailable = _.map(allStops.responseJSON.data,(uu) => <option key={uu.attributes.id} value={uu.attributes.name}>{uu.attributes.name}</option>);
  }

  function getBuses(){
    api.getBuses();
  }

  function getStopsRouteID(){
    api.getStopsForRouteID(43)
  }

  function getPrediction(){
    let predictions = api.getPrediction(1226);
    console.log("arrival time ",predictions.responseJSON.data[0].attributes.arrival_time);
    console.log("Route ID",predictions.responseJSON.data[0].relationships.route.data.id);
  }

  // let stopsavailable = _.map(params.users, (uu) => <option key={uu.id} value={uu.name}>{uu.name}</option>);
  console.log("before render",stopsavailable);
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
    <FormGroup>
       <Label for="stops">Stops</Label>
         <Input type="select" name="stops"  >
           <option value="" selected disabled hidden>Choose here</option>
           { stopsavailable }
         </Input>
     </FormGroup>
    <Button onClick={getBuses}> Find Buses</Button>
    <Button onClick={getPrediction}> Get Predictions </Button>
  </div>;
}


function state2props(state) {
  console.log("rerender", state);
  return { form: state.form};
}

export default connect(state2props)(DestinationForm);
