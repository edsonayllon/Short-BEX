import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
    mainContainer: {
        flex: 1,
        height: '100%'
    },
    H1: {
        fontSize: 56,
        marginTop: 30
    },
    H2: {
        fontSize: 32,
        marginTop: 25
    },
    shortExampleText: {
        fontSize: 24,
        marginTop: 15,
        textAlign: 'center'
    }, 
    contentContainer: {
        flex: 1,
        maxWidth: 980,
        margin: 'auto',
        paddingHorizontal: 20
    },
    pageExampleSection: {
        margin: 50
    },
    // Create Desktop / Tablet CSS
    '@media (min-width: 768)': {

    }
});

export default styles;