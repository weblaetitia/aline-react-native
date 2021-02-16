export default function (filterDatas = {}, action) {
  if (action.type === "saveFilterData") {
    return action.filterDatas;
  }
  return filterDatas;
}
