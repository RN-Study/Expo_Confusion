import React, {Component, useState} from 'react';
import {SafeAreaView, StatusBar, View} from "react-native";
import DishDetail from "./DishDetail";
import Menu from './MenuComponent';
import { DISHES } from '../shared/dishes';

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
          <Menu dishes={dishes} onPress={(dishId) => onDishSelect(dishId)}/>
          <DishDetail dish={dishes.filter((dish) => dish.id === selectedDish)[0]}/>
        </SafeAreaView>
      </View>
    );
}

export default Main;