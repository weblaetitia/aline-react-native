import { StyleSheet } from 'react-native';

// colors vars
var blueDark = '#033C47'
var mintLight = '#D5EFE8'
var mint = '#2DB08C'
var grayMedium = '#879299'
var graySuperLight = '#f4f4f4'
var greyLight = '#d8d8d8'
var gold = "#E8BA00"
var goldLight = '#faf1cb'
var tomato = '#ec333b'
var peach = '#ef7e67'
var peachLight = '#FED4CB'

const styles = StyleSheet.create({
    container: { 
      flex: 1, 
      alignItems: 'center', 
      justifyContent: 'flex-start', 
      backgroundColor:'#fff',
    },
    head: {
      backgroundColor: '#fff',
      width: '100%',
      marginTop: 50,
      marginBottom: 0,
      paddingHorizontal: 25,
      paddingVertical: 10,
      margin: 0,
      borderBottomColor: grayMedium,
      borderBottomWidth: 1,
      height: 50,
    },
    row: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-end',
      paddingHorizontal: 25,
    },
    placeheader: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-end',
      backgroundColor: goldLight,
      paddingBottom: 16,
      paddingHorizontal: 0,
      paddingTop: 60,
      width: '100%',
      marginTop: 0,
      zIndex: -2
    },
    current: {
      fontSize: 16,
      color: blueDark,
      textAlign: 'left',
      lineHeight: 26,
    },
    currentBold: {
      fontSize: 16,
      color: blueDark,
      textAlign: 'left',
      lineHeight: 26,
      fontWeight: 'bold',
    },
    line: {
      flex: 0.4,
      borderWidth: 1,
      borderColor: greyLight,
      marginHorizontal: 0,
      marginVertical: 30,
    },
    h3mint: {
      fontFamily: 'Capriola_400Regular', 
      fontSize: 18,
      color: mint,
      letterSpacing: -0.7
    },
    bigprice: {
      fontFamily: 'Capriola_400Regular', 
      fontSize: 40,
      color: blueDark,
      letterSpacing: -0.7
    },
    bigco2: {
      fontFamily: 'Capriola_400Regular', 
      fontSize: 28,
      color: blueDark,
      letterSpacing: -0.7
    },
    h2mint: {
      fontFamily: 'Capriola_400Regular', 
      fontSize: 22,
      color: mint,
      letterSpacing: -0.7
    },
    h4mint: {
      fontFamily: 'Capriola_400Regular', 
      fontSize: 14,
      color: mint,
      letterSpacing: -0.7,
    },
    h1blueDark: {
      fontFamily: 'Capriola_400Regular', 
      fontSize: 26,
      color: blueDark,
      letterSpacing: -0.7
    },
  })

export {styles};