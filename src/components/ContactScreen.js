import React, {useState} from 'react';
import {Text} from 'react-native';
import {Card} from 'react-native-elements';
import {ADDRESS} from '../shared/address';
import * as Animatable from 'react-native-animatable';

const ContactScreen = () => {
  const [contact, setContact] = useState(ADDRESS);
  return (
    <Animatable.View animation="fadeInDown" duration={2000} delay={1000}>
      <Card title={'Contact Information'}>
        <Text style={{margin: 5, lineHeight: 25, fontSize: 15}}>
          {' '}
          {contact}{' '}
        </Text>
      </Card>
    </Animatable.View>
  );
};

export default ContactScreen;
