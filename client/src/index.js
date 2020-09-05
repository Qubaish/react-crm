import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import LoginPage from './containers/LoginPage';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducers from './reducer/auth';
import middleware from './middleware';

const store = createStore(reducers, middleware)

ReactDOM.render(
  <Provider store={store}>
    <Router>
    <Switch>
      <Route  path="/" component={App} />
      <Route  path="/login" component={LoginPage} />
    </Switch>
    </Router>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
