import React, {useState} from 'react';
import { Text, View } from 'react-native';
import { Card } from 'react-native-elements';
import {DISHES} from "../shared/dishes";

const RenderDish = (props) => {
  const dish = props.dish;

  if (dish != null) {
    return(
      <Card
        featuredTitle={dish.name}
        image={require('../assets/images/uthappizza.png')}>
        <Text style={{margin: 10}}>
          {dish.description}
        </Text>
      </Card>
    );
  }
  else {
    return(<View></View>);
  }
}

const DishDetail = (props) => {
  const [dishes] = useState(DISHES);
  const {dishId} = props.route.params;

  return(<RenderDish dish={dishes[+dishId]} />);
}

export default DishDetail;