import React, {Component} from 'react';
import {StyleSheet, SafeAreaView} from 'react-native';
import {createStore, applyMiddleware, combineReducers} from 'redux';
import {LOGOUT_REQUEST} from './config/redux-action-types/authenticate';
import {Provider} from 'react-redux';
import {COLOR} from './config/styles';
import axios from 'axios';
import axiosMiddleware from 'redux-axios-middleware';

import ROOT from './screens/root';
import StripeRedirect from './screens/StripeRedirectScreen';
import * as reducers from './reducers';
import thunk from 'redux-thunk';
import {BASE_URL} from './config/configs';

import FlashMessage from 'react-native-flash-message';
import {StripeProvider} from '@stripe/stripe-react-native';
import {STRIPE_PUBLISHER_KEY} from './config/configs';

import {Provider as PaperProvider} from 'react-native-paper';

console.disableYellowBox = true;

const client = axios.create({
  baseURL: BASE_URL,
  responseType: 'json',
});

client.interceptors.request.use(request => {
  return request;
});
client.interceptors.response.use(response => {
  return response;
});

const appReducer = combineReducers(reducers);

const rootReducer = (state, action) => {
  if (action.type == LOGOUT_REQUEST) {
    return appReducer(undefined, action);
  }
  return appReducer(state, action);
};

const store = createStore(
  rootReducer,
  applyMiddleware(thunk, axiosMiddleware(client)),
);

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Provider store={store}>
        <StripeProvider
          publishableKey={STRIPE_PUBLISHER_KEY}
          urlScheme="reactstripebegalileo://" // required for 3D Secure and bank redirects
          merchantIdentifier="merchant.com.{{YOUR_APP_NAME}}" // required for Apple Pay
        >
          <SafeAreaView style={styles.container}>
            <PaperProvider>
              <StripeRedirect />
              <ROOT />
            </PaperProvider>
            <FlashMessage position="top" />
          </SafeAreaView>
        </StripeProvider>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.WHITE,
    padding: 5,
  },
});

export default App;
