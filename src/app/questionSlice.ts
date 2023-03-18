import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";

// declaring the types for our state
export type QuestionState = {
    answers: number[];
};

const initialState: QuestionState = {
    answers: [],
};

export const userSlice = createSlice({
    name: "question",
    initialState,
    reducers: {
        resetQuestions: (state) => {
            state.answers = [];
        },
        setQuestions: (state, action: PayloadAction<number>) => {
            state.answers.push(action.payload);
        },
    },
});

export const { resetQuestions, setQuestions } = userSlice.actions;
export const selectCount = (state: RootState) => state.question.answers;
export default userSlice.reducer;
