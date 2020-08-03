import React from 'react';
import {View, FlatList, Text, Alert} from 'react-native';
import {ListItem} from 'react-native-elements';
import {connect} from 'react-redux';
import {baseURL} from '../shared/baseURL';
import Loading from './Loading';
import {deleteFavorite} from '../redux/ActionCreators';
import Swipeout from "react-native-swipeout";
import * as Animatable from 'react-native-animatable';

const mapStateToProps = (state) => {
  return {
    dishes: state.dishes,
    favorites: state.favorites,
  };
};

const mapDispatchToProps = (dispatch) => ({
  deleteFavorite: (dishId) => dispatch(deleteFavorite(dishId)),
});

const Favorites = (props) => {
  const {navigate} = props.navigation;

  const RenderMenuItem = ({item, index}) => {
    const RightButton = [
      {
        text: 'Delete',
        type: 'delete',
        onPress: () => {
          Alert.alert(
            'Delete Favorite',
            'Are you sure you wish to delete the favorite dish' +
            item.name +
            '?',
            [
              {
                text: 'Cancel',
                onPress: () => console.log(item.name + 'Not Delete'),
                style: 'cancel',
              },
              {
                text: 'Delete',
                onPress: () => props.deleteFavorite(item.id),
              },
            ],
            {cancelable: false},
          );
        },
      },
    ];
    return (
      <Swipeout right={RightButton} autoClose={true}>
        <ListItem
          key={index}
          title={item.name}
          subtitle={item.description}
          chevron={false}
          onPress={() => navigate('DishDetail', {dishId: item.id})}
          leftAvatar={{source: {uri: baseURL + item.image}}}
        />
      </Swipeout>
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
      <Animatable.View
        animation={'fadeInRightBig'}
        duration={2000}
        delay={1000}>
        <FlatList
          data={props.dishes.dishes.filter((dish) =>
            props.favorites.some((el) => el === dish.id),
          )}
          renderItem={RenderMenuItem}
          keyExtractor={(item) => item.id.toString()}
        />
      </Animatable.View>
    );
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Favorites);
