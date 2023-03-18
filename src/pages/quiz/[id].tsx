import { useRouter } from "next/router";
import React from "react";
import Question from "../../components/Question";

function Quiz() {
    const router = useRouter();
    const { id } = router.query;

    // TODO: fetch data of quiz from it's id
    console.log(id);

    return (
        <div className="w-5/6 m-auto text-white mt-6">
            <div className="flex flex-row justify-between">
                <h1 className="text-5xl text-yellow-400">Random quiz</h1>
                <div>
                    <h2 className="text-2xl text-center">Score</h2>
                    <p className="text-center">0/50</p>
                </div>
            </div>

            <div className="mt-12">
                <h2 className="text-3xl">Random question ?</h2>
                <p className="mt-1">(multiple options can be true)</p>
                <div className="flex flex-col gap-5 mt-5">
                    <Question multiple={true} text={"The random answer"} />
                    <Question multiple={true} text={"The random answer"} />
                    <Question multiple={true} text={"The random answer"} />
                    <Question multiple={false} text={"The random answer"} />
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
