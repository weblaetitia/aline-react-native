export default function(filterDatas = {}, action) {
    if (action.type === 'saveData') {
        return action.data
        
    } else if (action.type === 'deleteFilter') {
        return action.filter

    } else  {
        return filterDatas
    }
}