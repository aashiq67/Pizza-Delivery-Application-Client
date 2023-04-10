import { combineReducers, configureStore, createSlice } from '@reduxjs/toolkit';

const user1 = createSlice({
    name: 'auth',
    initialState: {isLoggedIn: false},
    reducers: {
        login(state) {
            state.isLoggedIn = true;
        },
        logout(state) {
            state.isLoggedIn = false;
        }
    }
});

const user2 = createSlice({
    name: 'auth',
    initialState: {firstRender: true},
    reducers: {
        setTrue(state) {
            state.firstRender = true;
        },
        setFalse(state) {
            state.firstRender = false;
        }
    }
});

const admin1 = createSlice({
    name: 'auth',
    initialState: {isLoggedIn: false},
    reducers: {
        login(state) {
            state.isLoggedIn = true;
        },
        logout(state) {
            state.isLoggedIn = false;
        }
    }
});

const admin2 = createSlice({
    name: 'auth',
    initialState: {firstRender: true},
    reducers: {
        setTrue(state) {
            state.isLoggedIn = true;
        },
        setFalse(state) {
            state.isLoggedIn = false;
        }
    }
});

export const userLoginAuth = user1.actions;
export const userFirstRenderAuth = user2.actions;

export const adminLoginAuth = admin1.actions;
export const adminFirstRenderAuth = admin2.actions;

export const store = configureStore({
    reducer: combineReducers({
        isLoggedInUserReducer: user1.reducer,
        firstRenderUserReducer: user2.reducer,
        
        isLoggedInAdminReducer: admin1.reducer,
        firstRenderAdminReducer: admin2.reducer,
    })
})