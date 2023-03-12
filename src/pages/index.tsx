import Head from "next/head";
import dbConnect from "../../lib/mongodb";
import Goal from "../../models/Goal";
import Quizcard from "../components/Quizcard";
import { Genre } from "../../types/types";

interface IGoal {
    text: string;
    dueDate: Date;
}

export async function getServerSideProps() {
    await dbConnect();
    console.log("Database connected succesfuly");

    /* find all the data in our database */
    const result = await Goal.find({});
    const goals = result.map((doc) => {
        const goal = doc.toObject();
        goal._id = goal._id.toString();
        return goal as IGoal;
    });

    return { props: { goals: JSON.parse(JSON.stringify(goals)) } };
}

type Prop = {
    goals: IGoal[];
};

export default function Home({ goals }: Prop) {
    console.log(goals);
    return (
        <div>
            <Head>
                <title>Quizapp - Home</title>
                <link rel="icon" href="/icon.png" />
            </Head>
            <div className="flex flex-col items-center justify-center w-full gap-6">
                <Quizcard text="Roman's quiz" genre={Genre.Coding} />
            </div>
        </div>
    );
}
