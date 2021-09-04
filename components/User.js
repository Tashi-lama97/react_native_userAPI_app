import moment from 'moment';
import {Box, Spinner, Avatar, Stack, Text} from 'native-base';
import React from 'react';
import {StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const User = ({user, loading}) => {
  const fullNameCreator = name => {
    return name?.title + ' ' + name?.first + ' ' + name?.last;
  };
  return (
    <Box
      bg="white"
      shadow={2}
      rounded="lg"
      maxWidth="90%"
      width="100%"
      minHeight="30%">
      <Box style={styles.avatar}>
        <Avatar
          source={{
            uri: !loading
              ? user.picture.large
              : 'https://apenasimagens.com/wp-content/uploads/2017/08/color_depth_480px-16777216colors.png',
          }}
          size="xl">
          {user.picture.large}
        </Avatar>
      </Box>

      {loading ? (
        <Box style={styles.spinnerContainer}>
          <Spinner accessibilityLabel="Loading" />
        </Box>
      ) : (
        <Stack space={4} p={[4, 4, 8]}>
          <Text color="gray.400" style={styles.name}>
            {fullNameCreator(user.name)}
          </Text>
          <Box>
            <Box style={styles.details}>
              <Icon name="envelope-square" color="#000" size={20} /> {'  '} -
              {'  ' + user.email}
            </Box>
            <Box style={styles.details}>
              <Icon name="mobile" color="#000" size={25} /> {'  '} -
              {'  ' + user.phone}
            </Box>
            <Box style={styles.details}>
              <Icon name="registered" color="#000" size={20} /> {'  '} -
              {'  ' + moment(user.registerd).format('MMMM Do YYYY')}
            </Box>
          </Box>
        </Stack>
      )}
    </Box>
  );
};

export default User;

const styles = StyleSheet.create({
  name: {
    textAlign: 'center',
  },
  avatar: {
    marginTop: -50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  spinnerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '20%',
  },
  details: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 6,
  },
});
