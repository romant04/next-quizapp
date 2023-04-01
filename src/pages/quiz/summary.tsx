import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useAppDispatch } from '../../app/hooks'
import { reset } from '../../app/questionSlice'

function summary() {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const { score, quizId, quizName } = router.query

  useEffect(() => {
    if (quizId == null) {
      router.push('/')
    }
  }, [])
  dispatch(reset())

  return (
    <div className="flex flex-col m-auto mt-12 text-center text-white">
      <h1 className="mb-2 text-4xl">{quizName}</h1>
      <h2 className="text-2xl">
        You finished the quiz with{' '}
        {typeof score == 'string' ? parseInt(score) : '-'}% score
      </h2>
      <div className="flex flex-col gap-5 m-auto mt-8 lg:flex-row">
        <Link href={`/`}>
          <button className="px-8 py-2 text-black bg-yellow-500 rounded-md text-md w-60 hover:bg-yellow-600">
            Retun to main page
          </button>
        </Link>

        <Link href={`/quiz/${quizId}`}>
          <button className="px-8 py-2 text-black bg-yellow-500 rounded-md text-md w-60 hover:bg-yellow-600">
            Try again
          </button>
        </Link>
      </div>
    </div>
  )
}

export default summary
