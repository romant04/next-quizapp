import React from "react";
import Image from "next/image";
import { Genre } from "../../types/types";

type Props = {
    text: string;
    genre: Genre;
};

function Quizcard({ text, genre }: Props) {
    return (
        <div className="flex flex-col items-center justify-center gap-5 py-5 bg-gray-500 rounded-md w-80">
            <Image
                src={
                    genre === Genre.Coding
                        ? "/coding.png"
                        : genre === Genre.Gaming
                        ? "/joy.png"
                        : genre === Genre.Math
                        ? "/math.png"
                        : "/slot.png"
                }
                alt=""
                width={128}
                height={128}
            />
            <div className="flex flex-col items-center justify-center">
                <h1 className="text-xl text-white">{text}</h1>
                <p className="text-gray-200">Genre: {genre.valueOf()}</p>
            </div>
            <button className="px-10 py-2 font-semibold text-black transition-all duration-200 ease-out bg-white rounded-xl text-md hover:bg-yellow-400">
                Start
            </button>
        </div>
    );
}

export default Quizcard;
