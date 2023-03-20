import { useRouter } from "next/router";
import React, { useState } from "react";
import Question from "../../components/Question";
import { IQuiz } from "../../../types/types";

function Quiz() {
  const router = useRouter();
  const [quiz, setQuiz] = useState<IQuiz>();
  const [answers, setAnswers] = useState<string[]>();
  const { id } = router.query;

  async function fetchQuiz() {
    const res = await fetch(`http://localhost:3000/api/quiz/${id}`);
    const data = await res.json();
    setQuiz(data.quiz);
    setAnswers([
      data.quiz?.questions[0].a1,
      data.quiz?.questions[0].a2,
      data.quiz?.questions[0].a3,
      data.quiz?.questions[0].a4,
    ]);
  }

  useState(() => {
    fetchQuiz();
  });

  // TODO: refetch for another questions set

  console.log(id);

  return (
    <div className="w-5/6 m-auto text-white mt-6">
      <div className="flex flex-row justify-between">
        <h1 className="text-5xl text-yellow-400">{quiz?.title}</h1>
        <div>
          <h2 className="text-2xl text-center">Score</h2>
          <p className="text-center">0/50</p>
        </div>
      </div>

      <div className="mt-12">
        <h2 className="text-3xl">{quiz?.questions[0]?.q}</h2>
        <p className="mt-1">
          {quiz?.questions[0]?.correctAnswers
            ? quiz?.questions[0]?.correctAnswers.length > 1
              ? "(Multiple options can be true)"
              : "(Only one option can be true)"
            : "(Only one option can be true)"}
        </p>
        <div className="flex flex-col gap-5 mt-5">
          {answers?.map((answer) => (
            <Question
              multiple={
                quiz?.questions[0]?.correctAnswers
                  ? quiz?.questions[0]?.correctAnswers.length > 1
                    ? true
                    : false
                  : false
              }
              text={answer}
            />
          ))}
        </div>
      </div>

      <div className="flex flex-row justify-between mt-12">
        <button className="bg-yellow-500 text-black py-2 px-8 text-xl rounded-sm hover:bg-yellow-600">
          Prev
        </button>
        <button className="bg-yellow-500 text-black py-2 px-8 text-xl rounded-sm hover:bg-yellow-600">
          Next
        </button>
      </div>
    </div>
  );
}

export default Quiz;
