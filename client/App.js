import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {
  SafeAreaView,
  StatusBar
} from 'react-native';
import MainRouter from './navigation/MainRouter';
import EStyleSheet from 'react-native-extended-stylesheet';
import { LinearGradient } from 'expo-linear-gradient';
EStyleSheet.build({
  // always call EStyleSheet.build() even if you don't use global variables!
  $primaryColor: 'rgba(255, 255, 255, .8)',
  $secondaryColor: 'rgba(255, 255, 255, .6)',
  $tertiaryColor: 'rgba(255, 255, 255, .4 )',
});
import styles from './stylesheet';

export default function App() {
  return (
    <LinearGradient
      colors={['#1d2d37', '#008797']}
      start={{ x: 1, y: 0 }} end={{ x: 0, y: 1}}
      style={styles.mainContainer}>
      <SafeAreaView  >
        <StatusBar barStyle="light-content" />
        <MainRouter />
      </SafeAreaView>
    </LinearGradient>
  );
}

