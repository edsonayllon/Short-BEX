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
    lnH1: {
        fontSize: 40,
        marginTop: 44,
    },
    H2: {
        fontSize: 32,
        marginTop: 30,
        color: 'rgba(255,255,255, 0.6);'
    },
    lnH2: {
        fontSize: 28,
        color: '#00A29F'
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
    lnContentContainer: {
        flex: 1,
        maxWidth: 730,
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
    lnLogo: {
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
        marginLeft: 5,
        fontSize: 12
    },
    lnNavItem: {
        borderColor: 'black',
        borderWidth: 1,
        borderStyle: 'solid',
        padding: 5,
        paddingHorizontal: 10,
        borderRadius: 5,
        marginLeft: 5,
        fontSize: 12
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
        marginLeft: 20,
        fontSize: 12,
    },
    lnNavItemLogin: {
        color: 'white',
        borderColor: '#00A29F',
        borderWidth: 1,
        borderStyle: 'solid',
        backgroundColor: '#00A29F',
        padding: 5,
        paddingHorizontal: 10,
        borderRadius: 5,
        marginLeft: 20,
        fontSize: 12
    },
    shortSelector: {
        borderColor: 'white',
        borderWidth: 2,
        borderStyle: 'solid',
        borderRadius: 50,
        paddingHorizontal: 30,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        maxWidth: 400,
        height: 100,
        width: 310
    },
    shortSelectorText: {
        color: 'white',
        fontSize: 40
    },
    shortSelectorContainer: {
        marginBottom: 150,
        marginTop: 50,
        display: 'flex',
        alignItems: 'center',

    },
    shortFormContainer: {
        backgroundColor: 'white',
        borderRadius: 50,
        display: 'flex',
        marginTop: 40,
        marginBottom: 150,
        padding: 40,
        paddingTop: 30,
        maxWidth: 600,
        width: '100%'
    },  
    input: {
        height: 52,
        marginBottom: 16,
        fontSize: 24,
        borderBottomColor: '$secondaryColor',
        color: 'black',
        borderBottomWidth: 1,
        borderBottomColor: 'black',
    },
    lnInput: {
        height: 52,
        marginBottom: 16,
        fontSize: 24,
        flexGrow: 3,
        borderBottomColor: '$secondaryColor',
        color: 'white',
        borderBottomWidth: 1,
        borderBottomColor: '#333',
    },
    shortSubmitButton: {
        backgroundColor: '#008797',
        width: 200,
        padding: 20,
        color: 'white',
        textAlign: 'center',
        borderRadius: 50,
        borderStyle: 'solid',
        borderWidth: 0,
    },
    priceDisplay: {
        marginTop: 15,
        fontSize: 16
    },
    lnDescriptionMark: {
        fontSize: 16,
        marginTop: 120
    },
    lnShortFormContainer: {
        backgroundColor: 'black',
        borderRadius: 50,
        display: 'flex',
        marginTop: 50,
        marginBottom: 150,
        padding: 40,
        paddingTop: 30,
        width: '100%'
    },
    lnFormBound: {
        flex: 1,
        maxWidth: 900,
        width: '100%',
        margin: 'auto',
        paddingHorizontal: 20
    },
    // Create Desktop / Tablet CSS
    '@media (min-width: 768)': {

    }
});

export default styles;