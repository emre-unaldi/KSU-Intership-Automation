import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { checkUser } from "../../redux/userConfigurationSlice";

export default function TeacherPrivateRoute({ children }) {
    const dispatch = useDispatch()
    const currentUser = useSelector((state) => state.user.check)
    //console.log("Teacher : " , currentUser)

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
    // kullanıcı rolü varsa ve teacher değilse mevcut kullanıcı anasayfasına yönlendir
    if (currentUser?.data?.user?.role && currentUser?.data?.user?.role !== 'teacher') {
      console.log("Teacher User Not Defined")
        return (
          <Navigate
            to = {`/${currentUser.data.user.role}/home`}
          />
        )
    }
      
  return children;
}