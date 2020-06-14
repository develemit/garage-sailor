/* eslint-disable react/jsx-filename-extension */
import React, { useState, useEffect } from 'react';
import { Text } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import AppNavigator from './src/AppNavigator';
import { userSocketConnect } from './src/sockets/userSocketConnect';
import { registerForPushNotificationsAsync } from './permissions';

const renderUsers = (users) => users.map(({ first_name, id }) => <Text key={id}>{id}: {first_name}</Text>);

// Put any code you need to prepare your app in these functions
const performAPICalls = async () => { };
const downloadAssets = async () => { };

const App = () => {
  const [appIsReady, setAppIsReady] = useState(false);
  const [users, setUsers] = useState([]);
  const [_ExpoPushToken, setExpoPushToken] = useState(null);

  registerForPushNotificationsAsync(setExpoPushToken);
  userSocketConnect(setUsers);
  useEffect(() => {
    const prepareResources = async () => {
      await performAPICalls();
      await downloadAssets();

      setTimeout(async () => {
        await SplashScreen.hideAsync();
      }, 2000);
      setAppIsReady(true);
    };

    const componentDidMount = async () => {
      // Prevent native splash screen from autohiding
      try {
        await SplashScreen.preventAutoHideAsync();
      } catch (error) {
        // console.warn(error);
      }
      prepareResources();
    };

    componentDidMount();
  }, []);

  /**
   * Method that serves to load resources and make API calls
   */

  if (!appIsReady) {
    // console.log('is this happening alot?');
    return null;
  }

  return (
    <AppNavigator renderUsers={renderUsers} users={users} />
  );
};

export default App;
