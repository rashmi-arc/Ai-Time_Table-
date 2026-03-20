import { useState } from "react";
import HodSidebar from "../components/HodSidebar";
import Footer from "../components/Footer";

import AddCourse from "../pages/AddCourse";
import CourseTeacherMap from "../pages/CourseTeacherMap";

export default function HodLayout() {
  const [page, setPage] = useState("course");

  return (
    <>
      <div className="navbar">
        <div className="brand">AI Timetable Generator — HOD</div>
      </div>

      <div className="layout">
        <HodSidebar page={page} setPage={setPage} />

        <div className="content">
          {page === "course" && <AddCourse />}
          {page === "map" && <CourseTeacherMap />}
        </div>
      </div>

      <Footer />
    </>
  );
}
