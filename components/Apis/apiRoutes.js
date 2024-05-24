const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;


export const API_ROUTES = {
  REGISTER: BASE_URL + "/register",
  LOGIN: BASE_URL + "/login",
  GET_MERCHANT_WALLET: BASE_URL + "/merchant/wallet",
  POST_MERCHANTS_DASHBOARD_ANALYSIS: BASE_URL + "/merchant/dashboard_analysis",
  GET_PAY_API: BASE_URL + '/merchant/api/',
  POST_SETTELEMENT_DETAIL: BASE_URL + '/settlement'
}