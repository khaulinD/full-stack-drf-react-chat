import {AuthServiceProps} from "../@types/auth-service";
import axios from "axios";
import {useState} from "react";
import useAxiosWithInterceptor from "../helpers/jwinterceptor.ts";


export function useAuthService(): AuthServiceProps {
    // const [isLoggedIn,setIsLoggedIn] = useState<boolean>(()=>{
    //     const loggedIn = localStorage.getItem("isLoggedIn");
    //     if (loggedIn !==null){
    //         return Boolean(loggedIn)
    //     }
    //     return false

    // })
    const getInintialLoggedValue = () =>{
        const loggedIn = localStorage.getItem("isLoggedIn")
        return loggedIn !== null && loggedIn ==="true";
    }
    const [isLoggedIn,setIsLoggedIn] = useState<boolean>((getInintialLoggedValue))
    const jwtAxios = useAxiosWithInterceptor();

    // const getUserDetails=async () =>{
    //     try{
    //         const userId = localStorage.getItem("userId")
    //         const accessToken = localStorage.getItem("access_token")
    //         const response =  await jwtAxios.get(
    //             `http://127.0.0.1:8000/api/users/?user_id=${userId}`, {
    //                 headers:{
    //                 Authorization: `Bearer ${accessToken}`
    //             }
    //         });
    //         const userDetails = response.data[0];
    //         console.log(userDetails.username)
    //         localStorage.setItem("username", userDetails.username);
    //         setIsLoggedIn(true)
    //     } catch (err:any){
    //         setIsLoggedIn(false)
    //         localStorage.setItem("isLoggedIn", "false");
    //         return err;
    //     }
    // }

    // const getUserIdFromToken= (access:string)=>{
    //     const token = access
    //     const tokenParts = token.split(".")
    //     const secondPart = tokenParts[1]
    //     const decodeParts = atob(secondPart)
    //     const payLoadData = JSON.parse(decodeParts)
    //     const id = payLoadData.user_id
    //
    //     return id
    // }

    const login = async (username:string, password:string) =>{
        try{
            const response =  await axios.post(
                "http://127.0.0.1:8000/api/token/",{
                    username,
                    password
                },
                {withCredentials: true}
            );
            console.log(response.data)
            // const user_id = response.data.user_id
            localStorage.setItem("isLoggedIn", "true");
            // localStorage.setItem("user_id", user_id)
            setIsLoggedIn(true)
            //getUserDetails();


        } catch (err:any){

            return err;
        }
    }

    const logout = () =>{
        //localStorage.removeItem("username");
        localStorage.setItem("isLoggedIn", "false");
        setIsLoggedIn(false)
    }

    return {login, isLoggedIn, logout}
}