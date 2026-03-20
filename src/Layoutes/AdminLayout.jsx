import { useState } from "react";
import AdminSidebar from "../components/AdminSidebar";
import Footer from "../components/Footer";

import AddDepartment from "../pages/AddDepartment";
import AddProgram from "../pages/AddProgram";
import ProgramDepartmentMap from "../pages/ProgramDepartmentMap";
import AddSemester from "../pages/AddSemester";
import AddRoom from "../pages/AddRoom";
import AddDeptTimeSlot from "../pages/AddDeptTimeSlot";
import AddConstraint from "../pages/AddConstraint";
import ClassTimetable from "../pages/ClassTimetable";


export default function AdminLayout() {
  const [page, setPage] = useState("dept");

  return (
    <>
      <div className="navbar">
        <div className="brand">AI Timetable Generator — Admin</div>
      </div>

      <div className="layout">
        <AdminSidebar page={page} setPage={setPage} />

        <div className="content">
          {page === "dept" && <AddDepartment />}
          {page === "program" && <AddProgram />}
          {page === "pdm" && <ProgramDepartmentMap />}
          {page === "semester" && <AddSemester />}
          {page === "room" && <AddRoom />}
          {page === "slot" && <AddDeptTimeSlot />}
          {page === "constraint" && <AddConstraint />}
          {page === "timetable" && <ClassTimetable />}
         
        </div>
      </div>

      <Footer />
    </>
  );
}
