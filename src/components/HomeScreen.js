import React, {Component, useState} from 'react';
import {View, Text, ScrollView} from 'react-native';
import {Card} from 'react-native-elements';
import {DISHES} from "../shared/dishes";
import {LEADERS} from "../shared/leaders";
import {PROMOTIONS} from "../shared/promotions";

export const RenderItem = (props) => {
    const item = props.item;
    // if (props.isLoading) {
    //     return <Loading />;
    // } else if (props.errorMessage) {
    //     return (
    //       <View>
    //           <Text>{props.errorMessage}</Text>
    //       </View>
    //     );
    // } else {
    if (item !== null) {
        return (
          <Card
            featuredTitle={item.name}
            featuredSubtitle={item.designation}
            // image={{uri: baseURL + item.image}}
            image={require('../assets/images/uthappizza.png')}
          >
              <Text style={{margin: 10}}> {item.description} </Text>
          </Card>
        );
    } else {
        return <View />;
    }
    // }
};

const Home = (props) => {
    const [dishes] = useState(DISHES);
    const [leaders] = useState(LEADERS);
    const [promotions] = useState(PROMOTIONS);
    return(
      <ScrollView>
          <RenderItem item={dishes.filter((dish) => dish.featured)[0]}/>
          <RenderItem item={promotions.filter((promo) => promo.featured)[0]}/>
          <RenderItem item={leaders.filter((leader) => leader.featured)[0]}/>
      </ScrollView>
    );
}

export default Home;