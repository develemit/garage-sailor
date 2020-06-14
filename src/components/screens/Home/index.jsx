import React from 'react';
import { object, func } from 'prop-types';
import { View, Text, TouchableOpacity as TO } from 'react-native';
import { useStore } from '../../../hooks';
// import { requestUser, getUser } from '../../../sockets/userSocketConnect';

const Home = ({ renderUsers, users }) => {
  const { navigate, goBack } = useStore();
  // const navigate = () => console.log('navigate');
  // const goBack = () => console.log('goBack');

  // const [{ first_name, last_name }, setUser] = useState({});
  // const [input, setInput] = useState('');

  // getUser(setUser);
  return (
    <View>
      {renderUsers(users)}
      <TO onPress={() => goBack()}>
        <Text>Go Back</Text>
      </TO>
      <Text>Im the</Text>
      <TO onPress={() => navigate('Other')}>
        <Text>Home!</Text>
      </TO>
      <TO onPress={() => navigate('Bananas')}>
        <Text>Bananas!</Text>
      </TO>
    </View>
  );
};

Home.propTypes = {
  renderUsers: func.isRequired,
  users: object.isRequired,
};

export default Home;
