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
  var token2 =  localStorage.getItem("googletoken");
  if(props.token || token || token2){
    return (
      <Router>
        <div>
          <Nav />
          <Route path="/findbuses" exact={true}  render={() =>
             <DestinationForm  />
           } />
         <Route path="/schedule"   render={() =>
              <Schedule  />
            } />
        </div>
      </Router>
    );
  }
  else {
    return (
      <Router>
        <div>
          <Nav />
          <h4 className="msg"> Please login if returning user or register if new user</h4>
           <Route path="/register" exact={true} render={() =>
            <RegisterForm />
          } />
        </div>
      </Router>
    );
  }
});
