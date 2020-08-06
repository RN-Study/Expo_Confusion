import React, {useState} from 'react';
import {Text} from 'react-native';
import {Card, Button, Icon} from 'react-native-elements';
import {ADDRESS} from '../shared/address';
import * as Animatable from 'react-native-animatable';
import * as MailComposer from 'expo-mail-composer';

// Assignment 1: Task 1 add Contact Screen in Drawer Navigator
const ContactScreen = () => {

  const sendEmail = () => {
   MailComposer.composeAsync({
     recipients: ['confusion@food.net'],
     subject: 'Enquiry',
     body: 'To whom it may concern:'
   })
  };

  const [contact, setContact] = useState(ADDRESS);
  return (
    <Animatable.View animation="fadeInDown" duration={2000} delay={1000}>
      <Card title={'Contact Information'}>
        <Text style={{margin: 5, lineHeight: 25, fontSize: 15}}>
          {' '}
          {contact}{' '}
        </Text>
        <Button
          title={'Send Email'}
          buttonStyle={{backgroundColor: '#512DA8'}}
          icon={<Icon
            name={'envelope-o'}
            type={"font-awesome"}
            color={'white'}
            style={{marginHorizontal: 10}}
          />}
          onPress={sendEmail}
        />
      </Card>
    </Animatable.View>
  );
};

export default ContactScreen;
