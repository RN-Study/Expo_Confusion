import React, {useState} from 'react';
import {FlatList, Text, View} from 'react-native';
import {Card, Icon} from 'react-native-elements';
import {DISHES} from "../shared/dishes";
import {COMMENTS} from "../shared/comments";

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
        <Icon
          raised={true}
          reverse={true}
          name={props.favorite ? 'heart' : 'heart-o'}
          type={'font-awesome'}
          color={'#f50'}
          onPress={() => {
            props.favorite
              ? console.log('Alread favorite')
              : props.onPressFavorite();
          }}
        />
      </Card>
    );
  }
  else {
    return(<View></View>);
  }
}
const RenderComments = (props) => {
  const comments = props.comments;
  const renderCommentItem = ({item, index}) => {
    const rating = item.rating;
    return (
      <View key={index} style={{margin: 10}}>
        <Text style={{fontSize: 16}}> {item.comment} </Text>
        <Text style={{fontSize: 12}}>{rating} Stars</Text>
        <Text style={{fontSize: 12}}>
          {'-- ' + item.author + ',' + item.date}
        </Text>
      </View>
    );
  };
  return (
      <Card title={'Comments'}>
        <FlatList
          data={comments}
          renderItem={renderCommentItem}
          keyExtractor={(item) => item.id.toString()}
        />
      </Card>
  );
};
const DishDetail = (props) => {
  const [dishes] = useState(DISHES);
  const [comments] = useState(COMMENTS);
  const [favorites, setFavorites] = useState([]);
  const {dishId} = props.route.params;

  const markFavorite = (dishId) => {
    setFavorites(favorites.concat(dishId));
  }

  return (
    <FlatList
      ListHeaderComponent={() => (
        <RenderDish
          dish={dishes[+dishId]}
          favorite={favorites.some((el) => el === dishId)}
          onPressFavorite={() => markFavorite(dishId)}
        />
      )}
      ListFooterComponent={() => (
        <RenderComments
          comments={comments.filter(
            (comment) => comment.dishId === dishId,
          )}
        />
      )}
    />
  );
};

export default DishDetail;