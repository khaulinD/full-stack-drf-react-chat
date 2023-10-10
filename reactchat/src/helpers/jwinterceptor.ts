import axios, {AxiosInstance} from "axios";
import {useNavigate} from "react-router-dom";
import {BASE_URL } from "../config";
//import {Simulate} from "react-dom/test-utils";

//const API_BASE_URL = BASE_URL

const useAxiosWithInterceptor = (): AxiosInstance =>{
    const jwtAxios = axios.create({baseURL: BASE_URL});
    const navigate = useNavigate();

    jwtAxios.interceptors.response.use(
        (response)=>{
            return response;
        },
        async  (error)=>{
            const originalRequest = error.config;




            if (error.response?.status === 401 || 403){
                const refreshToken = localStorage.getItem("refresh_token");
                if (refreshToken){
                    try {
                        const refreshResponse = await axios.post(
                            "http://127.0.0.1:8000/api/token/refresh/", {
                                refresh: refreshToken
                            }
                        )

                        const newAccessToken = refreshResponse.data.access;
                        localStorage.setItem("access_token", newAccessToken);
                        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                        return jwtAxios(originalRequest);
                    }
                    catch (refreshError){
                        navigate('/login');
                        console.log(refreshError);
                        throw refreshError;
                    }
                }else {
                    navigate('/login');
                }
                const goRoot = () => navigate("/test");

                goRoot();
            }
            throw error;
        }
    )
    return jwtAxios
}

export default useAxiosWithInterceptor