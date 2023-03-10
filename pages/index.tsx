import Head from "next/head";
import clientPromise from "../lib/mongodb";
import { InferGetServerSidePropsType } from "next";
import Image from "next/image";
import Quizcard from "../components/Quizcard";
import { Genre } from "../types/types";

export async function getServerSideProps() {
  try {
    await clientPromise;
    // `await clientPromise` will use the default database passed in the MONGODB_URI
    // However you can use another database (e.g. myDatabase) by replacing the `await clientPromise` with the following code:
    //
    // `const client = await clientPromise`
    // `const db = client.db("myDatabase")`
    //
    // Then you can execute queries against your database like so:
    // db.find({}) or any of the MongoDB Node Driver commands

    return {
      props: { isConnected: true },
    };
  } catch (e) {
    console.error(e);
    return {
      props: { isConnected: false },
    };
  }
}

export default function Home({
  isConnected,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <div>
      <Head>
        <title>Quizapp - Home</title>
        <link rel="icon" href="/icon.png" />
      </Head>
      <div className="flex flex-col w-full justify-center items-center gap-6">
        <Quizcard text="Roman's quiz" genre={Genre.Coding} />
        <Quizcard text="Ultimate quiz" genre={Genre.Gaming} />
        <Quizcard text="Am I dumb ?" genre={Genre.Any} />
        <Quizcard text="Only 0.01% can do this quiz" genre={Genre.Math} />
      </div>
    </div>
  );
}
