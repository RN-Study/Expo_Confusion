import React, {useState} from 'react';
import {SafeAreaView, StatusBar, View} from "react-native";
import {createStackNavigator} from "@react-navigation/stack";
import DishDetail from "./DishDetail";
import Menu from './MenuComponent';
import { DISHES } from '../shared/dishes';

const Stack = createStackNavigator();

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
          <MenuNavigator/>
        </SafeAreaView>
      </View>
    );
}

export default Main;