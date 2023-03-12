import mongoose from "mongoose";

/* PetSchema will correspond to a collection in your MongoDB database. */
const GoalSchema = new mongoose.Schema({
    text: {
        type: String,
        required: [true, "Please provide a text"],
    },
    dueDate: {
        type: Date,
        required: [true, "Please provide a date"],
    },
});

export default mongoose.models.goal || mongoose.model("goal", GoalSchema);
