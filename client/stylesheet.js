import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
    mainContainer: {
        display: 'flex',
        height: '100%'
    },
    H1: {
        fontSize: 56,
        marginTop: 35,
        color: 'white'
    },
    H2: {
        fontSize: 32,
        marginTop: 30,
        color: 'rgba(255,255,255, 0.75);'
    },
    shortExampleText: {
        fontSize: 28,
        marginTop: 15,
        textAlign: 'center',
        color: 'white'
    }, 
    contentContainer: {
        flex: 1,
        maxWidth: 980,
        margin: 'auto',
        paddingHorizontal: 20
    },
    pageExampleSection: {
        margin: 50,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    transitionImage: { 
        width: 25, 
        height: 95, 
        marginTop: 50, 
        marginBottom: 40
    },
    transitionImage2: {
        width: 20,
        height: 50,
        marginTop: 40,
        marginBottom: 25
    },
    logo: {
        color: 'white',
        fontSize: 24
    },
    header: {
        paddingTop: 20,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingBottom: 20
    },
    navItem: {
        color: 'white',
        borderColor: 'white',
        borderWidth: 1,
        borderStyle: 'solid',
        padding: 5,
        paddingHorizontal: 10,
        borderRadius: 5,
        marginLeft: 5
    },
    navItemLogin: {
        color: 'black',
        borderColor: 'white',
        borderWidth: 1,
        borderStyle: 'solid',
        backgroundColor: 'white',
        padding: 5,
        paddingHorizontal: 10,
        borderRadius: 5,
        marginLeft: 25
    },
    shortSelector: {
        borderColor: 'white',
        borderWidth: 2,
        borderStyle: 'solid',
        borderRadius: 40,
        padding: 20,
        display: 'flex',
        flexDirection: 'row'
    },
    shortSelectorText: {
        color: 'white',
        fontSize: 28
    },
    shortSelectorContainer: {
        marginBottom: 150,
        marginTop: 50
    },
    // Create Desktop / Tablet CSS
    '@media (min-width: 768)': {

    }
});

export default styles;