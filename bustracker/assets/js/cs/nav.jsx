import React from 'react';
import { NavLink } from 'react-router-dom';
import { Form, FormGroup, NavItem, Input, Button } from 'reactstrap';
import { connect } from 'react-redux';
import api from '../api';

import { GoogleLogin, GoogleLogout } from 'react-google-login';


const responseGoogle = (response) => {
  console.log("Response google ID:",response.profileObj.googleId)
  console.log("Response Token:",response.tokenId)
  window.localStorage.setItem("googletoken", response.tokenId);
  window.localStorage.setItem("googleuser_id", response.profileObj.givenName);
  console.log("responseGoogle",response);
  window.location.reload();
}


const logout = (response) => {
 console.log(response);
 localStorage.clear();
 window.location.reload();
}


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

      </FormGroup>
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
    <span className="login"> Logged in as User ID { window.localStorage.getItem("user_id") ||  window.localStorage.getItem("googleuser_id")} </span>
    <Button className="btn-primary" onClick={log_out}>Log Out</Button>
  </div>;
});

function Nav(props) {

  var tok = window.localStorage.getItem("token");
  var uid = window.localStorage.getItem("user_id");
  var token = {"user_id": uid, "token": tok};
  var tok1 = window.localStorage.getItem("googletoken");

  if(props.token){
    window.localStorage.setItem("token", props.token.token);
    window.localStorage.setItem("user_id", props.token.user_id);
  }

  if (props.token || tok || tok1) {
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
          <NavItem>
          <GoogleLogin
                clientId="209682923125-1njg0h2p8kmd90qfhd0gk3nj7kn0m3fh.apps.googleusercontent.com"
                buttonText="Login"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}/>
          </NavItem>
          <NavItem>
          <GoogleLogout
              buttonText="Logout"
              onLogoutSuccess={logout}>
          </GoogleLogout>
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
          <NavItem>
          <GoogleLogin
                clientId="209682923125-1njg0h2p8kmd90qfhd0gk3nj7kn0m3fh.apps.googleusercontent.com"
                buttonText="Login"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}/>
          </NavItem>
          <NavItem>
          <GoogleLogout
              buttonText="Logout"
              onLogoutSuccess={logout}>
          </GoogleLogout>
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

export default connect(state2props, null, null, {pure: false})(Nav);
