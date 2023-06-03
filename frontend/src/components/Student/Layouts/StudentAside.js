import React from 'react'
import { NavLink } from 'react-router-dom'

function StudentAside() {
  return (
    <aside id="sidebar" className="sidebar">
      <ul className="sidebar-nav" id="sidebar-nav">
        <li className="nav-item">
          <NavLink
            to={'/student/home'}
            className={({ isActive }) =>
              isActive ? 'nav-link' : 'nav-link collapsed'
            }
          >
            <i className="bi bi-house-fill" />
            <span>Anasayfa</span>
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            to={'/student/internshipForm/selection'}
            className={({ isActive }) =>
              isActive ? 'nav-link' : 'nav-link collapsed'
            }
          >
            <i className="bi bi-calendar-plus-fill" />
            <span>Staj Formu</span>
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            to={'/student/internshipDocuments'}
            className={({ isActive }) =>
              isActive ? 'nav-link' : 'nav-link collapsed'
            }
          >
            <i className="bi bi-folder-symlink-fill" />
            <span>Staj Evrakları</span>
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            to={'/student/internshipProcess'}
            className={({ isActive }) =>
              isActive ? 'nav-link' : 'nav-link collapsed'
            }
          >
            <i className="bi bi-collection-fill" />
            <span>Staj Süreci</span>
          </NavLink>
        </li>
      </ul>
    </aside>
  )
}

export default StudentAside
