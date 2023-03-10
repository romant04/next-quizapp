import React from "react";
import Image from "next/image";
import { Genre } from "../types/types";

type Props = {
  text: string;
  genre: Genre;
};

function Quizcard({ text, genre }: Props) {
  return (
    <div className="flex flex-col justify-center items-center gap-5 rounded-md bg-gray-500 w-80 py-5">
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
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-white text-xl">{text}</h1>
        <p className="text-gray-200">Genre: {genre.valueOf()}</p>
      </div>
      <button className="bg-white px-10 py-2 rounded-xl font-semibold text-black text-md hover:bg-yellow-400 transition-all duration-200 ease-out">
        Start
      </button>
    </div>
  );
}

export default Quizcard;
