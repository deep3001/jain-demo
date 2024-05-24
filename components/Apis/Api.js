import { API_ROUTES } from "./apiRoutes";
import axios from "axios";

export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;


export async function getMerchentWallet() {
  try {
    const URL = `${API_ROUTES.GET_MERCHANT_WALLET}`;
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      throw new Error("Access token not found");
    }

    const headers = {
      Authorization: `${accessToken}`,
    };
    const response = await axios.get(URL, { headers });
    return response;
  } catch (error) {
    throw error;
  }
}

export async function getPayInData(currentPage, filter) {
  try {
    const URL = `${BASE_URL}/merchant/transaction/${currentPage}/15/payin/${filter}`;
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      throw new Error("Access token not found");
    }
    const headers = {
      Authorization: `${accessToken}`,
    };
    const response = await axios.get(URL, { headers });
    return response;
  } catch (error) {
    throw error;
  }
}

export async function getSearchData(keyword, category) {
  try {
    const URL = `${BASE_URL}/merchant/search`;
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      throw new Error("Access token not found");
    }

    const headers = {
      Authorization: `${accessToken}`,
    };

    const data = {
      keyword: keyword,
      category: category,
    };

    const response = await axios.post(URL, data, { headers });
    return response;
  } catch (error) {
    throw error;
  }
}


export async function getPayOUTData(currentPageOUT, filter) {
  try {
    const URL = `${BASE_URL}/merchant/transaction/${currentPageOUT}/10/payout/${filter}`;
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      throw new Error("Access token not found");
    }

    const headers = {
      Authorization: `${accessToken}`,
    };
    const response = await axios.get(URL, { headers });
    return response;
  } catch (error) {
    throw error;
  }
}

export async function getTrasactionStatus(data) {
  try {
    const trassctionId = data?.transaction_id;
    const source = data?.source;
    const URL = `${BASE_URL}/merchant/transaction_status/${trassctionId}/${source}`;

    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      throw new Error("Access token not found");
    }

    const headers = {
      Authorization: `${accessToken}`,
    };
    const response = await axios.get(URL, { headers });
    return response;
  } catch (error) {
    throw error;
  }
}

export async function postDashboardAnaltycs(
  currentDateTime,
  sevenDaysAgoDateTime
) {
  try {
    const URL = `${API_ROUTES.POST_MERCHANTS_DASHBOARD_ANALYSIS}`;
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      throw new Error("Access token not found");
    }
    const payload = {
      end_date: sevenDaysAgoDateTime,
      start_date: currentDateTime,
    };
    const headers = {
      Authorization: `${accessToken}`,
    };
    const response = await axios.post(URL, payload, { headers });
    return response;
  } catch (error) {
    return error;
  }
}

export async function getSettelementDetails(currentPage) {
  try {
    // const URL = `${BASE_URL}/merchant/transaction/${currentPage}/10/payin`;
    const URL = `${BASE_URL}/merchant/transaction/${currentPage}/10/settelment`;
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      throw new Error("Access token not found");
    }
    const headers = {
      Authorization: `${accessToken}`,
    };
    const response = await axios.get(URL, { headers });
    return response;
  } catch (error) {
    throw error;
  }
}

export async function getPayApiDetails() {
  try {
    // const URL = `${BASE_URL}/merchant/transaction/${currentPage}/10/payin`;
    const URL = `${API_ROUTES.GET_PAY_API}`;
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      throw new Error("Access token not found");
    }
    const headers = {
      Authorization: `${accessToken}`,
    };
    const response = await axios.get(URL, { headers });
    return response;
  } catch (error) {
    throw error;
  }
}

export async function makeSettlement(payload) {
  try {
    const URL = `${API_ROUTES.POST_SETTELEMENT_DETAIL}`;
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      throw new Error("Access token not found");
    }
    const payloaddata = {
      amount: payload,
    };
    const headers = {
      Authorization: `${accessToken}`,
    };
    const response = await axios.post(URL, payloaddata, { headers });
    return response;
  } catch (error) {
    throw error;
  }
}
