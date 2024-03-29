import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Navigate } from "react-router-dom"
import { checkUser } from "../../../redux/userSlice"

const StudentPrivateRoute = ({ children }) => {
    const dispatch = useDispatch()
    const currentUser = useSelector((state) => state.user.check)

    useEffect(() => {
      dispatch(checkUser())
    }, [dispatch])

    // kullanıcı yoksa logine yönlendir
    if (currentUser?.data?.status === 'fail') {
      console.log("User Not Defined")
        return (
          <Navigate
            to = {'/'}
          />
        )
    }

    // kullanıcı rolü varsa ve student değilse mevcut kullanıcı anasayfasına yönlendir
    if (currentUser?.data?.user?.role && currentUser?.data?.user?.role !== 'student') {
      console.log("Student User Not Defined")
        return (
          <Navigate
            to = {`/${currentUser.data.user.role}/home`}
          />
        )
    }

  return children
}

export default StudentPrivateRoute