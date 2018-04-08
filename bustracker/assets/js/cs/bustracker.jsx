import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider, connect } from 'react-redux';
import Nav from './nav';

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
      
        </div>
      </Router>
    );
});
