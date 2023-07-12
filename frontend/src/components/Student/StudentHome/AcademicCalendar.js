import React from "react"

const AcademicCalendar = () => {
    return (
        <>
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
        </>
    )
}

export default AcademicCalendar
