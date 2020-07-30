import React, {useState} from 'react';
import {FlatList, Text, View} from 'react-native';
import {Card, Icon, Rating} from 'react-native-elements';
import {connect} from 'react-redux';
import {baseURL} from '../shared/baseURL';
import {postComment, postFavorite} from "../redux/ActionCreators";
import CommentForm from "./CommentForm";

const mapStateToProps = (state) => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    favorites: state.favorites,
  };
};

const mapDispatchToProps = (dispatch) => ({
  postFavorite: (dishId) => dispatch(postFavorite(dishId)),
  addComment: (comment) => dispatch(postComment(comment)),
});

const DishDetail = (props) => {

  const {dishId} = props.route.params;
  const [showModal, setShowModal] = useState(false);
  const [favorites, setFavorites] = useState([]);

  const markFavorite = (dishId) => {
    props.postFavorite(dishId);
  };
  const toogleModal = () => {
    setShowModal(!showModal);
  };
  const addCommentStart = (comment) => {
    console.log('Handle comment start');
    props.addComment(comment);
    toogleModal();
  };
  const RenderDish = (props) => {
    const dish = props.dish;

    if (dish) {
      return (
        <Card
          featuredTitle={dish.name}
          image={{uri: baseURL + dish.image}}>
          <Text style={{margin: 10}}> {dish.description} </Text>
          <View style={{flexDirection: 'row', justifyContent: 'center'}}>
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
            <Icon
              raised={true}
              reverse={true}
              name={'pencil'}
              type={'font-awesome'}
              color={'#512DA8'}
              onPress={toogleModal}
            />
          </View>
          <CommentForm
            isShow={showModal}
            toogleModal={toogleModal}
            handleComment={addCommentStart}
            dishId={dishId}
          />
        </Card>
      );
    } else {
      return (<View></View>);
    }
  }
  const RenderComments = (props) => {
    const comments = props.comments;
    const renderCommentItem = ({item, index}) => {
      const rating = item.rating;
      return (
        <View key={index} style={{margin: 10}}>
          <Text style={{fontSize: 16}}> {item.comment} </Text>
          <Rating
            imageSize={24}
            readonly={true}
            startingValue={rating}
            style={{alignItems: 'flex-start', paddingVertical: 10}}
          />
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
  return (
    <View>
      <FlatList
        ListHeaderComponent={() => (
          <RenderDish
            dish={props.dishes.dishes[+dishId]}
            favorite={props.favorites.some((el) => el === dishId)}
            onPressFavorite={() => markFavorite(dishId)}
          />
        )}
        ListFooterComponent={() => (
          <RenderComments
            comments={props.comments.comments.filter(
              (comment) => comment.dishId === dishId,
            )}
          />
        )}
      />
    </View>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(DishDetail);