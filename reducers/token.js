export default function tok(token = "", action) {
  if (action.type === "saveToken") {
    // console.log(action.token)
    return action.token;
  }
  return token;
}
