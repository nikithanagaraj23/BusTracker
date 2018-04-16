import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider, connect } from 'react-redux';
import Nav from './nav';
import DestinationForm from './destination_form';
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
});
