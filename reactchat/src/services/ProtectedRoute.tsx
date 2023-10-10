import {useAuthServiceContext} from "../context/AuthContext.tsx";
import {Navigate} from "react-router-dom";


const ProtectedRoute = ({children}: {children: React.ReactNode})=>{
    const {isLoggedIn} = useAuthServiceContext();
    if (!isLoggedIn){
        return <Navigate to="/login" replace={true}></Navigate>
    }
    return <>{children}</>

}

export default ProtectedRoute