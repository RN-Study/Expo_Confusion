import React, {useState} from 'react';
import { View, FlatList } from 'react-native';
import { ListItem, Tile } from 'react-native-elements';
import { connect } from 'react-redux';
import {DISHES} from "../shared/dishes";
import {baseURL} from "../shared/baseURL";

const mapStateToProps = (state) => {
  return {
    dishes: state.dishes,
  };
};

const Menu = (props) => {

  const { navigate } = props.navigation;
  const renderMenuItem = ({item, index}) => {
    return (
      <Tile
        key={index}
        title={item.name}
        subtitle={item.description}
        featured={true}
        imageSrc={{uri: baseURL + item.image}}
        onPress={() => {
          navigate('DishDetail', {dishId: item.id})
        }}
      />
    );
  };

  return (
    <FlatList
      data={props.dishes.dishes}
      renderItem={renderMenuItem}
      keyExtractor={item => item.id.toString()}
    />
  );
}


export default connect(mapStateToProps)(Menu);