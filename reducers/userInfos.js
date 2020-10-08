export default function(infos = '', action) {
    if (action.type === 'saveUserInfo') {
        return action.infos
       } else {
        return infos
    }
}