import mongoose from "mongoose";

const QuestionSchema = new mongoose.Schema({
    q: {
        type: String,
    },
    a1: {
        type: String,
    },
    a2: {
        type: String,
    },
    a3: {
        type: String,
    },
    a4: {
        type: String,
    },
    correctAnswers: [
        {
            type: Number,
        },
    ],
});

const GuizSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Please provide a title"],
    },
    questions: [QuestionSchema],
    owner: {
        type: String,
    },
    genre: {
        type: String,
        enum: ["Gaming", "Coding", "Math", "Other", null],
    },
});

export default mongoose.models.quiz || mongoose.model("quiz", GuizSchema);
