import React from 'react'
import { NavLink } from 'react-router-dom'

const TeacherAside = () => {
  return (
    <aside id="sidebar" className="sidebar">
      <ul className="sidebar-nav" id="sidebar-nav">
        <li className="nav-item">
          <NavLink
            to={'/teacher/home'}
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
            to={'/teacher/internshipApplications'}
            className={({ isActive }) =>
              isActive ? 'nav-link' : 'nav-link collapsed'
            }
          >
            <i className="bi bi-calendar-plus-fill" />
            <span>Başvurular</span>
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            to={'/teacher/internshipStudentsView'}
            className={({ isActive }) =>
              isActive ? 'nav-link' : 'nav-link collapsed'
            }
          >
            <i className="bi bi-folder-symlink-fill" />
            <span>Öğrenciler</span>
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            to={'/teacher/internshipTeam'}
            className={({ isActive }) =>
              isActive ? 'nav-link' : 'nav-link collapsed'
            }
          >
            <i className="bi bi-collection-fill" />
            <span>Staj Ekip</span>
          </NavLink>
        </li>
      </ul>
    </aside>
  )
}

export default TeacherAside
