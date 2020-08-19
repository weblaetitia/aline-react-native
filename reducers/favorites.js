export default function(favs = '', action) {
    if (action.type === 'saveFavs') {
        return action.favs
    } else  {
        return favs
    }
}