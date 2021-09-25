export const SELECTED = "SELECTED";

export const selectVehicle = id => {
  console.log("select action", id);
  return {
    type: SELECTED,
    payload: id
  };
};
