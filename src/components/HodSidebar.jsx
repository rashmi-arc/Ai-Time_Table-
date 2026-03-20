export default function HodSidebar({ page, setPage }) {
  return (
    <div className="sidebar">
      <div className="menu">

        <div className="menu-title">HOD PANEL</div>

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
          Course ↔ Teacher Mapping
        </div>

      </div>
    </div>
  );
}
