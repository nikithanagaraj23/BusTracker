import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider, connect } from 'react-redux';
import Nav from './nav';
import DestinationForm from './destination_form';
import RegisterForm from './registration-form';
import Schedule from './schedule';

export default function bustracker_init(store) {
  
  ReactDOM.render(
    <Provider store={store}>
      <Bustracker state={store.getState()}/>
    </Provider>,
    document.getElementById('root'),
  );
}

let Bustracker = connect((state) => state)((props) =>  {
  var token =  localStorage.getItem("token");
  if(props.token || token){
    return (
      <Router>
        <div>
          <div>
            <Nav />
          </div>
          <div className="row col-md-6">
            <Route path="/" exact={true}  render={() =>
               <DestinationForm  />
             } />
         </div>
         <div>
           <Route path="/schedule"   render={() =>
                <Schedule  />
              } />
        </div>
        </div>
      </Router>
    );
  }
  else {
    return (
      <Router>
        <div>
          <Nav />
          <div className="row main-data">
            <div className="login-msg col-md-5"> <h3>BusTracker!</h3>
              <h5>Track where your bus is right now.</h5>
              <p> Login to start tracking. <br></br>
                If you don't have an account, click on Register to Sign Up</p>
                <Route path="/register" exact={true} render={() =>
                 <RegisterForm />
               } />
             </div>
        </div>
        </div>
      </Router>
    );
  }
});
