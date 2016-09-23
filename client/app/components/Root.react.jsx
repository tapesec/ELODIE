'use strict';

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import configureStore from './../stores/configureStore.js';
import InvoicesApp from './InvoicesApp.react.jsx';

const store = configureStore();

export default class Root extends React.Component {
  	render() {
    	return (
      		<Provider store={store}>
        		<InvoicesApp />
      		</Provider>
    	);
  	}
}