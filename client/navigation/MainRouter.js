import React from 'react';
import {
    View,
    StatusBar
} from 'react-native';
import { Router, Route } from './';
import styles from '../stylesheet';
import {
    ShortPage,
    LoanPage
} from '../screens';

export default function App() {
    return (
        <Router>
            <View style={styles.mainContainer}>
                <StatusBar
                    barStyle="light-content"
                    backgroundColor="#6a51ae"
                />
                <Route exact path="/" component={ShortPage} />
                <Route exact path="/short" component={ShortPage} />
                <Route exact path="/lend" component={LoanPage} />
            </View>
        </Router>
    );
}