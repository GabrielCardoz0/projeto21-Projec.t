export default function getColor(color) {
  const colorsList = {
    fst: "#334357",
    scd: "#607da3",
    thd: "#d5e1f0",
    wht: "#FFFFFF",
  }

  return colorsList[color]
  ? colorsList[color]
  : "orange";
};