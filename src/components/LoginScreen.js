import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Button} from 'react-native';
import {Input, CheckBox} from 'react-native-elements';
import * as SecureStore from 'expo-secure-store';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  useEffect(async () => {
    await SecureStore.getItemAsync('userInfo')
      .then((userData) => {
        const userInfo = JSON.parse(userData);
        if (userInfo) {
          setUsername(userInfo.username);
          setPassword(userInfo.password);
          setRemember(true);
        }
      })
  }, []);

  const handleLogin = () => {
    const userData = {username, password};
    console.log(JSON.stringify({username, password, remember}));
    if (remember) {
      SecureStore.setItemAsync('userInfo', JSON.stringify(userData))
        .catch((error) => {
          console.log('Could not save user info', error);
        });
    } else {
      setUsername('');
      setPassword('');
      SecureStore.deleteItemAsync('userInfo')
        .catch((error) => {
          console.log('Could not delete user info', error);
        });
    }
  };

  return (
    <View style={styles.container}>
      <Input
        placeholder={'Username'}
        leftIcon={{name: 'user-o', type: 'font-awesome'}}
        onChangeText={(username) => setUsername(username)}
        value={username}
        containerStyle={styles.formInput}
      />
      <Input
        placeholder={'Password'}
        leftIcon={{name: 'key', type: 'font-awesome'}}
        onChangeText={(password) => setPassword(password)}
        value={password}
        containerStyle={styles.formInput}
      />
      <CheckBox
        title={'Remember me'}
        center={true}
        checked={remember}
        onPress={() => setRemember(!remember)}
        containerStyle={styles.formCheckBox}
        checkedColor={'green'}
        uncheckedColor={'gray'}
      />
      <View style={styles.formButton}>
        <Button title={'Login'} onPress={() => handleLogin()} color={'white'}/>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    margin: 20,
    // backgroundColor: 'gray',
  },
  formInput: {
    // backgroundColor: 'tomato',
  },
  formCheckBox: {
    margin: 40,
    backgroundColor: null,
  },
  formButton: {
    backgroundColor: '#512DA8',
    marginHorizontal: 80,
    borderRadius: 8,
    justifyContent: 'center',
    height: 50,
  },
});

export default Login;
