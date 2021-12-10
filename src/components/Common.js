import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";

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
  if (name === "Coupon") return {
    "--perk-background": "#e3f4ff",
    "--perk-color": "#0078c2"
  }
}

export function checkAccess() {
  var token = Cookies.get('accesstoken')
  if (token) {
    token = jwtDecode(token)
    const timestamp = Math.floor(Date.now() / 1000);
    return timestamp <= token.exp;
  } else return false
}

export const baseURL = process.env.REACT_APP_BASE_URL || 'http://127.0.0.1:8000'
export const apiURL = process.env.REACT_APP_API_URL || '/api/v1'
console.log(baseURL)
console.log(process.env.REACT_APP_BASE_URL)
