export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function perkTranslate(name) {
  if (name === "Hot deal!") return {
    "--perk-background": "#FDEDF2",
    "--perk-color": "#C23564"
  }
  if (name.toLowerCase().includes("% off")) return {
    "--perk-background": "#ECF7ED",
    "--perk-color": "#37833B"
  }
}