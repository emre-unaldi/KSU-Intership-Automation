import { useEffect, useState } from 'react'
import axios from 'axios'
import AdminHeader from '../../components/Admin/Layouts/AdminHeader'
import AdminAside from '../../components/Admin/Layouts/AdminAside'
import AdminFooter from '../../components/Admin/Layouts/AdminFooter'
import Loading from '../../components/System/Loading'
import Internships from "../../components/Admin/Internships/Internships";
axios.defaults.withCredentials = true

const InternshipPage = () => {
    const [isPageLoading, setIsPageLoading] = useState(true)

    useEffect(() => {
        setTimeout(() => {
            setIsPageLoading(false)
        }, 1500)
    }, [])

    return (
        <>
            <AdminHeader />
            <AdminAside />
            <main id="main" className="main">
                <section className="section">
                    <div className="row">
                        <div className="card">
                            <div className="card-body">
                                {
                                    !isPageLoading ?
                                        (
                                            <Internships />
                                        )
                                        :
                                        (
                                            <Loading isPageLoading={isPageLoading} />
                                        )
                                }
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <AdminFooter />
        </>
    )
}

export default InternshipPage
