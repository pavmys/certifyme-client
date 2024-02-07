import React from "react";
import { Link } from "react-router-dom";
import SubjectPic from "../img/subject_pic.png";
import "../styles/Courses.css";
import "../styles/Profile.css";
function TeacherProfile(props) {
  const teacherSubjects = props.subjects;

  return (
    <main className="profile__main">
      <section className="profile__info">
        <div className="profile__name">
          <img
            width="100"
            height="100"
            src="https://img.icons8.com/cotton/100/user-male-circle.png"
            alt="user-male-circle"
          />
          <span>{`${props.surname} ${props.name}`}</span>
        </div>
        <div className="profile__group">
          <span style={{ fontSize: "18px" }}>
            <strong>{props.cathedra}</strong>
          </span>
        </div>
      </section>

      <Link to="/register-subject" className="register__subject">
        <button>Додати курс</button>
      </Link>

      <section className="teacher__subjects">
        <h2>МОЇ КУРСИ</h2>
        <div className="dashboard__courses">
          {teacherSubjects.map((subject) => (
            <Link
              className="dashboard__course"
              key={subject.id}
              to={`/courses/${subject.id}`}
            >
              <img src={SubjectPic} alt="you sabaki" />
              <h3>{subject.course_name}</h3>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}

export default TeacherProfile;
