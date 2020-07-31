import React, {useEffect, useState} from 'react';
import {View, Text, ScrollView, Animated, Easing} from 'react-native';
import {Card} from 'react-native-elements';
import {connect} from 'react-redux';
import {baseURL} from '../shared/baseURL';
import Loading from "./Loading";

const mapStateToProps = (state) => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders
  }
}

const Home = (props) => {
  const animatedValue = new Animated.Value(0);
  const animate = () => {
    animatedValue.setValue(0);
    Animated.timing(animatedValue, {
      toValue: 8,
      duration: 16000,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start(() => animate());
  };
  useEffect(() => {
    animate();
  });
  const xpos1 = animatedValue.interpolate({
    inputRange: [0, 1, 3, 5, 8],
    outputRange: [1200, 600, 0, -600, -1200],
  });
  const xpos2 = animatedValue.interpolate({
    inputRange: [0, 2, 4, 6, 8],
    // inputRange: [0, 1, 3, 5, 8],
    outputRange: [1200, 600, 0, -600, -1200],
  });
  const xpos3 = animatedValue.interpolate({
    inputRange: [0, 3, 5, 7, 8],
    // inputRange: [0, 1, 3, 5, 8],
    outputRange: [1200, 600, 0, -600, -1200],
  });

  const RenderItem = (props) => {
    const item = props.item;
    if (props.isLoading) {
      return <Loading/>;
    } else if (props.errorMessage) {
      return (
        <View>
          <Text>{props.errorMessage}</Text>
        </View>
      );
    } else {
      if (item) {
        return (
          <Card
            featuredTitle={item.name}
            featuredSubtitle={item.designation}
            image={{uri: baseURL + item.image}}>
            <Text style={{margin: 10}}> {item.description} </Text>
          </Card>
        );
      } else {
        return <View/>;
      }
    }
  };

  return (
    <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center'}}>
      <Animated.View style={{width: '100%', transform: [{translateX: xpos1}]}}>
        <RenderItem
          item={props.dishes.dishes.filter((dish) => dish.featured)[0]}
          isLoading={props.dishes.isLoading}
          errorMessage={props.dishes.errorMessage}
        />
      </Animated.View>
      <Animated.View style={{width: '100%', transform: [{translateX: xpos2}]}}>
        <RenderItem
          item={props.promotions.promotions.filter((promo) => promo.featured)[0]}
          isLoading={props.promotions.isLoading}
          errorMessage={props.promotions.errorMessage}
        />
      </Animated.View>
      <Animated.View style={{width: '100%', transform: [{translateX: xpos2}]}}>
        <RenderItem
          item={props.leaders.leaders.filter((leader) => leader.featured)[0]}
          isLoading={props.leaders.isLoading}
          errorMessage={props.leaders.errorMessage}
        />
      </Animated.View>
    </View>
  );
}

export default connect(mapStateToProps)(Home);