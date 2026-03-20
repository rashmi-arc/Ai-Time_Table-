function Sidebar({ role, setRole, page, setPage }) {
  return (
    <div className="sidebar">
      <div className="menu">

        <div className="menu-title">Role</div>

        <div className="menu-item" onClick={() => setRole("ADMIN")}>
          Admin Panel
        </div>

        <div className="menu-item" onClick={() => setRole("HOD")}>
          HOD Panel
        </div>

        {role === "ADMIN" && (
          <>
            <div className="menu-title">Admin</div>

            <div
              className={`menu-item ${page === "dept" ? "active" : ""}`}
              onClick={() => setPage("dept")}
            >
              Departments
            </div>

            <div
              className={`menu-item ${page === "program" ? "active" : ""}`}
              onClick={() => setPage("program")}
            >
              Programs
            </div>
            <div
  className={`menu-item ${page === "pdm" ? "active" : ""}`}
  onClick={() => setPage("pdm")}
>
  Program ↔ Department
</div>
<div
  className={`menu-item ${page === "semester" ? "active" : ""}`}
  onClick={() => setPage("semester")}
>
  Semesters
</div>
<div
  className={`menu-item ${page === "room" ? "active" : ""}`}
  onClick={() => setPage("room")}
>
  Rooms
</div>
<div
  className={`menu-item ${page === "slot" ? "active" : ""}`}
  onClick={() => setPage("slot")}
>
  Dept Time Slots
</div>
<div className={`menu-item ${page==="constraint"?"active":""}`} onClick={()=>setPage("constraint")}>
 Constraints
</div>
<div className="menu-item" onClick={()=>setPage("timetable")}>
Generate Timetable
</div>



          </>
        )}

        {role === "HOD" && (
          <>
            <div className="menu-title">HOD</div>

            <div
              className={`menu-item ${page === "course" ? "active" : ""}`}
              onClick={() => setPage("course")}
            >
              Add Course
            </div>

            <div
              className={`menu-item ${page === "map" ? "active" : ""}`}
              onClick={() => setPage("map")}
            >
              Course Mapping
            </div>
          </>
        )}

      </div>
    </div>
  );
}

export default Sidebar;
