import { configureStore } from "@reduxjs/toolkit";
import reducer from "./reducer";

const store = configureStore({
    reducer: {
        users: reducer
    }
})

export default store
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
