import React, { useState, useEffect, useContext } from 'react';
import { Text, View, Image, Picker, TouchableOpacity, TextInput } from 'react-native';
import styles from '../stylesheet';
import { Link } from '../navigation';
import GlobalState from '../contexts/GlobalState';

export default function ShortPage() {
    const [token, setToken] = useState('BTC');
    const [isShorting, setIsShorting] = useState(false);
    const [collateral,setCollateral] = useState('');
    const [principal, setPrincipal] = useState('23');
    const [state, setState] = useContext(GlobalState);

    const openForm = () => {
        setIsShorting(true)
    }

    useEffect(()=>{
        setState(state => ({ ...state, gradient: ['#1d2d37', '#008797'] }))
    },[]);
    
    return (
        <View>
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
                <Text style={styles.H2}>By selling borrowing assets at current price, you profit when returning borrowed cryptocurrency assets at lower prices</Text>
                <View style={styles.pageExampleSection}>
                    <Text style={styles.shortExampleText}>Short 1 BTC at $10,000</Text>
                    <Image source={require('../assets/trans.png')} style={styles.transitionImage} hieght='40'/>
                    <Text style={styles.shortExampleText}>Close at $8,000</Text>
                    <Image source={require('../assets/trans.png')} style={styles.transitionImage2} hieght='40' />
                    <Text style={styles.shortExampleText}>Profit $2,000</Text>
                </View>
                { isShorting 
                ? 
                    <View style={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                        <View style={styles.shortFormContainer}>
                            <View>
                                <TextInput
                                    autoCapitalize='none'
                                    autoCorrect={false}
                                    style={styles.input}
                                    placeholder={'Choose Collateral'}
                                    placeholderTextColor="#333"
                                    onChangeText={value => {
                                        setCollateral(value)
                                    }}
                                    underlineColorAndroid='transparent'
                                />
                                <Text>{}</Text>
                            </View>
                            <Text style={styles.priceDisplay}>
                                $180 USD
                            </Text>
                            <View style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', marginTop: 75}}>
                                <TouchableOpacity>
                                    <Text style={styles.shortSubmitButton}>
                                        Short {principal} {token}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                            
                        </View>
                    </View>
                :
                    <View style={styles.shortSelectorContainer}>
                        <View style={styles.shortSelector}>
                            <TouchableOpacity onPress={openForm}>
                                <Text style={styles.shortSelectorText}>Short</Text>
                            </TouchableOpacity>
                            <Picker
                                selectedValue={token}
                                style={{ height: 55, width: 80, margin: 10 }}
                                itemStyle={{ height: 55, color: 'white', fontSize: 32 }}
                                onValueChange={(itemValue, itemIndex) =>
                                    setToken(itemValue)
                                }>
                                <Picker.Item label="BTC" value="BTC" />
                                <Picker.Item label="BNB" value="BNB" />
                            </Picker>
                        </View>
                    </View>
                }
                
            </View>
        </View>
    );
}