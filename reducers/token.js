export default function(token = '', action) {
    if (action.type === 'saveToken') {
        //console.log(action.token)
        return action.token
       } else {
        return token
    }
}