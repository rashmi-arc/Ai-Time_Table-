import { useState } from "react";
import AdminSidebar from "./components/AdminSidebar";
import HodSidebar from "./components/HodSidebar";
import Footer from "./components/Footer";

import Login from "./pages/Login";
import AddUser from "./pages/AddUser";
import AddDepartment from "./pages/AddDepartment";
import AddCourse from "./pages/AddCourse";
import CourseTeacherMap from "./pages/CourseTeacherMap";
import AddProgram from "./pages/AddProgram";
import ProgramDepartmentMap from "./pages/ProgramDepartmentMap";
import AddSemester from "./pages/AddSemester";
import AddRoom from "./pages/AddRoom";
import AddDeptTimeSlot from "./pages/AddDeptTimeSlot";
import AddConstraint from "./pages/AddConstraint";
import ClassTimetable from "./pages/ClassTimetable";

/* ✅ SAFE USER LOADER */
function getUserFromStorage() {
  try {
    const raw = localStorage.getItem("user");

    if (!raw || raw === "undefined" || raw === "null") {
      return null;
    }

    return JSON.parse(raw);
  } catch (err) {
    console.error("Corrupted user in localStorage. Clearing.");
    localStorage.removeItem("user");
    return null;
  }
}

function App() {
  const user = getUserFromStorage();
  const [page, setPage] = useState("dept");

  /* 🔒 NOT LOGGED IN */
  if (!user) {
    return <Login />;
  }

  return (
    <>
      {/* NAVBAR */}
      <div className="navbar">
        <div className="brand">AI Timetable Generator</div>

        <div className="profile">
          {user.name} ({user.role})
          <button
            onClick={() => {
              localStorage.clear();
              window.location.reload();
            }}
            style={{ marginLeft: "10px" }}
          >
            Logout
          </button>
        </div>
      </div>

      <div className="layout">
        {/* SIDEBAR */}
        {user.role === "ADMIN" && (
          <AdminSidebar page={page} setPage={setPage} />
        )}

        {user.role === "HOD" && (
          <HodSidebar page={page} setPage={setPage} />
        )}

        {/* CONTENT */}
       <div className="content">
  <div className="content-wrapper">
    {page === "dept" && <AddDepartment />}
    {page === "program" && <AddProgram />}
    {page === "pdm" && <ProgramDepartmentMap />}
    {page === "semester" && <AddSemester />}
    {page === "room" && <AddRoom />}
    {page === "slot" && <AddDeptTimeSlot />}
    {page === "constraint" && <AddConstraint />}
    {page === "timetable" && <ClassTimetable />}
    {page === "user" && <AddUser />}

    {/* HOD */}
    {page === "course" && <AddCourse />}
    {page === "map" && <CourseTeacherMap />}
  </div>
</div>

      </div>

      <Footer />
    </>
  );
}

export default App;
