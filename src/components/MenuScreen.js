import React, {useState} from 'react';
import {View, FlatList, Text} from 'react-native';
import {ListItem, Tile} from 'react-native-elements';
import {connect} from 'react-redux';
import {DISHES} from "../shared/dishes";
import {baseURL} from "../shared/baseURL";
import Loading from "./Loading";
import * as Animatable from 'react-native-animatable';

const mapStateToProps = (state) => {
  return {
    dishes: state.dishes,
  };
};

const Menu = (props) => {

  const {navigate} = props.navigation;
  const renderMenuItem = ({item, index}) => {
    return (
      <Animatable.View animation="fadeInRightBig" duration={2000}>
        <Tile
          key={index}
          title={item.name}
          caption={item.description}
          featured={true}
          imageSrc={{uri: baseURL + item.image}}
          onPress={() => {
            navigate('DishDetail', {dishId: item.id})
          }}
        />
      </Animatable.View>
    );
  };
  if (props.dishes.isLoading) {
    return <Loading/>;
  } else if (props.dishes.errorMessage) {
    return (
      <View>
        <Text>{props.dishes.errorMessage}</Text>
      </View>
    );
  } else {
    return (
      <FlatList
        data={props.dishes.dishes}
        renderItem={renderMenuItem}
        keyExtractor={item => item.id.toString()}
      />
    );
  }
}


export default connect(mapStateToProps)(Menu);