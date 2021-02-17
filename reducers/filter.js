export default function filter(filterDatas = {}, action) {
  if (action.type === "saveFilterData") {
    return action.filterDatas;
  }
  return filterDatas;
}
