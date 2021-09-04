/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, useState} from 'react';

import {StyleSheet} from 'react-native';

import Axios from 'axios';

import {NativeBaseProvider, HStack, Spinner, Button} from 'native-base';
import User from './components/User';

const App = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const source = Axios.CancelToken.source();

  const fetchUser = async () => {
    setLoading(true);
    const {data} = await Axios.get('https://randomuser.me/api/', {
      cancelToken: source.token,
    });

    const details = data.results[0];

    setUser(details);
    setLoading(false);
    try {
    } catch (error) {
      setLoading(false);
      console.warn(error);
    }
  };
  useEffect(() => {
    fetchUser();
    return () => {
      source.cancel('canceled all http requests');
    };
    //eslint-disable-next-line
  }, []);

  if (!user) {
    return (
      <NativeBaseProvider>
        <HStack space={2} style={styles.continer}>
          <Spinner accessibilityLabel="Loading user" />
        </HStack>
      </NativeBaseProvider>
    );
  } else {
    return (
      <NativeBaseProvider>
        <HStack space={2} style={styles.continer}>
          <User user={user} loading={loading} />
          <Button
            borderRadius="pill"
            style={styles.button}
            onPress={() => fetchUser()}>
            New User
          </Button>
        </HStack>
      </NativeBaseProvider>
    );
  }
};

export default App;

const styles = StyleSheet.create({
  continer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#222831',
    flexDirection: 'column',
  },
  button: {
    marginTop: 30,
    paddingHorizontal: 20,
  },
});
