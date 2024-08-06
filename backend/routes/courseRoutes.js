import express from 'express';
import { fetchLecture, fetchSingleLecture, getAllCourses, getSingleCourse } from '../controllers/courseController.js';
import { isAuth } from '../middlewares/isAuth.js';

const router = express.Router();

router.get("/course/all", getAllCourses);
router.get("/course/:id", getSingleCourse);
router.get("/lectures/:id", isAuth, fetchLecture);
router.get("/lecture/:id", isAuth, fetchSingleLecture);


export default router;