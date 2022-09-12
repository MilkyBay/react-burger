import {setCookie} from "./cookieUtils";
import {postUpdateToken} from "../services/slices/authSlice";

export const checkResponse = (res) => {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

export const saveTokens = (accessToken, refreshToken) => {
  setCookie('accessToken', accessToken);
  localStorage.setItem('refreshToken', refreshToken);
}

export const fetchWithRefresh = async(url, options) => {
  try {
    const res = await fetch(url, options);

    return await checkResponse(res);
  } catch (err) {
    if (err.message === 'jwt expired') {
      const {refreshToken, accessToken} = await postUpdateToken();
      saveTokens(accessToken, refreshToken);

      options.headers.authorization = accessToken;

      const res = await fetch(url, options);

      return await  checkResponse(res);
    } else {
      return Promise.reject(err);
    }
  }
}
