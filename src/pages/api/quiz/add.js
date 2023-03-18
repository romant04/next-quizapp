import dbConnect from "../../../../lib/mongodb";
import Quiz from "../../../../models/Quiz";

export default async function addTest(req, res) {
    try {
        await dbConnect();

        console.log("CREATING DOCUMENT");
        const quiz = await Quiz.create(req.body);
        quiz.save();
        console.log("CREATED DOCUMENT");

        return res.json({ quiz });
    } catch (error) {
        console.log(error);
        return res.json({ error });
    }
}
