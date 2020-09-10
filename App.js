import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux'
import Store from './Store/configurationStore'
import Navigation from './navigation/navigation';
import SplashVideo from './Component/SplashVideo'

export default function App() {
  return (
  <Provider store={Store}>
    <Navigation/>
  </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
