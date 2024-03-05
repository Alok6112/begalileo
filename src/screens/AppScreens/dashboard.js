import React, {Component} from 'react';
import {View} from 'react-native';
import {COLOR} from '../../config/styles';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';

import Icon from 'react-native-vector-icons/FontAwesome5';
import HomeMainScreen from './HomeMainScreen';
import HomeMoreScreen from './HomeMoreScreen';
import HomeReportScreen from './HomeReportScreen';
import HomeScheduleScreen from './HomeScheduleScreen';

const Tab = createMaterialBottomTabNavigator();

class Dashboard extends Component {
  componentDidMount() {
    console.log('Dashboard Page', this.props);
  }

  render() {
    return <TabNavigator />;
  }
}

const TabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      activeColor={COLOR.TAB_ICON_ACTIVE}
      inactiveColor={COLOR.TAB_ICON_INACTIVE}
      barStyle={{backgroundColor: COLOR.WHITE, height: 52}}>
      <Tab.Screen
        name="Home"
        component={HomeMainScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({color}) => (
            <View>
              <Icon style={{color}} size={25} name={'home'} />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="HomeScheduleScreen"
        component={HomeScheduleScreen}
        options={{
          tabBarLabel: 'Schedule',
          tabBarIcon: ({color}) => (
            <View>
              <Icon style={{color}} size={25} name={'calendar'} />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="HomeReportScreen"
        component={HomeReportScreen}
        options={{
          tabBarLabel: 'Report',
          tabBarIcon: ({color}) => (
            <View>
              <Icon style={{color}} size={25} name={'chart-bar'} />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="HomeMoreScreen"
        component={HomeMoreScreen}
        options={{
          tabBarLabel: 'More',
          tabBarIcon: ({color}) => (
            <View>
              <Icon style={{color}} size={25} name={'bars'} />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
