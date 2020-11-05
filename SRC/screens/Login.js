import React, {useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {Button, Text, TextInput} from 'react-native-paper';
import {connect} from 'react-redux';
import {problem3Wait} from '../redux/action';

const Login = ({navigation, bookings, AccesLogin}) => {
  const [email, setEmail] = useState('testapis@tuten.cl');
  const [password, setPassword] = useState('1234');
  const app = 'APP_BCK';

  return (
    <View style={styles.contain}>
      <Text style={styles.title}>Welcome Tuten App</Text>
      <TextInput
        style={styles.space}
        label="Email"
        value={email}
        onChangeText={(value) => setEmail(value)}
      />
      <TextInput
        style={styles.space}
        label="Password"
        value={password}
        secureTextEntry
        onChangeText={(value) => setPassword(value)}
      />
      <Button
        style={styles.space}
        mode="contained"
        onPress={() => {
          AccesLogin({email: email, password: password, app: app});
          navigation.navigate('Booking');
        }}>
        Login
      </Button>
    </View>
  );
};
const styles = StyleSheet.create({
  contain: {
    flex: 1,
    backgroundColor: 'black',
    padding: '5%',
  },
  title: {
    fontSize: 40,
    color: 'white',
    textAlign: 'center',
  },
  space: {
    marginVertical: 5,
  },
});

const mapStateToProps = (state) => ({
  bookings: state.problem3Reducer.data,
});
const mapDispatchToProps = (dispatch) => {
  return {
    AccesLogin: (payload) => dispatch(problem3Wait(payload)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Login);
