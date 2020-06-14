import React, { useReducer } from 'react';
import {
  StyleSheet, Text, View, TouchableOpacity as TO,
} from 'react-native';
import screens from '../components/screens';
import { StoreContext } from '../hooks';
import { limitArray } from '../helpers';
import { requestUser } from '../sockets/userSocketConnect';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const reducer = (state, payload) => (payload ? { ...state, ...payload } : state);

const AppNavigator = (properties) => {
  const [nav, setNav] = useReducer(reducer, {
    history: [],
    currentScreen: 'Home',
    forwardScreens: [],
  });

  const navigate = async (screen) => {
    const { history, currentScreen } = nav;
    const newHistory = limitArray([currentScreen, ...history], 10);
    requestUser('Emit');
    setNav({ history: newHistory, currentScreen: screen, forwardScreen: [] });
  };
  const goBack = () => {
    const { history, forwardScreens, currentScreen } = nav;
    const previousScreen = history.shift() || currentScreen;
    setNav({ history, currentScreen: previousScreen, forwardScreen: [currentScreen, ...forwardScreens] });
  };

  const { currentScreen } = nav;
  const renderScreen = (Screen, properties_) => <Screen {...properties_} />;
  const CurrentScreen = (properties_) => (screens[currentScreen]
    ? renderScreen(screens[currentScreen], properties_)
    : (
      <TO onPress={goBack}>
        <Text>Not Here... Back to Home!</Text>
      </TO>
    ));

  const context = {
    navigate,
    goBack,
  };

  return (
    <View style={styles.container}>
      <StoreContext.Provider value={context}>
        <CurrentScreen {...properties} />
      </StoreContext.Provider>
    </View>
  );
};

export default AppNavigator;
