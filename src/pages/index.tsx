import Head from 'next/head'
import dbConnect from '../../lib/mongodb'
import Quiz from '../../models/Quiz'
import Quizcard from '../components/Quizcard'
import { Genre } from '../../types/types'
import { useSession } from 'next-auth/react'
import { IQuiz } from '../../types/types'

export async function getServerSideProps() {
  await dbConnect()
  console.log('Database connected succesfuly')
  /*
    const res = await fetch("http://localhost:3000/api/quiz/add", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            title: "randomQuestion",
            questions: [
                {
                    q: "How are you doing today ?",
                    a1: "fine",
                    a2: "awesome",
                    a3: "could be better",
                    a4: "couldn't be worse",
                    correctAnswers: [1, 2, 3, 4],
                },
            ],
            owner: "roman.tarnai.04@gmail.com",
        }),
    });
    console.log(res);*/

  /* find all the data in our database */
  const result = await Quiz.find({})
  const quizzes = result.map((doc) => {
    const quiz = doc.toObject()
    quiz._id = quiz._id.toString()
    return quiz as IQuiz
  })

  return { props: { quizzes: JSON.parse(JSON.stringify(quizzes)) } }
}

type Prop = {
  quizzes: IQuiz[]
}

export default function Home({ quizzes }: Prop) {
  const { data: session } = useSession()

  console.log(quizzes)
  return (
    <div>
      <Head>
        <title>Quizapp - Home</title>
        <link rel="icon" href="/icon.png" />
      </Head>
      <div className="quizGrid">
        {quizzes?.map((quiz) => (
          <Quizcard
            key={quiz._id}
            id={quiz._id}
            text={quiz.title}
            genre={quiz.genre ? (quiz.genre as Genre) : Genre.Other}
          />
        ))}
      </div>
    </div>
  )
}
