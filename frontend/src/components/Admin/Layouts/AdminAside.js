import React from 'react'
import { NavLink } from 'react-router-dom'

const AdminAside = () => {
    return (
        <aside id="sidebar" className="sidebar">
            <ul className="sidebar-nav" id="sidebar-nav">
                <li className="nav-item">
                    <NavLink
                        to={'/admin/home'}
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
                        to={'/admin/educationPeriod'}
                        className={({ isActive }) =>
                            isActive ? 'nav-link' : 'nav-link collapsed'
                        }
                    >
                        <i className="bi bi-calendar-plus-fill" />
                        <span>Dönem Aç / Kapat</span>
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink
                        to={'/admin/dateRanges'}
                        className={({ isActive }) =>
                            isActive ? 'nav-link' : 'nav-link collapsed'
                        }
                    >
                        <i className="bi bi-folder-symlink-fill" />
                        <span>Tarih Aralıkları</span>
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink
                        to={'/admin/announcements'}
                        className={({ isActive }) =>
                            isActive ? 'nav-link' : 'nav-link collapsed'
                        }
                    >
                        <i className="bi bi-collection-fill" />
                        <span>Duyurular</span>
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink
                        to={'/admin/students'}
                        className={({ isActive }) =>
                            isActive ? 'nav-link' : 'nav-link collapsed'
                        }
                    >
                        <i className="bi bi-collection-fill" />
                        <span>Öğrenciler</span>
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink
                        to={'/admin/teachers'}
                        className={({ isActive }) =>
                            isActive ? 'nav-link' : 'nav-link collapsed'
                        }
                    >
                        <i className="bi bi-collection-fill" />
                        <span>Öğretmenler</span>
                    </NavLink>
                </li>
            </ul>
        </aside>
    )
}

export default AdminAside
