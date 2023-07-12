import React from 'react'
import AcademicCalendar from "./AcademicCalendar";
import Announcements from "./Announcements";

const AdminHome = () => {
  return (
    <div className="row">
      <div className="col-xl-8">
        <AcademicCalendar/>
      </div>
      <div className="col-xl-4">
        <Announcements/>
      </div>
    </div>
  )
}

export default AdminHome
