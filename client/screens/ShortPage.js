import React, { useState, useEffect, useContext } from 'react';
import { Text, View, Image, Picker, TouchableOpacity, TextInput, Linking } from 'react-native';
import styles from '../stylesheet';
import { Link } from '../navigation';
import GlobalState from '../contexts/GlobalState';

export default function ShortPage() {
    const [token, setToken] = useState('BTC');
    const [isShorting, setIsShorting] = useState(false);
    const [collateral,setCollateral] = useState('');
    const [principal, setPrincipal] = useState('23');
    const [state, setState] = useContext(GlobalState);
    const [tokenPrice, setTokenPrice] = useState('0')

    const openForm = () => {
        setIsShorting(true)
    }

    const getPrice = async ()  => {
        let res = await fetch(`https://testnet-dex.binance.org/api/v1/markets?1000`, {
            method: 'GET', // *GET, POST, PUT, DELETE, etc.
        });
        let json = await res.json();
        if (token === "BNB") {
            setTokenPrice(json[70].list_price)
        } else {
            // assume only BTC right now
            setTokenPrice(json[76].list_price)
        }
        console.log(json);
    }

    const openPosition = async () => {
        let res = await fetch(`http://localhost:8000/v1/openPosition`, {
            method: 'POST', 
            body: JSON.stringify({
                collateral,
                principal,
                currency: token,
                userId: '0xBBAac64b4E4499aa40DB238FaA8Ac00BAc50811B'
            }),
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            mode: 'no-cors'
        });
        console.log(res.json);
    }

    useEffect(()=>{
        setState(state => ({ ...state, gradient: ['#1d2d37', '#008797'] }));
        getPrice()
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
                        <TouchableOpacity onPress={() => Linking.openURL('https://www.binance.org/en/unlock')}>
                            <Text style={styles.navItemLogin}>Binance Login</Text>
                        </TouchableOpacity>
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
                                        setPrincipal(0.494312*(2*value+1))
                                    }}
                                    underlineColorAndroid='transparent'
                                />
                                <Text>{}</Text>
                            </View>
                            <Text style={styles.priceDisplay}>
                                {token} currently ${parseFloat(tokenPrice).toFixed(2)} USD
                            </Text>
                            <View style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', marginTop: 75}}>
                                <TouchableOpacity onPress={openPosition}>
                                    <Text style={styles.shortSubmitButton}>
                                        Short {parseFloat(principal).toPrecision(4)} {token}
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
                                onValueChange={(itemValue, itemIndex) => {
                                    setToken(itemValue)
                                    getPrice()
                                }
                                    
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