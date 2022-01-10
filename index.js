/**
 * @format
 */

import React, {Component} from 'react';
import {AppRegistry} from 'react-native';
import App from './js/App';
import {name as appName} from './app.json';
import {Provider} from 'react-redux';
import {createStore} from 'redux';

var reducers = require('./js/redux/reducers');

let store = createStore(reducers);
export default class Root extends Component {
  render() {
    return (
      <Provider store={store}>
        <App />
      </Provider>
    );
  }
}

AppRegistry.registerComponent(appName, () => Root);
