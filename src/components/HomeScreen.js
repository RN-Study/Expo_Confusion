import React, {Component, useState} from 'react';
import {View, Text, ScrollView} from 'react-native';
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
    <ScrollView>
      <RenderItem
        item={props.dishes.dishes.filter((dish) => dish.featured)[0]}
                  isLoading={props.dishes.isLoading}
                  errorMessage={props.dishes.errorMessage}
      />
      <RenderItem
        item={props.promotions.promotions.filter((promo) => promo.featured)[0]}
        isLoading={props.promotions.isLoading}
        errorMessage={props.promotions.errorMessage}
      />
      <RenderItem
        item={props.leaders.leaders.filter((leader) => leader.featured)[0]}
        isLoading={props.leaders.isLoading}
        errorMessage={props.leaders.errorMessage}
      />
    </ScrollView>
  );
}

export default connect(mapStateToProps)(Home);