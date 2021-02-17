export default function userInfos(infos = "", action) {
  if (action.type === "saveUserInfo") {
    return action.infos;
  }
  return infos;
}
