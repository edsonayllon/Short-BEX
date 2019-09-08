import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import styles from '../stylesheet';


export default function ShortPage() {
    return (
        <View style={styles.mainContainer} >
            <View style={styles.contentContainer}>
            <Text>Short Bex</Text>
            <Text style={styles.H1}>Make Profits as The Market Goes Down</Text>
            <Text style={styles.H2}>By selling borrowing assets at current price, you profit when returning borrowed assets at lower prices</Text>
            <View style={styles.pageExampleSection}>
                <Text style={styles.shortExampleText}>Short 1 BTC at $10,000</Text>
                <Text style={styles.shortExampleText}>Close at $8,000</Text>
                <Text style={styles.shortExampleText}>Profit $2,000</Text>
            </View>
            </View>
        </View>
    );
}