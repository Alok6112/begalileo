import React, {Component} from 'react';
import {View, Text, ActivityIndicator} from 'react-native';
import {connect} from 'react-redux';
import {getDashboardItems, setUserDetails} from '../../actions/dashboard';
import {CommonStyles} from '../../config/styles';
import * as Constants from '../../components/helpers/Constants';
import {
  getLocalData,
  storeLocalData,
} from '../../components/helpers/AsyncMethods';
import AsyncStorage from '@react-native-community/async-storage';
class MainScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFocused: false,
    };
  }

  componentDidMount() {
    console.log('Main Screen CDM');
    AsyncStorage.multiGet([
      Constants.ParentUserId,
      Constants.ParentFirstName,
      Constants.ParentLastName,
      Constants.ParentCountryName,
      Constants.ParentCurrency,
    ]).then(response => {
      this.props.setUserDetails(
        JSON.parse(response[0][1]),
        JSON.parse(response[1][1]),
        JSON.parse(response[2][1]),
        JSON.parse(response[3][1]),
        JSON.parse(response[4][1]),
      );
      this.props.getDashboardItems(
        JSON.parse(response[0][1]),
        JSON.parse(response[3][1]),
        '',
      );
    });
  }

  checkDashboardItems = () => {
    getLocalData(Constants.ParentUserId).then(parentId => {
      this.props.getDashboardItems(parentId, 'India', '');
    });
  };

  componentDidUpdate(prevProps) {
    if (prevProps.dashboard_status !== this.props.dashboard_status) {
      if (this.props.dashboard_status) {
        this.props.navigation.navigate(Constants.Dashboard, {
          kidList: this.props.dashboard_response.students,
        });
      }
    }
  }

  render() {
    const {loading} = this.props;
    return (
      <View style={{flex: 1}}>
        {loading && (
          <ActivityIndicator
            size="large"
            color="black"
            style={CommonStyles.loadingIndicatior}
          />
        )}
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    state: state.dashboard,
    loading: state.dashboard.loading,
    dashboard_status: state.dashboard.dashboard_status,
    dashboard_response: state.dashboard.dashboard_response,
  };
};

const mapDispatchToProps = {
  getDashboardItems,
  setUserDetails,
};

export default connect(mapStateToProps, mapDispatchToProps)(MainScreen);
