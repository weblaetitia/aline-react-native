export default function(filterDatas = {}, action) {
    if (action.type === 'saveData') {
        return action.data
    } else  {
        return filterDatas
    }
}