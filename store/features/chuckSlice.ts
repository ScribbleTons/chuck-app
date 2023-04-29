import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { chuckApi } from '../../services/chuck';


// Define a type for the slice state
interface ChuckState {
    loading: boolean;
    jokes: Array<{
        value: string;
        icon_url: string;
        id: string;
    }>
    error:any
}

// Define the initial state using that type
const initialState: ChuckState = {
    loading: false,
    jokes: [],
    error:null
}

export const chuckSlice = createSlice({
    name: 'chuck',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {

    },
    extraReducers(builder) {
        builder.addMatcher(chuckApi.endpoints.getRandomJokes.matchPending, (state) => {
            state.loading = true
        }).addMatcher(chuckApi.endpoints.getJokesByCategory.matchPending, (state) => {
            state.loading = true
        }).addMatcher(chuckApi.endpoints.getSearchJokes.matchPending, (state) => {
            state.loading = true
        });

        builder.addMatcher(chuckApi.endpoints.getRandomJokes.matchFulfilled, (state, { payload }) => {
            state.loading = false;
            state.jokes = [payload]
        }).addMatcher(chuckApi.endpoints.getJokesByCategory.matchFulfilled, (state, { payload }) => {
            state.loading = false;
            state.jokes = [payload]
        }).addMatcher(chuckApi.endpoints.getSearchJokes.matchFulfilled, (state, { payload }) => {
            state.loading = false;
            state.jokes = payload.result
        });

        builder.addMatcher(chuckApi.endpoints.getRandomJokes.matchRejected, (state, action) => {
            state.loading = false
        }).addMatcher(chuckApi.endpoints.getJokesByCategory.matchRejected, (state, action) => {
            state.loading = false
        }).addMatcher(chuckApi.endpoints.getSearchJokes.matchRejected, (state, action) => {
            state.loading = false
        });
    },
})


export default chuckSlice.reducer