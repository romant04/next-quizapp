import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit'
import questionSlice from './questionSlice'

export const store = configureStore({
  reducer: {
    question: questionSlice,
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
