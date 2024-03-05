import React, {Component} from 'react';
import {View, Text} from 'react-native';
import AppStack from '../config/newRouter';
import {connect} from 'react-redux';
import {restoreSession} from '../actions/authenticate';
import * as Sentry from '@sentry/react-native';
import {SENTRY_BASE_URL} from '../config/configs';

// Construct a new instrumentation instance. This is needed to communicate between the integration and React
const routingInstrumentation = new Sentry.ReactNavigationV4Instrumentation();

class Root extends Component {
  appContainer = React.createRef();
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
    };
  }

  componentDidMount() {
    routingInstrumentation.registerAppContainer(this.appContainer);
  }

  render() {
    return <AppStack ref={this.appContainer} />;
  }
}

const mapStateToProps = state => {
  return {
    state: state.authenticate,
  };
};

const mapDispatchToProps = {
  restoreSession,
};

export default connect(mapStateToProps, mapDispatchToProps)(Root);
