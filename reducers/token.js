export default function(token = '', action) {
    if (action.type === 'saveToken') {
        return action.token
    } else  {
        return token
    }
}