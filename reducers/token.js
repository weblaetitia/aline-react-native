export default function(token = '', action) {
    if (action.type === 'saveToken') {
<<<<<<< HEAD
        //console.log(action.token)
=======
>>>>>>> 0f72ef6eabe3e86188c4e9e1e12912dac5e808d5
        return action.token
    } else  {
        return token
    }
}