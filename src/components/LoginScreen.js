import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Text, ScrollView, Image} from 'react-native';
import {Input, CheckBox, Icon, Button} from 'react-native-elements';
import * as SecureStore from 'expo-secure-store';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import { Asset } from "expo-asset";
import * as ImageManipulator from "expo-image-manipulator";
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {baseURL} from "../shared/baseURL";

const Tab = createBottomTabNavigator();

const LoginTab = (props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);

  useEffect( () => {
     SecureStore.getItemAsync('userInfo')
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
    console.log(JSON.stringify({username, password, remember}));
    if (remember) {
      SecureStore.setItemAsync('userInfo', JSON.stringify({username, password}))
        .catch((error) => {
          console.log('Could not save user info', error);
        });
    } else {
      // setUsername('');
      // setPassword('');
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
        inputStyle={{marginLeft: 10}}
      />
      <Input
        placeholder={'Password'}
        leftIcon={{name: 'key', type: 'font-awesome'}}
        onChangeText={(password) => setPassword(password)}
        value={password}
        containerStyle={styles.formInput}
        inputStyle={{marginLeft: 10}}
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
        <Button
          title={'Login'}
          onPress={() => handleLogin()}
          color={'white'}
          buttonStyle={{backgroundColor: '#512DA8'}}
        />
      </View>
      <View style={styles.formButton}>
        <Button
          title={'Register'}
          clear
          onPress={() => props.navigation.navigate('Register')}
          buttonStyle={{backgroundColor: '#512DA8'}}
          icon={
            <Icon
              name={'user-plus'}
              type={"font-awesome"}
              color={'white'}
              size={24}
              style={{marginHorizontal: 10}}
            />}
          titleStyle={{color: 'white'}}
        />
      </View>
    </View>
  );
};

export const RegisterTab = (props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [imageURL, setImageURL] = useState(baseURL + 'images/logo.png');

  const getImageFromCamera = async () => {
    const cameraPermission = await Permissions.askAsync(Permissions.CAMERA);
    const cameraRollPermission = await Permissions.askAsync(Permissions.CAMERA_ROLL);

    if (cameraPermission.status === 'granted' && cameraRollPermission.status === 'granted') {
      let capturedImage = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [4, 3]
      });

      if (!capturedImage.cancelled) {
        // setImageURL(capturedImage.uri);
        processImage(capturedImage.uri);
      }
    }
  };

  const handleRegister = () => {
    console.log(JSON.stringify({username, password, remember}));
    if (remember) {
      SecureStore.setItemAsync('userInfo', JSON.stringify({username, password}))
        .catch((error) => {
          console.log('Could not save user info', error);
        });
    }
  };

  const processImage = async (imageURI) => {
    let processedImage = await ImageManipulator.manipulateAsync(
      imageURI,
      [{resize: {width: 400}}],
      {format: ImageManipulator.SaveFormat.PNG}
    );
    setImageURL(processedImage.uri);
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image
            source={{uri: imageURL}}
            loadingIndicatorSource={require('../assets/images/logo.png')}
            style={styles.imageStyle}
          />
          <Button
            title={'Camera'}
            onPress={getImageFromCamera}
          />
        </View>
        <Input
          placeholder={'Username'}
          leftIcon={{name: 'user-o', type: 'font-awesome'}}
          onChangeText={(username) => setUsername(username)}
          value={username}
          containerStyle={styles.formInput}
          inputStyle={{marginLeft: 10}}
        />
        <Input
          placeholder={'Password'}
          leftIcon={{name: 'key', type: 'font-awesome'}}
          onChangeText={(password) => setPassword(password)}
          value={password}
          containerStyle={styles.formInput}
          inputStyle={{marginLeft: 10}}
        />
        <Input
          placeholder={'First Name'}
          leftIcon={{name: 'user-o', type: 'font-awesome'}}
          onChangeText={(firstName) => setFirstName(firstName)}
          value={firstName}
          containerStyle={styles.formInput}
          inputStyle={{marginLeft: 10}}
        />
        <Input
          placeholder={'Last Name'}
          leftIcon={{name: 'user-o', type: 'font-awesome'}}
          onChangeText={(lastName) => setLastName(lastName)}
          value={lastName}
          containerStyle={styles.formInput}
          inputStyle={{marginLeft: 10}}
        />
        <Input
          placeholder={'Email'}
          leftIcon={{name: 'envelope-o', type: 'font-awesome'}}
          onChangeText={(email) => setEmail(email)}
          value={email}
          containerStyle={styles.formInput}
          inputStyle={{marginLeft: 10}}
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
          <Button
            title={'Register'}
            onPress={() => handleRegister()}
            buttonStyle={{backgroundColor: '#512DA8'}}
            icon={
              <Icon
                name={'user-plus'}
                type={"font-awesome"}
                color={'white'}
                size={24}
                style={{marginHorizontal: 10}}
              />}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const Login = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({color, focused}) => {
          let iconName;
          let iconType = 'font-awesome';
          let size;
          if (route.name === 'Login') {
            iconName = `sign-in${focused ? '' : ''}`;
            size = 24;
          } else if (route.name === 'Register') {
            iconName = `user-plus${focused ? '' : ''}`;
            size = 24;
          }
          return (
            <Icon name={iconName} type={iconType} size={size} color={color}/>
          );
        }
      })}
      tabBarOptions={{
        activeBackgroundColor: '#9575CD',
        inactiveBackgroundColor: '#D1C4E9',
        activeTintColor: '#FFFFFF',
        inactiveTintColor: 'gray'
      }}
    >
      <Tab.Screen name={'Login'} component={LoginTab}/>
      <Tab.Screen name={'Register'} component={RegisterTab}/>
    </Tab.Navigator>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,
  },
  imageContainer: {
    flex: 1,
    flexDirection: 'row',
    margin: 20
  },
  imageStyle: {
    margin: 20,
    width: 80,
    height: 60,
  },
  formInput: {},
  formCheckBox: {
    backgroundColor: null,
    borderWidth: 0
  },
  formButton: {
    marginTop: 20,
    backgroundColor: '#512DA8',
    marginHorizontal: 80,
    borderRadius: 8,
    justifyContent: 'center',
    height: 50,
  },
});

export default Login;
