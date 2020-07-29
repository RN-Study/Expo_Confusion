import React, {useState} from 'react';
import {SafeAreaView, StatusBar, View} from "react-native";
import {createStackNavigator} from "@react-navigation/stack";
import {createDrawerNavigator} from "@react-navigation/drawer";
import DishDetail from "./DishDetail";
import Menu from './MenuScreen';
import { DISHES } from '../shared/dishes';
import {Icon} from 'react-native-elements';
import Home from "./HomeScreen";

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
          // headerLeft: () => (
          //   <Icon
          //     name={'menu'}
          //     size={24}
          //     color={'white'}
          //     onPress={() => {
          //       navigation.toggleDrawer();
          //     }}
          //   />
          // ),
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

export const HomeNavigator = ({navigation}) => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      // headerMode={'none'}
      screenOptions={{
        headerStyle: {backgroundColor: '#512DA8'},
        headerTintColor: '#FFF',
        headerTitleStyle: {color: '#FFF'},
        // headerLeft: () => (
        //   <Icon
        //     name={'menu'}
        //     size={24}
        //     color={'white'}
        //     onPress={() => {
        //       navigation.toggleDrawer();
        //     }}
        //   />
        // ),
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
      // drawerContent={(props) => <CustomDrawerContent {...props} />}
      // screenOptions={({route}) => ({
      //   drawerIcon: ({color, focused}) => {
      //     let iconName;
      //     let iconType = 'font-awesome';
      //     let size;
      //     if (route.name === 'Home') {
      //       iconName = `home${focused ? '' : ''}`;
      //       size = 24;
      //     } else if (route.name === 'About') {
      //       iconName = `info-circle${focused ? '' : ''}`;
      //       size = 24;
      //     } else if (route.name === 'Menu') {
      //       iconName = `list${focused ? '' : ''}`;
      //       size = 24;
      //     } else if (route.name === 'Contact') {
      //       iconName = `address-card${focused ? '' : ''}`;
      //       size = 22;
      //     } else if (route.name === 'Reservation') {
      //       iconName = `cutlery${focused ? '' : ''}`;
      //       size = 24;
      //     } else if (route.name === 'Favorites') {
      //       iconName = `heart${focused ? '' : ''}`;
      //       size = 24;
      //     }
      //     return (
      //       <Icon name={iconName} type={iconType} size={size} color={color} />
      //     );
      //   },
      // })}
    >
      <Drawer.Screen
        name={'Home'}
        component={HomeNavigator}
        options={{
          title: 'Home',
          drawerLabel: 'Home',
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
    </Drawer.Navigator>
  );
};

const Main = (props) => {
const [dishes] = useState(DISHES);
  const [selectedDish, setSelectedDish] = useState(null);
  const onDishSelect = (dishId) => {
    setSelectedDish(dishId);
  }
    return (
      <View style={{flex: 1}}>
        <StatusBar barStyle="dark-content"/>
        <SafeAreaView style={{flex: 1}}>
          {/*<Menu dishes={dishes} onPress={(dishId) => onDishSelect(dishId)}/>*/}
          {/*<DishDetail dish={dishes.filter((dish) => dish.id === selectedDish)[0]}/>*/}
          <MainNavigator/>
        </SafeAreaView>
      </View>
    );
}

export default Main;