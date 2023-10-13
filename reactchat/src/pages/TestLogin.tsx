import {useAuthServiceContext} from "../context/AuthContext.tsx";
import {useState} from "react";
import axios from "axios";
import useAxiosWithInterceptor from "../helpers/jwtinterceptors.ts";


const TestLogin = () =>{
    const jwtAxios = useAxiosWithInterceptor();
    const { isLoggedIn, logout } = useAuthServiceContext();
    const [username, setUsername] = useState("")
const getUserDetails=async () =>{
        try{
            const response =  await jwtAxios.get(
                `http://127.0.0.1:8000/api/users/?user_id=1`, {
                    withCredentials:true
            });

            const userDetails = response.data[0]
            console.log(response.data)
            setUsername(userDetails.username)
        } catch (err:any){
            return err;
        }
    }

    return <>
        <div>{isLoggedIn.toString()}</div>
        <div>
            <button onClick={logout}>Logout</button>
            <button onClick={getUserDetails}>getUserDetails</button>
        </div>
        <div> Username: {username}</div>
    </>
}

export default TestLogin