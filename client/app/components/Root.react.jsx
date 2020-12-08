'use strict';

import React from 'react';
import { Provider } from 'react-redux';

import configureStore from './../stores/configureStore.js';
import InvoicesApp from './InvoicesApp.react.jsx';

const store = configureStore();

export default () => (
	<Provider store={store}>
		<InvoicesApp />
	</Provider>
);
  	
