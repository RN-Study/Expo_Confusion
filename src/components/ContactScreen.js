import React, {useState} from 'react';
import {Text} from 'react-native';
import {Card} from 'react-native-elements';
import {ADDRESS} from '../shared/address';

const ContactScreen = () => {
  const [contact, setContact] = useState(ADDRESS);
  return (
      <Card title={'Contact Information'}>
        <Text style={{margin: 5, lineHeight: 25, fontSize: 15}}>
          {' '}
          {contact}{' '}
        </Text>
      </Card>
  );
};

export default ContactScreen;
