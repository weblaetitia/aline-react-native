export default function(favs = '', action) {
    if (action.type === 'saveFavs') {
        return action.favs
        
    } else if (action.type === 'updateFavs') {
        return action.favs 
        
    } else if (action.type === 'deleteFavorites') {
        return action.favorites

    } else  {
        return favs
    }
}