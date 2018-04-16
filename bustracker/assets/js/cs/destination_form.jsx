
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, FormGroup, Label, Input } from 'reactstrap';
import api from '../api';
import Autocomplete from 'react-google-autocomplete';
import Geolocation from "react-geolocation";
import {Socket} from "phoenix";

function DestinationForm(params) {

  function getaddress(lat, lon){
    fetch('https://maps.googleapis.com/maps/api/geocode/json?address=' + lat + ',' + lon + '&key=' + 'AIzaSyDs3GeKIvLr4uKv4ChTRx10ktEUzh4WAvY')
          .then((response) => response.json())
          .then((responseJson) => {
              var address = responseJson.results[0].formatted_address;
              document.getElementById("addr").value = address;
  })

  let allRoutes = getBuses();
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

  function getBuses(){
    api.getBuses();
  }

  function getStopsRouteID(){
    api.getStopsForRouteID(43)
  }

  function getView(data2){
    let predictions = data2["predictions"];
    let data = {};
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
    let channel = socket.channel("prediction:"+ stop, {});
  
    channel.join()
                .receive("ok", resp => { getView(resp)})
                .receive("error", resp => { console.log("Unable to join", resp)});

    let allRoutes = _.map(params.form.predictions, (uu) => uu.relationships.route.data.id);
    console.log(allRoutes);
    let destinations = _.map(allRoutes, (uu) => api.getTripDestination(uu).responseJSON.data[0].attributes.headsign);
    console.log(destinations);
  }

  function formatDate(time){
      var dt = new Date(time);
      var t = dt.toLocaleTimeString();
      t = t.replace(/\u200E/g, '');
      t = t.replace(/^([^\d]*\d{1,2}:\d{1,2}):\d{1,2}([^\d]*)$/, '$1$2');
      var result = t;
      return result;
  }

  let stopsavailable = _.map(params.form.stops, (uu) => <option key={uu.id} value={uu.id}>{uu.attributes.name}</option>);
  let predictions = _.map(params.form.predictions, (uu) => <tr key={uu.id}><td>{uu.relationships.route.data.id}</td>
  <td>{api.getTripDestination(uu.relationships.route.data.id).responseJSON.data[0].attributes.headsign}</td>
  <td>{formatDate(uu.attributes.arrival_time)}</td></tr>);

  return <div>
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
              <Autocomplete id="addr" name="location" placeholder="Enter your current location" value={params.form.location} onChange={fetchStops} style={{width:"90%"}}
                onPlaceSelected={(place) => {
                  getaddress(place.geometry.location.lat(), place.geometry.location.lng())
                   console.log(place.geometry.location.lat());
                   console.log(place.geometry.location.lng());
                }}
                types={['geocode']}
                />
            </div>}
        />
    </FormGroup>
    <Button onClick={fetchStops}> Fetch Stops</Button>
    <FormGroup>
       <Label for="stops">Stops</Label>
         <Input type="select" name="stop" value={params.form.stop} onChange={fetchStops} >
           {stopsavailable}
         </Input>
     </FormGroup>
    <Button onClick={getBuses}> Find Buses</Button>
    <Button onClick={getPrediction}> Get Predictions </Button>
    <table className="table">
      <tbody>
        {predictions}
      </tbody>
    </table>
  </div>;
}


function state2props(state) {
  return { form: state.form};
}

export default connect(state2props)(DestinationForm);
