import React from 'react'

const StudentHome = () => {
  return (
    <div className="row">
      <div className="col-xl-8">
        <h2
          className="card-title d-flex justify-content-center"
          style={{
            fontFamily: 'open sans',
            fontSize: 20,
          }}
        >
          <b>Akademik Takvim</b>
        </h2>
        <embed
          src={`http://localhost:3001/documents/sample.pdf`}
          width="100%"
          height="500"
          type="application/pdf"
          style={{
            fontFamily: 'open sans',
            borderRadius: 10,
            border: '5px solid #323639'
          }}
        />
      </div>
      <div className="col-xl-4">
        <h2
          className="card-title d-flex justify-content-center"
          style={{
            fontFamily: 'open sans',
            fontSize: 20,
          }}
        >
          <b>Duyurular</b>
        </h2>
        <div className="alert alert-primary">
          <i className="bi bi-calendar-week-fill me-1"></i>
            Staj başvuruları 20.01.2023 tarihinde sonlandırılacaktır. Öğrencilerin
            staj evraklarını zamanında teslim etmek zorundadır.
        </div>
        <div className="alert alert-warning">
          <i className="bi bi-info-square-fill me-1"></i>
            Öğrencilerin staj evraklarını zamanında teslim etmek zorundadır.
        </div>
      </div>
    </div>
  )
}

export default StudentHome
