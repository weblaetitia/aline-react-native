export default function(modalDatas = {}, action) {
    if (action.type === 'saveModalData') {
        return action.data
    } else  {
        return modalDatas
    }
}