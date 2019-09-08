import React from 'react';
import {
    View,
    StatusBar,
    Text,
    ScrollView
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
            <ScrollView style={styles.mainContainer}>
                <Route exact path="/" component={ShortPage} />
                <Route exact path="/lend" component={LoanPage} />
            </ScrollView>
        </Router>
    );
}