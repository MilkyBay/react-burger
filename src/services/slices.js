import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {checkResponse} from "../utils/common-functions";

const initialState = {
    ingredients: [],
    mix: {
        buns: {
            _id: '',
            name: '',
            type: '',
            proteins: 0,
            fat: 0,
            carbohydrates: 0,
            calories: 0,
            price: 0,
            image: '',
            image_mobile: '',
            image_large: '',
            __v: 0,
        },
        sauces: [],
        fillings: [],
    },
    ingredientInfo: {
        _id: '',
        name: '',
        type: '',
        proteins: 0,
        fat: 0,
        carbohydrates: 0,
        calories: 0,
        price: 0,
        image: '',
        image_mobile: '',
        image_large: '',
        __v: 0,
    },
    order: 0,
    isLoading: false,
    error: null,
};

const baseUrl = `https://norma.nomoreparties.space/api`;

export const get = createAsyncThunk('data/getIngredients', async () => {
    try {
        const res = await fetch(`${baseUrl}/ingredients`);
        const value = await checkResponse(res);
        if (value.success) {
            return value.data;
        }
    } catch (err) {
        throw new Error(err);
    }
});

export const post = createAsyncThunk('data/postMix', async (data) => {
    try {
        const res = await fetch(`${baseUrl}/orders`, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {'Content-Type': 'application/json'},
        });
        const value = await checkResponse(res);
        if (value.success) {
            return value.order.number;
        }
    } catch (err) {
        throw new Error(err);
    }
});

const dataSlice = createSlice({
    name: 'data',
    initialState,
    reducers: {
        setMix: (state, action) => {
            state.mix = action.payload;
            return state;
        },
        setIngredientInfo: (state, action) => {
            state.ingredientsInfo = action.payload;
            return state;
        },
        removeIngredientInfo: (state) => {
            state.ingredientsInfo = null;
            return state;
        },
        setOrder: (state, action) => {
            state.order = action.payload;
            return state;
        },
    },
    extraReducers: {
        [get.pending.type]: (state) => {
            state.isLoading = true;
            state.error = null;
        },
        [get.fulfilled.type]: (state, action) => {
            state.isLoading = false;
            state.error = null;
            state.ingredients = action.payload;
            return state;
        },
        [get.rejected.type]: (state) => {
            state.isLoading = false;
            state.error = true;
        },
        [post.fulfilled.type]: (state, action) => {
            state.isLoading = false;
            state.error = null;
            state.order = action.payload;
            return state;
        },
        [post.rejected.type]: (state) => {
            state.isLoading = false;
            state.error = true;
        },
        [post.pending.type]: (state) => {
            state.isLoading = true;
            state.error = null;
        },
    },
});

export const {
    setMix,
    setIngredientInfo,
    removeIngredientInfo,
    setOrder,
} = dataSlice.actions;

export default dataSlice.reducer;
