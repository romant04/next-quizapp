import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import Question from '../../components/Question'
import { IQuiz } from '../../../types/types'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import {
  renewChecked,
  resetChecked,
  setMultiple,
  setPage,
} from '../../app/questionSlice'

function Quiz() {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const [quiz, setQuiz] = useState<IQuiz>()
  const [answers, setAnswers] = useState<string[]>()
  const [multiple, setMultipleq] = useState<boolean>()
  const [questionId, setQuestionId] = useState<number>(0)
  const [loading, setLoading] = useState<boolean>(true)
  const [modal, setModal] = useState<boolean>(false)
  const { id } = router.query

  async function fetchQuiz() {
    const res = await fetch(`http://localhost:3000/api/quiz/${id}`)
    const data = await res.json()
    setQuiz(data.quiz)
    setAnswers([
      data.quiz?.questions[questionId].a1,
      data.quiz?.questions[questionId].a2,
      data.quiz?.questions[questionId].a3,
      data.quiz?.questions[questionId].a4,
    ])
    setMultipleq(
      data?.quiz?.questions[questionId]?.correctAnswers != null &&
        data?.quiz?.questions[questionId]?.correctAnswers.length > 1
    )
    setLoading(false)
  }

  useEffect(() => {
    dispatch(setPage(questionId))
    if (pageAnswers?.filter((f) => f.page == questionId)[0]?.answers) {
      dispatch(
        renewChecked(
          pageAnswers?.filter((f) => f.page == questionId)[0]?.answers
        )
      )
    }
  }, [questionId])

  useEffect(() => {
    dispatch(setMultiple(multiple as boolean))
  }, [multiple])

  useEffect(() => {
    setLoading(true)
    fetchQuiz()
  }, [questionId])

  function handleBtnPrev() {
    if (questionId > 0) {
      setQuestionId(questionId - 1)
      dispatch(resetChecked())
    }
  }

  function handleBtnNext() {
    const maxCount: number = quiz?.questions.length as number
    if (questionId < maxCount - 1) {
      setQuestionId(questionId + 1)
      dispatch(resetChecked())
    }
  }

  function handleSureSubmit() {
    setModal(false)
    setQuestionId(0)
  }

  // TODO: use stored answers for completing quiz

  const pageAnswers = useAppSelector((state) => state.question.pageAnswers)
  console.log(pageAnswers)

  return (
    <>
      {modal && (
        <div className="customModal fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] md:h-full">
          <div className="relative w-full h-full max-w-2xl md:h-auto">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <button
                onClick={() => setModal(false)}
                type="button"
                className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
                data-modal-hide="popup-modal"
              >
                <svg
                  aria-hidden="true"
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
              <div className="p-6 text-center">
                <svg
                  aria-hidden="true"
                  className="mx-auto mb-4 text-gray-200 w-14 h-14 "
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
                <h3 className="mb-5 text-lg font-normal text-gray-400 ">
                  {pageAnswers?.map(
                    (f) => f.answers == quiz?.questions[f.page].correctAnswers
                  )}
                  Are you sure you want to submit?<br></br> You won't be able to
                  change your selection after.
                </h3>
                <button
                  onClick={() => handleSureSubmit()}
                  data-modal-hide="popup-modal"
                  type="button"
                  className="text-white bg-yellow-600 hover:bg-yellow-800 focus:ring-4 focus:outline-none focus:ring-yellow-300 dark:focus:ring-yellow-700 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
                >
                  Yes, I'm sure
                </button>
                <button
                  onClick={() => setModal(false)}
                  data-modal-hide="popup-modal"
                  type="button"
                  className="text-white bg-gray-500 hover:bg-gray-600 focus:ring-4 focus:outline-none focus:ring-gray-500 rounded-lg border border-gray-500 text-sm font-medium px-5 py-2.5 hover:text-gray-100 focus:z-10"
                >
                  No, cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="w-5/6 m-auto mt-6 text-white">
        {loading ? (
          <div className="lds-ring">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        ) : (
          <>
            <div className="flex flex-row justify-between">
              <h1 className="text-5xl text-yellow-400">{quiz?.title}</h1>
              <div>
                <h2 className="text-2xl text-center">Question</h2>
                <p className="text-center">
                  {questionId + 1} / {quiz?.questions.length}
                </p>
              </div>
            </div>

            <div className="mt-12">
              <h2 className="text-3xl">{quiz?.questions[questionId]?.q}</h2>
              <p className="mt-1">
                {multiple
                  ? '(Multiple options can be true)'
                  : '(Only one option can be true)'}
              </p>
              <div className="flex flex-col gap-5 mt-5">
                {answers?.map((answer, id) => (
                  <Question
                    id={id}
                    page={questionId}
                    multiple={multiple ? true : false}
                    text={answer}
                  />
                ))}
              </div>
            </div>

            <div className="flex flex-row justify-between mt-12">
              <button
                onClick={() => handleBtnPrev()}
                className="w-40 px-8 py-2 text-xl text-black bg-yellow-500 rounded-md hover:bg-yellow-600"
              >
                Prev
              </button>
              {questionId + 1 == quiz?.questions.length ? (
                <button
                  onClick={() => setModal(true)}
                  className="w-40 px-8 py-2 text-xl text-black bg-yellow-500 rounded-md hover:bg-yellow-600"
                >
                  Submit
                </button>
              ) : (
                <button
                  onClick={() => handleBtnNext()}
                  className="w-40 px-8 py-2 text-xl text-black bg-yellow-500 rounded-md hover:bg-yellow-600"
                >
                  Next
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </>
  )
}

export default Quiz
