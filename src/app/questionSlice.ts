import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from './store'

// declaring the types for our state
export type QuestionState = {
  checked: number[]
  multiple: boolean
  currentPage: number
  pageAnswers:
    | {
        page: number
        answers: number[]
      }[]
    | null
}

const initialState: QuestionState = {
  checked: [],
  multiple: false,
  currentPage: 0,
  pageAnswers: [],
}

export const userSlice = createSlice({
  name: 'question',
  initialState,
  reducers: {
    setPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload
    },
    setMultiple: (state, action: PayloadAction<boolean>) => {
      state.multiple = action.payload
    },
    resetChecked: (state) => {
      state.checked = []
    },
    renewChecked: (state, action: PayloadAction<number[]>) => {
      state.checked = action.payload
    },
    setChecked: (state, action: PayloadAction<number>) => {
      if (state.multiple != true) {
        state.checked = [action.payload]
      } else {
        state.checked?.push(action.payload)
      }
      if (state.pageAnswers?.some((x) => x.page == state.currentPage)) {
        state.pageAnswers.filter(
          (x) => x.page == state.currentPage
        )[0].answers = state.checked
      } else {
        state.pageAnswers?.push({
          page: state.currentPage,
          answers: state.checked,
        })
      }
    },
    uncheck: (state, action: PayloadAction<number>) => {
      state.checked = state.checked?.filter((f) => f != action.payload)
      if (state.pageAnswers?.some((x) => x.page == state.currentPage)) {
        state.pageAnswers.filter(
          (x) => x.page == state.currentPage
        )[0].answers = state.checked
      } else {
        state.pageAnswers?.push({
          page: state.currentPage,
          answers: state.checked,
        })
      }
    },
    reset: (state) => {
      state.checked = []
      state.multiple = false
      state.currentPage = 0
      state.pageAnswers = []
    },
  },
})

export const {
  setChecked,
  uncheck,
  setMultiple,
  resetChecked,
  setPage,
  renewChecked,
  reset,
} = userSlice.actions
export const selectChecked = (state: RootState) => state.question.checked
export default userSlice.reducer
