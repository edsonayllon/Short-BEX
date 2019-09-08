import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import styles from '../stylesheet';
import { Link } from '../navigation';

export default function ShortPage() {
    return (
        <View  >
            <View style={styles.contentContainer}>
                <View style={styles.header}>
                    <Text style={styles.logo}>[Short Bex]</Text>
                    <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                        <Link to='/lend'>
                            <Text style={styles.navItem}>Lending</Text>
                        </Link>
                        <Text style={styles.navItemLogin}>Binance Login</Text>
                    </View>
                </View>
                <Text style={styles.H1}>Make Profits as The Market Goes Down</Text>
                <Text style={styles.H2}>By selling borrowing assets at current price, you profit when returning borrowed assets at lower prices</Text>
                <View style={styles.pageExampleSection}>
                    <Text style={styles.shortExampleText}>Short 1 BTC at $10,000</Text>
                    <Image source={require('../assets/trans.png')} style={styles.transitionImage} hieght='40'/>
                    <Text style={styles.shortExampleText}>Close at $8,000</Text>
                    <Image source={require('../assets/trans.png')} style={styles.transitionImage2} hieght='40' />
                    <Text style={styles.shortExampleText}>Profit $2,000</Text>
                </View>
                <View style={styles.shortSelectorContainer}>
                    <View style={styles.shortSelector}> 
                        <Text style={styles.shortSelectorText}>Short</Text>
                        <Text style={styles.shortSelectorText}>BTC</Text>
                    </View>
                </View>
            </View>
        </View>
    );
}