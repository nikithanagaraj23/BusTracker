import React from 'react';
import { NavLink , Link} from 'react-router-dom';
import { Form, FormGroup, NavItem, Input, Button} from 'reactstrap';
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
    <Form inline className="navbar-login">
      <FormGroup>
        <Input className="form-control" type="text" name="name" placeholder="User Name" autocomplete="none"
               value={props.login.name} onChange={update} />
      </FormGroup>
      <FormGroup>
        <Input  className="form-control" type="password" name="pass" placeholder="Password" autocomplete="none"
               value={props.login.pass} onChange={update} />
      </FormGroup>
      <Link to={'/'} className="btn btn-primary" onClick={create_token}>Log In</Link>
        <GoogleLogin
            className="google-signin"
              clientId="209682923125-1njg0h2p8kmd90qfhd0gk3nj7kn0m3fh.apps.googleusercontent.com"
              buttonText=""
              onSuccess={responseGoogle}
              onFailure={responseGoogle}/>
    </Form>
  </div>;
});

let Session = connect(({token}) => {return {token};})((props) => {

  function log_out(ev) {
    localStorage.clear();
    window.location.reload();
  }

  return <div className="navbar-text">
    <span className="login">
    Welcome { window.localStorage.getItem("user_id") ? window.localStorage.getItem("user_id") : window.localStorage.getItem("googleuser_id") }
    </span>
    <Link className="btn btn-primary" onClick={log_out} to={'/'}>Log Out</Link>
  </div>;
});

function Nav(props) {
  var tok = window.localStorage.getItem("token");
  var uid = window.localStorage.getItem("user_id");
  var token = {"user_id": uid, "token": tok};
  var tok1 = window.localStorage.getItem("googletoken");

  if(props.token){
    window.localStorage.setItem("token", props.token.token);
    window.localStorage.setItem("user_id", props.login.name);
  }

  if (props.token || tok || tok1) {
    return (
      <nav className="navbar navbar-dark bg-dark navbar-expand ">
        <span className="navbar-brand">
          Bustracker
        </span>
        <ul className="navbar-nav mr-auto">
          <NavItem>
            <NavLink to="/"  href="#" className="nav-link">Find Buses</NavLink>
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
    login: state.login
  };
}

export default connect(state2props, null, null, {pure: false})(Nav);
