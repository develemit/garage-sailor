import React from 'react';
import { View, Text, TouchableOpacity as TO } from 'react-native';
import { useStore } from '../../../hooks';

const Other = () => {
  const { navigate, goBack } = useStore();
  // const navigate = () => console.log('navigate');
  // const goBack = () => console.log('goBack');
  return (
    <View>
      <TO onPress={() => goBack()}>
        <Text>Go Back</Text>
      </TO>
      <Text>Im the</Text>
      <TO onPress={() => navigate('Home')}>
        <Text>Other!</Text>
      </TO>
      <TO onPress={() => navigate('Bananas')}>
        <Text>Bananas!</Text>
      </TO>
    </View>
  );
};

export default Other;
