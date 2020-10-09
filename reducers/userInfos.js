export default function(infos = '', action) {
    if (action.type === 'saveUserInfo') {
        console.log('from reducer : ', action.infos)
        return action.infos
       } else {
        return infos
    }
}