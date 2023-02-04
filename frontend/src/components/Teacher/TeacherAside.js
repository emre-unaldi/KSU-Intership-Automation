import React from "react";
import { useSelector } from "react-redux";

function TeacherAside() {
  const ksuLink = useSelector((state) => state.system.ksuLink);

  return (
    <aside id="sidebar" className="sidebar">
      <ul className="sidebar-nav" id="sidebar-nav">
        <li className="nav-item">
          <a className="nav-link" href={ksuLink}>
            <i className="bi bi-house-fill"></i>
            <span>Menü</span>
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link collapsed" href={ksuLink}>
            <i className="bi bi-file-earmark-check-fill"></i>
            <span>Başvurular</span>
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link collapsed" href={ksuLink}>
            <i className="bi bi-people-fill"></i>
            <span>Öğrenciler</span>
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link collapsed" href={ksuLink}>
            <i className="bi bi-slack"></i>
            <span>Staj Ekip</span>
          </a>
        </li>
      </ul>
    </aside>
  );
}

export default TeacherAside;
