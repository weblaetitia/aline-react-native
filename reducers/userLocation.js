export default function(userLocation = {}, action) {
    if (action.type === 'saveUserLocation') {
        return action.userLocation
       } else {
        return userLocation
    }
}