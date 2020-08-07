import React, {useEffect, useState} from 'react';
import {SafeAreaView, StatusBar, View, StyleSheet, Image, Text, ToastAndroid} from "react-native";
import {createStackNavigator} from "@react-navigation/stack";
import {createDrawerNavigator, DrawerContentScrollView, DrawerItemList} from "@react-navigation/drawer";
import DishDetail from "./DishDetail";
import Menu from './MenuScreen';
import {Icon} from 'react-native-elements';
import Home from "./HomeScreen";
import AboutScreen from "./AboutScreen";
import ContactScreen from "./ContactScreen";
import Login from "./LoginScreen";
import {connect} from 'react-redux';
import {
  fetchDishes,
  fetchComments,
  fetchLeaders,
  fetchPromos
} from "../redux/ActionCreators";
import Reservation from "./ReservationScreen";
import Favorites from "./Favorites";
import NetInfo from '@react-native-community/netinfo';

const mapStateToProps = (state) => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders,
  };
};
const mapDispatchToProps = (dispatch) => ({
  fetchDishes: () => dispatch(fetchDishes()),
  fetchComments: () => dispatch(fetchComments()),
  fetchPromos: () => dispatch(fetchPromos()),
  fetchLeaders: () => dispatch(fetchLeaders()),
});

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

export const MenuNavigator = ({navigation}) => {
  return (
    <Stack.Navigator
      initialRouteName="Menu"
      // headerMode={'none'}
      screenOptions={{
        headerStyle: {backgroundColor: '#512DA8'},
        headerTintColor: '#FFF',
        headerTitleStyle: {color: '#FFF'},
      }}>
      <Stack.Screen
        name={'Menu'}
        component={Menu}
        options={{
          title: 'Menu',
          headerLeft: () => (
            <Icon
              name={'menu'}
              size={24}
              color={'white'}
              onPress={() => {
                navigation.toggleDrawer();
              }}
            />
          ),
        }}
      />
      <Stack.Screen
        name={'DishDetail'}
        component={DishDetail}
        options={{
          title: 'Dish Detail',
        }}
      />
    </Stack.Navigator>
  );
};
export const LoginNavigator = ({navigation}) => {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      // headerMode={'none'}
      screenOptions={{
        headerStyle: {backgroundColor: '#512DA8'},
        headerTintColor: '#FFF',
        headerTitleStyle: {color: '#FFF'},
        headerLeft: () => (
          <Icon
            name={'menu'}
            size={24}
            color={'white'}
            onPress={() => {
              navigation.toggleDrawer();
            }}
          />
        ),
      }}>
      <Stack.Screen
        name={'Login'}
        component={Login}
        options={{
          title: 'Login',
        }}
      />
    </Stack.Navigator>
  );
};
export const HomeNavigator = ({navigation}) => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      // headerMode={'none'}
      screenOptions={{
        headerStyle: {backgroundColor: '#512DA8'},
        headerTintColor: '#FFF',
        headerTitleStyle: {color: '#FFF'},
        headerLeft: () => (
          <Icon
            name={'menu'}
            size={24}
            color={'white'}
            onPress={() => {
              navigation.toggleDrawer();
            }}
          />
        ),
      }}>
      <Stack.Screen
        name={'Home'}
        component={Home}
        options={{
          title: 'Home',
        }}
      />
    </Stack.Navigator>
  );
};
// Assignment 1: Task 2 add About Screen in Drawer Navigator
export const AboutNavigator = ({navigation}) => {
  return (
    <Stack.Navigator
      initialRouteName="About"
      // headerMode={'none'}
      screenOptions={{
        headerStyle: {backgroundColor: '#512DA8'},
        headerTintColor: '#FFF',
        headerTitleStyle: {color: '#FFF'},
        headerLeft: () => (
          <Icon
            name={'menu'}
            size={24}
            color={'white'}
            onPress={() => {
              navigation.toggleDrawer();
            }}
          />
        ),
      }}>
      <Stack.Screen
        name={'About'}
        component={AboutScreen}
        options={{
          title: 'About Us',
          headerTitleAlign: 'left',
        }}
      />
    </Stack.Navigator>
  );
};
// Assignment 1: Task 1 add Contact Screen in Drawer Navigator
export const ContactNavigator = ({navigation}) => {
  return (
    <Stack.Navigator
      initialRouteName="Contact"
      // headerMode={'none'}
      screenOptions={{
        headerStyle: {backgroundColor: '#512DA8'},
        headerTintColor: '#FFF',
        headerTitleStyle: {color: '#FFF'},
        headerLeft: () => (
          <Icon
            name={'menu'}
            size={24}
            color={'white'}
            onPress={() => {
              navigation.toggleDrawer();
            }}
          />
        ),
      }}>
      <Stack.Screen
        name={'Contact'}
        component={ContactScreen}
        options={{
          title: 'Contact Us',
        }}
      />
    </Stack.Navigator>
  );
};
export const ReservationNavigator = ({navigation}) => {
  return (
    <Stack.Navigator
      initialRouteName="Reservation"
      // headerMode={'none'}
      screenOptions={{
        headerStyle: {backgroundColor: '#512DA8'},
        headerTintColor: '#FFF',
        headerTitleStyle: {color: '#FFF'},
        headerLeft: () => (
          <Icon
            name={'menu'}
            size={24}
            color={'white'}
            onPress={() => {
              navigation.toggleDrawer();
            }}
          />
        ),
      }}>
      <Stack.Screen
        name={'Reservation'}
        component={Reservation}
        options={{
          title: 'Reservation',
        }}
      />
    </Stack.Navigator>
  );
};
export const FavoriteNavigator = ({navigation}) => {
  return (
    <Stack.Navigator
      initialRouteName="Favorites"
      // headerMode={'none'}
      screenOptions={{
        headerStyle: {backgroundColor: '#512DA8'},
        headerTintColor: '#FFF',
        headerTitleStyle: {color: '#FFF'},
        headerLeft: () => (
          <Icon
            name={'menu'}
            size={24}
            color={'white'}
            onPress={() => {
              navigation.toggleDrawer();
            }}
          />
        ),
      }}>
      <Stack.Screen
        name={'Favorites'}
        component={Favorites}
        options={{
          title: 'My Favorites',
        }}
      />
    </Stack.Navigator>
  );
};
export const CustomDrawerContent = (props) => {
  return (
    <DrawerContentScrollView {...props}>
      <SafeAreaView
        style={styles.container}
        forceInset={{top: 'always', horizontal: 'never'}}>
        <View style={styles.drawerHeader}>
          <View style={{flex: 1}}>
            <Image
              source={require('../assets/images/logo.png')}
              style={styles.drawerImage}
            />
          </View>
          <View style={{flex: 2, alignContent: 'center'}}>
            <Text style={styles.drawerHeaderText}> Ristorante Confusion </Text>
          </View>
        </View>
        <View style={{flex: 5}}>
          <DrawerItemList {...props} />
        </View>
      </SafeAreaView>
    </DrawerContentScrollView>
  );
};
export const MainNavigator = (props) => {
  return (
    <Drawer.Navigator
      initialRouteName={'Home'}
      drawerStyle={{
        backgroundColor: '#D1C4E9',
      }}
      drawerContentOptions={
        {
          // activeTintColor: '#e91e63',
        }
      }
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={({route}) => ({
        drawerIcon: ({color, focused}) => {
          let iconName;
          let iconType = 'font-awesome';
          let size;
          if (route.name === 'Login') {
            iconName = `sign-in${focused ? '' : ''}`;
            size = 24;
          } else if (route.name === 'Home') {
            iconName = `home${focused ? '' : ''}`;
            size = 24;
          } else if (route.name === 'About') {
            iconName = `info-circle${focused ? '' : ''}`;
            size = 24;
          } else if (route.name === 'Menu') {
            iconName = `list${focused ? '' : ''}`;
            size = 24;
          } else if (route.name === 'Contact') {
            iconName = `address-card${focused ? '' : ''}`;
            size = 22;
              } else if (route.name === 'Reservation') {
                iconName = `cutlery${focused ? '' : ''}`;
                size = 24;
              } else if (route.name === 'Favorites') {
                iconName = `heart${focused ? '' : ''}`;
                size = 24;
              }
          return (
            <Icon name={iconName} type={iconType} size={size} color={color}/>
          );
        }
      })}
    >
      <Drawer.Screen
        name={'Login'}
        component={LoginNavigator}
        options={{
          title: 'Login',
          drawerLabel: 'Login',
        }}
      />
      <Drawer.Screen
        name={'Home'}
        component={HomeNavigator}
        options={{
          title: 'Home',
          drawerLabel: 'Home',
        }}
      />
      {/* Assignment 1: Task 2 add About Screen in Drawer Navigator */}
      <Drawer.Screen
        name={'About'}
        component={AboutNavigator}
        options={{
          title: 'About',
          drawerLabel: 'About Us',
        }}
      />
      <Drawer.Screen
        name={'Menu'}
        component={MenuNavigator}
        options={{
          title: 'Menu',
          drawerLabel: 'Menu',
        }}
      />
      <Drawer.Screen
        name={'Favorites'}
        component={FavoriteNavigator}
        options={{
          title: 'My Favorites',
          drawerLabel: 'My Favorites',
        }}
      />
      {/* Assignment 1: Task 1 add Contact Screen in Drawer Navigator */}
      <Drawer.Screen
        name={'Contact'}
        component={ContactNavigator}
        options={{
          title: 'Contact',
          drawerLabel: 'Contact Us',
        }}
      />
      <Drawer.Screen
        name={'Reservation'}
        component={ReservationNavigator}
        options={{
          title: 'Reserve Table',
          drawerLabel: 'Reserve Table',
        }}
      />
    </Drawer.Navigator>
  );
};

const Main = (props) => {
  useEffect(() => {
    props.fetchDishes();
    props.fetchLeaders();
    props.fetchPromos();
    props.fetchComments();

    NetInfo.fetch()
      .then((connectionInfo) => {
        ToastAndroid.show('Initial Network Connectivity Type: '
        + connectionInfo.type + ', effectiveType: ' + connectionInfo.effectiveType,
          ToastAndroid.LONG)
      });
    const unsubscribe = NetInfo.addEventListener('connectionChange', handleConnectivityChange);
    return () => {
      unsubscribe();
    };
  }, []);

  // useEffect(() => {
  //   NetInfo.removeEventListener('connectionChange', handleConnectivityChange);
  // });

  const handleConnectivityChange = (connectionInfo) => {
    switch (connectionInfo.type) {
      case 'none':
        ToastAndroid.show('You are now offline!', ToastAndroid.LONG);
        break;
      case 'wifi':
        ToastAndroid.show('You are now connected to Wifi!', ToastAndroid.LONG);
        break;
      case 'cellular':
        ToastAndroid.show('You are now connected to Cellular!', ToastAndroid.LONG);
        break;
      case 'unknown':
        ToastAndroid.show('You are have an unknown connection!', ToastAndroid.LONG);
        break;
      default:
        break;
    }
  };

  return (
    <View style={{flex: 1}}>
      <StatusBar barStyle="dark-content"/>
      <SafeAreaView style={{flex: 1}}>
        <MainNavigator/>
      </SafeAreaView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  drawerHeader: {
    backgroundColor: '#512DA8',
    height: 140,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    flexDirection: 'row',
  },
  drawerImage: {
    margin: 10,
    width: 80,
    height: 60,
  },
  drawerHeaderText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(Main);