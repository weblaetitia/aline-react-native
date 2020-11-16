export default function(filterDatas = {}, action) {
    if (action.type === 'saveFilterData') {
        return action.filterDatas
    } else  {
        return filterDatas
    }
}