import React, { useEffect, useState } from 'react';

import { StyleSheet, Dimensions} from 'react-native';
import MapView, { Marker } from 'react-native-maps';


function MapScreen(props) {

  const [placesMarkers, setPlacesMarkers] = useState([])

  useEffect(() => {   
    
    var networkFromFront = 'Reconcil'

      async function getPlaces (data) {

          var response = await fetch('http://10.2.3.30:3000/map/getPlaces', {
            method: 'POST',
            headers: {'Content-type': 'application/x-www-form-urlencoded'},
            body: 'networkFromFront=Reconcil',
          })
          var rawResponse = await response.json();  
          setPlacesMarkers(rawResponse)

      }
      getPlaces()

  }, []);


  var placesMarkersList = placesMarkers.map((place,i)=> {
    return(<Marker
            coordinate={{latitude: place.latitude, longitude: place.longitude}}
            title={place.name}
            description={place.type}
          />)
    })


  return (
    
        <MapView style = {styles.mapStyle}>

            {placesMarkersList}

        </MapView>

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