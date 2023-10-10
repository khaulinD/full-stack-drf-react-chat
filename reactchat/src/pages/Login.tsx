import {useFormik} from "formik";
import {useNavigate} from "react-router-dom";
import {useAuthServiceContext} from "../context/AuthContext.tsx";

const Login = () => {
    const {login} = useAuthServiceContext();
    const navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
            username: '',
            password: "",
        },
        onSubmit: async (values) => {
            const {username, password} = values;
            const res = await login(username, password);
            if(res){
                console.log(res)
            }else{
                navigate("/testlogin")
            }
        },
    });

    return (
        <div>
            Login
            <form onSubmit={formik.handleSubmit}>
                <label>username</label>
                <input id="username" name="username" type="text" value={formik.values.username} onChange={formik.handleChange}/>
                <label>password</label>
                <input id="password" name="password" type="password" value={formik.values.password} onChange={formik.handleChange}/>
                <button type="submit">Submit</button>
            </form>
        </div>)
}
export default Login