import React, {useState, useRef} from 'react';
import {FlatList, Text, View, Alert, PanResponder, Share} from 'react-native';
import {Card, Icon, Rating} from 'react-native-elements';
import {connect} from 'react-redux';
import {baseURL} from '../shared/baseURL';
import {postComment, postFavorite} from "../redux/ActionCreators";
import CommentForm from "./CommentForm";
import * as Animatable from 'react-native-animatable';

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
    const handleViewRef = useRef(null);
    const recognizeDragRightToLeft = ({moveX, moveY, dx, dy}) => {
      if (dx < -40) {
        return true;
      } else {
        return false;
      }
    };
    // Assignment 3: Task 3
    const recognizeDragLeftToRight = ({moveX, moveY, dx, dy}) => {
      if ( 40 < dx < 100) {
        return true;
      } else {
        return false;
      }
    };
    const panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (e, gestureState) => {
        return true;
      },
      onPanResponderGrant: () => {
        handleViewRef.current
          .rubberBand(1000)
          .then((endState) =>
            console.log(endState.finished ? 'finished' : 'cancelled'),
          );
      },
      onPanResponderEnd: (e, gestureState) => {
        if (recognizeDragRightToLeft(gestureState)) {
          Alert.alert(
            'Add favorite?',
            'Are you sure you wish to add' + dish.name + 'to favorite ?',
            [
              {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
              },
              {
                text: 'OK',
                onPress: () => {
                  props.favorite
                    ? console.log('Alread favorite')
                    : props.onPressFavorite();
                },
                style: 'OK',
              },
            ],
            {cancelable: false},
          );
          return true;
        } else if (recognizeDragLeftToRight(gestureState)) { // Assignment 3: Task 3
          toogleModal();
        }
      },
    });

    const shareDish = (title, message, url) => {
      Share.share({
        title: title,
        message: title + ': ' + message + ' ' + url,
        url: url
      }, {
        dialogTitle: 'Share ' + title
      });
    };

    if (dish) {
      return (
        <Animatable.View
          animation="fadeInDown"
          duration={2000}
          delay={1000}
          ref={handleViewRef}
          {...panResponder.panHandlers}
        >
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
              {/* Assignment 2: Task 1 add button comment */}
              <Icon
                raised={true}
                reverse={true}
                name={'pencil'}
                type={'font-awesome'}
                color={'#512DA8'}
                onPress={toogleModal}
              />
              <Icon
                raised={true}
                reverse={true}
                name={'share'}
                type={'font-awesome'}
                color={'#512DA8'}
                onPress={() => shareDish(dish.name, dish.description, baseURL + dish.image)}
              />
            </View>
            {/* Assignment 2: Task 1 add comment form using Modal */}
            <CommentForm
              isShow={showModal}
              toogleModal={toogleModal}
              handleComment={addCommentStart}
              dishId={dishId}
            />
          </Card>
        </Animatable.View>
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
          {/* Assignment 2: Task 1 Change Rating text to Icon */}
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
      <Animatable.View animation="fadeInUp" duration={2000} delay={1000}>
        <Card title={'Comments'}>
          <FlatList
            data={comments}
            renderItem={renderCommentItem}
            keyExtractor={(item) => item.id.toString()}
          />
        </Card>
      </Animatable.View>
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