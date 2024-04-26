import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    image_url: {},
    genres: {},
}

export const homeSlice = createSlice({
    name: 'home',
    initialState,
    reducers: {
        getApiConfig: (state, action) => {
            state.image_url = action.payload
        },
        getGenres: (state, action) => {
            state.genres = action.payload
        }
    },
})

// Action creators are generated for each case reducer function
export const { getApiConfig, getGenres } = homeSlice.actions

export default homeSlice.reducer