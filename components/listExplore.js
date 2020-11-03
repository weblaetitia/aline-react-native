import React from 'react';
import { ScrollView, TouchableOpacity } from 'react-native';
import {connect} from 'react-redux';
import { useNavigation } from '@react-navigation/native';


// my Components
import ListCard from './listCard';


function ListScreen(props) {

  const navigation = useNavigation()

  let group = props.filteredPlaces.map((placeItem, i) => {
      let isFav = false
      if (props.favs) {
          props.favs.forEach(fav => {
            if(fav._id == placeItem._id) {
                isFav = true
              }
          })
      }
      return (
        <TouchableOpacity key={placeItem._id} onPress={() => navigation.navigate('Place', {place: placeItem})} >
            <ListCard place={placeItem} isFav={isFav} />
        </TouchableOpacity>
          )
  })

  return (
    <ScrollView style={{marginTop: 120}}>
          {group}
    </ScrollView>
  )

}
  

function mapStateToProps(state) {
return{ favs: state.favs }
}

// keep this line at the end
export default connect(
  mapStateToProps,
  null, 
)(ListScreen)