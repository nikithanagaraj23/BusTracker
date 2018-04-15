import React from 'react';
import { NavLink } from 'react-router-dom';
import { Form, FormGroup, NavItem, Input, Button } from 'reactstrap';
import { connect } from 'react-redux';
import api from '../api';

let LoginForm = connect(({login}) => {return {login};})((props) => {
  function update(ev) {
    let tgt = $(ev.target);
    let data = {};
    data[tgt.attr('name')] = tgt.val();
    props.dispatch({
      type: 'UPDATE_LOGIN_FORM',
      data: data,
    });
  }

  function create_token(ev) {
    api.submit_login(props.login);
  }

  return <div className="navbar-text">
    <Form inline>
      <FormGroup>
        <Input type="text" name="name" placeholder="name"
               value={props.login.name} onChange={update} />
      </FormGroup>
      <FormGroup>
        <Input type="password" name="pass" placeholder="password"
               value={props.login.pass} onChange={update} />
      </FormGroup>
      <Button onClick={create_token}>Log In</Button>
    </Form>
  </div>;
});

let Session = connect(({token}) => {return {token};})((props) => {

  function log_out(ev) {
    localStorage.clear();
    window.location.reload();
  }

  return <div className="navbar-text">
    <span className="login"> Logged in as User ID { window.localStorage.getItem("user_id") } </span>
    <Button className="btn-primary" onClick={log_out}>Log Out</Button>
  </div>;
});

function Nav(props) {

  var tok = window.localStorage.getItem("token");
  var uid = window.localStorage.getItem("user_id");
  var token = {"user_id": uid, "token": tok};

  if(props.token){
    window.localStorage.setItem("token", props.token.token);
    window.localStorage.setItem("user_id", props.token.user_id);
  }

  if (props.token || tok) {
    return (
      <nav className="navbar navbar-dark bg-dark navbar-expand">
        <span className="navbar-brand">
          Bustracker
        </span>
        <ul className="navbar-nav mr-auto">
          <NavItem>
            <NavLink to="/" exact={true} activeClassName="active" className="nav-link">Feed</NavLink>
          </NavItem>
          <NavItem>
            <NavLink to="/findbuses"  href="#" className="nav-link">Find Buses</NavLink>
          </NavItem>
        </ul>
        <Session token={token} />;
      </nav>
    );
  }
  else {
    return (
      <nav className="navbar navbar-dark bg-dark navbar-expand">
        <span className="navbar-brand">
          Bustracker
        </span>
        <ul className="navbar-nav mr-auto">
          <NavItem>
              <NavLink to="/register" href="#" className="nav-link">Register</NavLink>
          </NavItem>
        </ul>
        <LoginForm />
      </nav>
    );
  }
}

function state2props(state) {
  return {
    token: state.token,
  };
}

export default connect(state2props)(Nav);
