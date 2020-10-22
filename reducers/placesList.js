export default function(list = {}, action) {
    if (action.type === 'savePlacesList') {
        return action.list
    } else  {
        return list
    }
}

