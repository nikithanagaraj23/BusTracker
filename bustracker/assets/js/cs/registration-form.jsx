import React from 'react';
import { connect } from 'react-redux';
import { Button, FormGroup, Label, Input } from 'reactstrap';
import api from '../api';

function RegisterForm(props) {

  function update(ev) {
    let tgt = $(ev.target);

    let data = {};
    data[tgt.attr('name')] = tgt.val();
    let action = {
      type: 'UPDATE_FORM',
      data: data,
    };
    props.dispatch(action);
  }

  function submit(ev) {
    var reg_form = {name: props.form.name, password: props.form.password}
    api.register_user(reg_form);
    document.getElementById("regForm").className = "hidden";
    alert("You have successfully registered. Please login to use Task Tracker!!");
  }

  function clear(ev) {
    props.dispatch({
      type: 'CLEAR_FORM',
    });
  }

  return <div id="regForm" >
    <h3>Register</h3>
    <FormGroup>
      <Input className="form-control" type="text" name="name" value={props.form.name} onChange={update} placeholder="Enter the user name" />
    </FormGroup>
    <FormGroup>
      <Input className="form-control" type="password" name="password" onChange={update} placeholder="Enter your password" />
    </FormGroup>
    <Button onClick={submit} color="primary">Register</Button> &nbsp;
    <Button onClick={clear}>Clear</Button>
  </div>;
}

function state2props(state) {
  return {
    form: state.form,
    users: state.users,
  };
}

export default connect(state2props)(RegisterForm);
