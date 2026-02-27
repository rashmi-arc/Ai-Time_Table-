export default function AdminSidebar({ page, setPage }) {
  return (
    <div className="sidebar">
      <div className="menu">

        <div className="menu-title">ADMIN PANEL</div>

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

        <div
          className={`menu-item ${page === "constraint" ? "active" : ""}`}
          onClick={() => setPage("constraint")}
        >
          Constraints
        </div>

        <div
          className={`menu-item ${page === "timetable" ? "active" : ""}`}
          onClick={() => setPage("timetable")}
        >
          Generate Timetable
        </div>

      </div>
    </div>
  );
}
