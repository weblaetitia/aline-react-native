export default function(filterDatas = {}, action) {
    if (action.type === 'saveFilterData') {
        console.log('Mes filtres enregistrés : ', action.filterDatas)
        return action.filterDatas
    } else  {
        return filterDatas
    }
}