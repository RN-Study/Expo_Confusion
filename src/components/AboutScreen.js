import React, {useState} from 'react';
import {View, StyleSheet, Text, FlatList, SafeAreaView} from 'react-native';
import {Card, ListItem} from 'react-native-elements';
import {connect} from 'react-redux';
import {HISTORY} from '../shared/history';
import {LEADERS} from "../shared/leaders";
import {baseURL} from "../shared/baseURL";
import Loading from "./Loading";
import * as Animatable from 'react-native-animatable';

const mapStateToProps = (state) => {
  return {
    leaders: state.leaders,
  };
};
// Assignment 1: Task 2 add About Screen in Drawer Navigator
const AboutScreen = (props) => {
  const [history] = useState(HISTORY);
  const [leaders] = useState(LEADERS);

  const renderLeaderItem = ({item, index}) => {
    return (
      <ListItem
        key={index}
        title={item.name}
        subtitle={
          <View>
            <Text style={{color: 'gray'}}>{item.description}</Text>
          </View>
        }
        leftAvatar={{source: {uri: baseURL + item.image}}}
      />
    );
  };
  const RenderHistory = (props) => {
    return (
      <Card title={'Our History'}>
        <Text style={{}}> {history} </Text>
      </Card>
    );
  };
  const RenderLeaders = (props) => {
    return (
      <Card containerStyle={{flex: 1}} title={'Corporate Leadership'}>
        <FlatList
          data={props.leaders.leaders}
          renderItem={renderLeaderItem}
          keyExtractor={(item) => item.id.toString()}
        />
      </Card>
    );
  };
  const RenderAboutScreen = () => {
    return (
      <FlatList
        ListHeaderComponent={() => <RenderHistory/>}
        ListFooterComponent={() => <RenderLeaders {...props} />}
      />
    );
  };

  if (props.leaders.isLoading) {
    return (
      <SafeAreaView>
        <RenderHistory/>
        <Card title={'Corporate Leadership'}>
          <Loading/>
        </Card>
      </SafeAreaView>
    );
  } else if (props.leaders.errorMessage) {
    return (
      <SafeAreaView>
        <Animatable.View animation={'fadeInDown'} duration={2000} delay={1000}>
        <RenderHistory/>
        <Card title={'Corporate Leadership'}>
          <Text> {props.leaders.errorMessage} </Text>
        </Card>
        </Animatable.View>
      </SafeAreaView>
    );
  } else {
    return (
      <SafeAreaView>
        <Animatable.View animation={'fadeInDown'} duration={2000} delay={1000}>
        <RenderAboutScreen/>
        </Animatable.View>
      </SafeAreaView>
    );
  }
};
const styles = StyleSheet.create({});
export default connect(mapStateToProps)(AboutScreen);
