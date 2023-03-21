import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from './store'

// declaring the types for our state
export type QuestionState = {
  checked: number[] | undefined
  multiple: boolean
}

const initialState: QuestionState = {
  checked: undefined,
  multiple: false,
}

export const userSlice = createSlice({
  name: 'question',
  initialState,
  reducers: {
    setMultiple: (state, action: PayloadAction<boolean>) => {
      state.multiple = action.payload
    },
    resetChecked: (state) => {
      state.checked = undefined
    },
    setChecked: (state, action: PayloadAction<number>) => {
      if (state.multiple != true) {
        state.checked = [action.payload]
      } else {
        state.checked?.push(action.payload)
      }
    },
    uncheck: (state, action: PayloadAction<number>) => {
      state.checked = state.checked?.filter((f) => f != action.payload)
    },
  },
})

export const { setChecked, uncheck, setMultiple, resetChecked } =
  userSlice.actions
export const selectChecked = (state: RootState) => state.question.checked
export default userSlice.reducer
