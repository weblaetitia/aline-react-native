export default function favorites(favs = "", action) {
  if (action.type === "saveFavs") {
    return action.favs;
  }
  if (action.type === "updateFavs") {
    return action.favs;
  }
  return favs;
}
