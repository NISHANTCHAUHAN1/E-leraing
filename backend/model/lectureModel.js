import mongoose from "mongoose";

const lectureSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  video: {
    type: String,
    required: true,
  },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "courseModel",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Lecture = mongoose.model("Lecture", lectureSchema);