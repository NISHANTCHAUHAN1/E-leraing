import TryCatch from "../middlewares/TryCatch.js";
import { Course } from "../model/courseModel.js";
import { Lecture } from "../model/lectureModel.js";
import { User } from "../model/userModel.js";

export const getAllCourses = TryCatch(async(req,res) => {
    const course = await Course.find();
    res.json({course});
})

export const getSingleCourse = TryCatch(async(req,res) => {
    const course = await Course.findById(req.params.id);
    res.json({course});
})

export const fetchLecture = TryCatch(async(req,res) => {
    const lecture = await Lecture.find({course: req.params.id});
    const user = await User.findById(req.user._id);
    
    if(user.role === "admin") {
        return res.json({lecture});
    }

    if(!user.subscription.includes(req.params.id))
        return res.status(400).json({message: "You have not subscribed to this course"});

    res.json({lecture});
});

export const fetchSingleLecture = TryCatch(async(req,res) => {
    const lecture = await Lecture.findById(req.params.id);
    const user = await User.findById(req.user._id);

    if(user.role === "admin") {
        return res.json({lecture});
    }
    if(!user.subscription.includes(req.params.id))
        return res.status(400).json({message: "You have not subscribed to this course"});

    res.json({lecture});
})