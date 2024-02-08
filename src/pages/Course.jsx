import React, { useContext, useEffect, useState } from "react";
import "../styles/Course.css";
import HeaderWithLogin from "../components/HeaderWithLogin";
import { AuthContext } from "../context/authContext";
import axios from "axios";
import { useLocation } from "react-router-dom";
import StudentCourse from "../components/StudentCourse";
import TeacherCourse from "../components/TeacherCourse";

function Course() {
  const { currentUser } = useContext(AuthContext);
  const [subject, setSubject] = useState({});

  const location = useLocation();

  const subjectId = location.pathname.split("/")[2];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8000/api/subject/getSubjects/${subjectId}`
        );
        setSubject(res.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [subjectId]);

  const handleDeleteSubject = async () => {};

  return (
    <div className="course-page">
      <HeaderWithLogin />

      <main className="course__main">
        <section className="course__info">
          <h2>{subject.course_name}</h2>
          <p>{subject.course_description}</p>
        </section>

        {currentUser.type === "Студент" && <StudentCourse />}

        {currentUser.type === "Викладач" && <TeacherCourse />}
      </main>
    </div>
  );
}

export default Course;
