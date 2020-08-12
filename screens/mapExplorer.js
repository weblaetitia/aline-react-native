import React from 'react';

import { StyleSheet, Dimensions} from 'react-native';
import MapView from 'react-native-maps';


function MapScreen(props) {


  return (
    
        
        <MapView style = {styles.mapStyle} />

    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    mapStyle: {
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
    },
  });


// keep this line at the end
export default MapScreen  