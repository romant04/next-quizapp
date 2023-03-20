import dbConnect from "../../../../lib/mongodb";
import Quiz from "../../../../models/Quiz";

export default async function addTest(req, res) {
  try {
    await dbConnect();
    const { id } = req.query;

    const quiz = await Quiz.findById(id);
    if (quiz == null) {
      return res.status(404);
    }

    return res.json({ quiz });
  } catch (error) {
    console.log(error);
    return res.json({ error });
  }
}
