import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {
  SafeAreaView,
  StatusBar
} from 'react-native';
import MainRouter from './navigation/MainRouter';
import EStyleSheet from 'react-native-extended-stylesheet';

EStyleSheet.build({
  // always call EStyleSheet.build() even if you don't use global variables!
  $primaryColor: 'rgba(255, 255, 255, .8)',
  $secondaryColor: 'rgba(255, 255, 255, .6)',
  $tertiaryColor: 'rgba(255, 255, 255, .4 )',
});


export default function App() {
  return (
    <SafeAreaView style={styles.mainContainer} >
      <StatusBar barStyle="light-content" />
      <MainRouter />
    </SafeAreaView>
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
