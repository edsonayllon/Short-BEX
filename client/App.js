import React, {useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {
  SafeAreaView,
  StatusBar
} from 'react-native';
import MainRouter from './navigation/MainRouter';
import EStyleSheet from 'react-native-extended-stylesheet';
import { LinearGradient } from 'expo-linear-gradient';
import GlobalState from './contexts/GlobalState';
import styles from './stylesheet';
EStyleSheet.build({
  // always call EStyleSheet.build() even if you don't use global variables!
  $primaryColor: 'rgba(255, 255, 255, .8)',
  $secondaryColor: 'rgba(255, 255, 255, .6)',
  $tertiaryColor: 'rgba(255, 255, 255, .4 )',
});


export default function App() {
  const [state, setState] = useState({
    gradient: ['#1d2d37', '#008797']
  });
  return (
    <GlobalState.Provider value={[state, setState]}>
      <LinearGradient
        colors={state.gradient}
        start={{ x: 0, y: 0 }} end={{ x: 0, y: 0.3}}
        style={styles.mainContainer}>
        <SafeAreaView  >
          <StatusBar barStyle="light-content" />
          <MainRouter />
        </SafeAreaView>
      </LinearGradient>
    </GlobalState.Provider>
  );
}

