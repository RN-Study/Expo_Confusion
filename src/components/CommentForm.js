import {Button, Modal, Platform, StyleSheet, View} from 'react-native';
import {Icon, Input, Rating} from 'react-native-elements';
import React, {useState} from 'react';

const CommentForm = (props) => {
  const [author, setAuthor] = useState('');
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(0);
  const resetFormComment = () => {
    setAuthor('');
    setComment('');
    setRating(0);
  };

  return (
    <View style={{flex: 1}}>
      <Modal
        animationType={'slide'}
        transparent={false}
        visible={props.isShow}
        onDismiss={() => {
          props.toogleModal();
        }}
        onRequestClose={() => {
          props.toogleModal();
        }}>
        <View style={styles.modal}>
          <Rating
            imageSize={30}
            showRating={true}
            startingValue={rating}
            onFinishRating={setRating}
            style={{alignItems: 'center', marginBottom: 10}}
          />
          <Input
            placeholder="Author"
            inputStyle={{marginLeft: 20}}
            containerStyle={{
              marginBottom: -20,
              // paddingHorizontal: Platform.OS === 'ios' ? 0 : 30,
            }}
            inputContainerStyle={{
              marginHorizontal: Platform.OS === 'ios' ? -30 : 0,
            }}
            leftIcon={
              <Icon
                name="user-o"
                size={24}
                color="black"
                type={'font-awesome'}
              />
            }
            value={author}
            onChangeText={setAuthor}
            autoCorrect={false}
          />
          <Input
            placeholder="Comment"
            inputStyle={{marginLeft: Platform.OS === 'ios' ? 20 : 20}}
            containerStyle={{
              marginTop: Platform.OS === 'ios' ? 0 : -50,
            }}
            inputContainerStyle={{
              marginHorizontal: Platform.OS === 'ios' ? -30 : 0,
              // marginBottom: Platform.OS === 'ios' ? 0 : -50,
            }}
            leftIcon={
              <Icon
                name="comment-o"
                size={24}
                color="black"
                type={'font-awesome'}
              />
            }
            value={comment}
            onChangeText={setComment}
            autoCorrect={false}
            multiline={true}
            numberOfLines={6}
          />
          <View
            style={{
              backgroundColor: Platform.OS === 'ios' ? '#512DA8' : '',
              borderRadius: 5,
            }}>
            <Button
              title={'SUBMIT'}
              color={Platform.OS === 'ios' ? 'white' : '#512DA8'}
              accessibilityLabel={'Post your comment'}
              onPress={() => {
                props.handleComment({
                  author: author,
                  comment: comment,
                  dishId: props.dishId,
                  id: null,
                  rating: rating,
                });
              }}
            />
          </View>
          <View
            style={{
              marginTop: 20,
              backgroundColor: Platform.OS === 'ios' ? 'gray' : '',
              borderRadius: 5,
            }}>
            <Button
              title={'CANCEL'}
              color={Platform.OS === 'ios' ? 'white' : 'gray'}
              accessibilityLabel={'Dismiss modal'}
              onPress={() => {
                props.toogleModal();
                resetFormComment();
              }}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};
const styles = StyleSheet.create({
  rating: {
    alignItems: 'flex-start',
    paddingVertical: 10,
  },
  modal: {
    // flex: 1,
    justifyContent: 'center',
    margin: Platform.OS === 'ios' ? 60 : 30,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    backgroundColor: '#512DA8',
    textAlign: 'center',
    color: 'white',
    marginBottom: 20,
  },
  modalText: {
    fontSize: 18,
    margin: 10,
  },
});

export default CommentForm;
