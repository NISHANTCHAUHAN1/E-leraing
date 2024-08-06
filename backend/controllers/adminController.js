import TryCatch from "../middlewares/TryCatch.js";
import { Course } from "../model/courseModel.js";
import { Lecture } from "../model/lectureModel.js";

export const createCourse = TryCatch(async(req,res) => {
    const {title, description, category, createdBy, duration, price} = req.body;
    const image = req.file;

    await Course.create({
        title, description, category, createdBy,image: image?.path, duration, price
    });

    res.status(200).json({message: "Course Created Successfully"});
});

export const addLecture = TryCatch(async(req,res) => {
    const course = await Course.findById(req.params.id);

    if(!course) return res.status(404).json({ message: "No Course with this id"});

    const {title, description} = req.body;
    const file = req.file;

    const lecture = await Lecture.create({
        title, description, video: file?.path, course: course._id
    });

    res.status(200).json({message: "Lecture Added", lecture});
});
