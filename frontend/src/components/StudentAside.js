import React from "react";
import { useSelector } from "react-redux";

function StudentAside() {
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
            <i className="bi bi-calendar-plus-fill"></i>
            <span>Staj Formu</span>
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link collapsed" href={ksuLink}>
            <i className="bi bi-folder-symlink-fill"></i>
            <span>Staj Evrakları</span>
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link collapsed" href={ksuLink}>
            <i className="bi bi-collection-fill"></i>
            <span>Staj Süreci</span>
          </a>
        </li>
      </ul>
    </aside>
  );
}

export default StudentAside;
