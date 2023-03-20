import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Question from "../../components/Question";
import { IQuiz } from "../../../types/types";

function Quiz() {
  const router = useRouter();
  const [quiz, setQuiz] = useState<IQuiz>();
  const [answers, setAnswers] = useState<string[]>();
  const [multiple, setMultiple] = useState<boolean>();
  const [questionId, setQuestionId] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const { id } = router.query;

  async function fetchQuiz() {
    const res = await fetch(`http://localhost:3000/api/quiz/${id}`);
    const data = await res.json();
    setQuiz(data.quiz);
    setAnswers([
      data.quiz?.questions[questionId].a1,
      data.quiz?.questions[questionId].a2,
      data.quiz?.questions[questionId].a3,
      data.quiz?.questions[questionId].a4,
    ]);
    setMultiple(
      data?.quiz?.questions[questionId]?.correctAnswers != null &&
        data?.quiz?.questions[questionId]?.correctAnswers.length > 1
    );
    setLoading(false);
  }

  useEffect(() => {
    setLoading(true);
    fetchQuiz();
  }, [questionId]);

  function handleBtnPrev() {
    if (questionId > 0) {
      setQuestionId(questionId - 1);
    }
  }

  function handleBtnNext() {
    const maxCount: number = quiz?.questions.length as number;
    if (questionId < maxCount - 1) {
      setQuestionId(questionId + 1);
    }
  }

  function handleBtnSubmit() {}

  // TODO: create a are you sure modal for submit

  console.log(id);

  return (
    <>
      <div className="fixed inset-1/2 translate-x-1/2 translate-y-1/2"></div>
      <div className="w-5/6 m-auto text-white mt-6">
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
                  ? "(Multiple options can be true)"
                  : "(Only one option can be true)"}
              </p>
              <div className="flex flex-col gap-5 mt-5">
                {answers?.map((answer) => (
                  <Question multiple={multiple ? true : false} text={answer} />
                ))}
              </div>
            </div>

            <div className="flex flex-row justify-between mt-12">
              <button
                onClick={() => handleBtnPrev()}
                className="bg-yellow-500 w-40 text-black py-2 px-8 text-xl rounded-sm hover:bg-yellow-600"
              >
                Prev
              </button>
              {questionId + 1 == quiz?.questions.length ? (
                <button
                  onClick={() => handleBtnSubmit()}
                  className="bg-yellow-500 w-40 text-black py-2 px-8 text-xl rounded-sm hover:bg-yellow-600"
                >
                  Submit
                </button>
              ) : (
                <button
                  onClick={() => handleBtnNext()}
                  className="bg-yellow-500 w-40 text-black py-2 px-8 text-xl rounded-sm hover:bg-yellow-600"
                >
                  Next
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default Quiz;
