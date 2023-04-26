import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Navigate } from "react-router-dom"
import { checkUser } from "../../redux/userSlice"

export default function AuthPrivateRoute({ children }) {
    const dispatch = useDispatch()
    const currentUser = useSelector((state) => state.user.check)

    useEffect(() => {
      dispatch(checkUser())
    }, [dispatch])
    
    // kullanıcı varsa mevcut kullanıcı anasayfasına yönlendir
    if (currentUser?.data?.status === 'success') {
      console.log("User Found")
        return (
          <Navigate
            to = {`/${currentUser.data.user.role}/home`}
          />
        )
      }
      
  return children
}
