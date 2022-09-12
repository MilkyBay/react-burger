import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {checkResponse, saveTokens} from "../../utils/common-functions";
import {getCookie} from "../../utils/cookieUtils";

const baseUrl = 'https://norma.nomoreparties.space/api';

const urls = {
    login: '/auth/login',
    register: '/auth/register',
    logout: '/auth/logout',
    token: '/auth/token',
    user: '/auth/user',
    passwordRestore: '/password-reset/reset',
    passwordReset: '/password-reset',
}

const initialState = {
    name: '',
    email: '',
    isPasswordReset: false,
    isLogged: false,
    error: false,
    isLoading: false
};

export const postRestorePassword = createAsyncThunk("auth/postRestorePassword", async (data) => {
    try {
        const res = await fetch(`${baseUrl}${urls.passwordReset}`, {
            method: "POST",
            body: JSON.stringify(data),
            headers: { "Content-Type": "application/json" },
        });
        const value = await checkResponse(res);
        if (value.success) {
            return true;
        }
    } catch (err) {
        throw new Error(err);
    }
});

export const postSaveNewPassword = createAsyncThunk("auth/postSaveNewPassword", async (data) => {
    try {
        const res = await fetch(`${baseUrl}${urls.passwordRestore}`, {
            method: "POST",
            body: JSON.stringify(data),
            headers: { "Content-Type": "application/json" },
        });
        const value = await checkResponse(res);
        if (value.success) {
            console.log(value);
            return true;
        }
    } catch (err) {
        throw new Error(err);
    }
});

export const postRegister = createAsyncThunk("auth/postRegister", async (data) => {
    try {
        const res = await fetch(`${baseUrl}${urls.register}`, {
            method: "POST",
            body: JSON.stringify(data),
            headers: { "Content-Type": "application/json" },
        });
        const value = await checkResponse(res);
        if (value.success) {
            console.log(value);
            return true;
        }
    } catch (err) {
        throw new Error(err);
    }
});

export const postLogin = createAsyncThunk("auth/postLogin", async (data) => {
    try {
        const res = await fetch(`${baseUrl}${urls.login}`, {
            method: "POST",
            body: JSON.stringify(data),
            // mode: 'cors',
            // cache: 'no-cache',
            // credentials: 'same-origin',
            // redirect: 'follow',
            // referrerPolicy: 'no-referrer',
            headers: { "Content-Type": "application/json" },
        });
        const value = await checkResponse(res);
        if (value.success) {
            if (value.accessToken && value.refreshToken) {
                const accessToken = value.accessToken.split("Bearer ")[1];
                saveTokens(accessToken, value.refreshToken);
            }
            return value;
        }
    } catch (err) {
        throw new Error(err);
    }
});
//todo недописанные запросы
export const postLogout = createAsyncThunk("auth/postLogout", async () => {
    try {
        const res = await fetch(`${baseUrl}${urls.logout}`, {
            method: "POST",
            body: JSON.stringify({
                token: localStorage.getItem('refreshToken')
            }),
            headers: { "Content-Type": "application/json" },
        });
        const value = await checkResponse(res);
        if (value.success) {
            return true;
        }
    } catch (err) {
        throw new Error(err);
    }
});

export const postUpdateToken = createAsyncThunk("auth/postUpdateToken", async () => {
    try {
        const res = await fetch(`${baseUrl}${urls.token}`, {
            method: "POST",
            body: JSON.stringify({
                token: localStorage.getItem('refreshToken')
            }),
            headers: { "Content-Type": "application/json" },
        });
        const value = await checkResponse(res);
        return { refreshToken: value.refreshToken, accessToken: value.accessToken };
    } catch (err) {
        throw new Error(err);
    }
});

export const getUserInfo = createAsyncThunk("auth/getUserInfo", async (data) => {
    try {
        const res = await fetch(`${baseUrl}${urls.user}`, {
            method: "GET",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
                "authorization": 'Bearer ' + getCookie('accessToken'),
            },
        });
        const value = await checkResponse(res);
        if (value.success) {
            return value;
        }
    } catch (err) {
        throw new Error(err);
    }
});

export const patchUserInfo = createAsyncThunk("auth/patchUserInfo", async (data) => {
    try {
        const res = await fetch(`${baseUrl}${urls.user}`, {
            method: "PATCH",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
                "authorization": 'Bearer ' + getCookie('accessToken'),
            },
        });
        const value = await checkResponse(res);
        if (value.success) {
            return value;
        }
    } catch (err) {
        throw new Error(err);
    }
});

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {

    },
    extraReducers: {
        [postRestorePassword.pending.type]: (state) => {
            state.error = false;
            state.isPasswordReset = false;
            state.isLoading = true;
        },
        [postRestorePassword.fulfilled.type]: (state) => {
            state.isPasswordReset = true;
            state.isLoading = false;
        },
        [postRestorePassword.rejected.type]: (state) => {
            state.error = true;
            state.isLoading = false;
        },
        [postSaveNewPassword.pending.type]: (state) => {
            state.error = false;
            state.isLoading = true;
        },
        [postSaveNewPassword.fulfilled.type]: (state) => {
            state.isPasswordReset = false;
            state.isLoading = false;
        },
        [postSaveNewPassword.rejected.type]: (state) => {
            state.error = true;
            state.isLoading = false;
        },
        [postRegister.pending.type]: (state) => {
            state.error = false;
            state.isLoading = true;
        },
        [postRegister.fulfilled.type]: (state, action) => {
            state.name = action.user.name;
            state.email = action.user.email;
            state.isLoading = false;
        },
        [postRegister.rejected.type]: (state) => {
            state.error = true;
            state.isLoading = false;
        },
        [postLogin.pending.type]: (state) => {
            state.error = false;
            state.isLoading = true;
        },
        [postLogin.fulfilled.type]: (state, action) => {
            state.name = action.payload.user.name;
            state.email = action.payload.user.email;
            state.isLogged = true;
            state.isLoading = false;
        },
        [postLogin.rejected.type]: (state) => {
            state.error = true;
            state.isLoading = false;
        },
        [patchUserInfo.pending.type]: (state) => {
            state.error = false;
            state.isLoading = true;
        },
        [patchUserInfo.fulfilled.type]: (state, action) => {
            state.email = action.payload.user.email;
            state.name = action.payload.user.name;
            state.isLoading = false;
        },
        [patchUserInfo.rejected.type]: (state) => {
            state.error = true;
            state.isLoading = false;
        },
        [postLogout.pending.type]: (state) => {
            state.error = false;
            state.isLoading = true;
        },
        [postLogout.fulfilled.type]: (state) => {
            state.name = initialState.name;
            state.email = initialState.email;
            state.isLogged = false;
            state.isLoading = false;
        },
        [postLogout.rejected.type]: (state) => {
            state.error = true;
            state.isLoading = false;
        },
        [getUserInfo.pending.type]: (state) => {
            state.error = false;
            state.isLoading = true;
        },
        [getUserInfo.fulfilled.type]: (state, action) => {
            state.name = action.payload.user.name;
            state.email = action.payload.user.email;
            state.isLoading = false;
        },
        [getUserInfo.rejected.type]: (state) => {
            state.error = true;
            state.isLoading = false;
        },
    }
});

export default authSlice.reducer;