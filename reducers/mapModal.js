export default function(modalDatas = {}, action) {
    if (action.type === 'saveModalData') {
        return action.data

    } else if (action.type === 'deleteMapModal') {
        return action.mapModal

    } else  {
        return modalDatas
    }
}