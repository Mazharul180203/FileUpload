import React from 'react';
import {Link, useNavigate} from 'react-router-dom';
import axios from "axios";
import {BASE_URL} from "../../../config.js";
import {FailAlert, SuccessAlert} from "../../utility/AlertUtility.jsx";

const Login = () => {

    const navigate = useNavigate()
    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);// For demonstration
        const email = formData.get('email');
        const password = formData.get('password');
        let res = await axios.post(`${BASE_URL}/api/v1/VerifyLogin`,{email,password},{withCredentials:true})

        if(res.data['status'] === "success"){
            if(res.data['data'] === "Login Successfully") {
                let response = await SuccessAlert(res.data['data'])
                if (response) {
                    window.location.reload()
                }
            }
        }else if(res.data['status'] === "invalid"){
            await FailAlert(res.data['data'])
        }
    }

    return (
        <div className="login template d-flex justify-content-center align-items-center vh-100 bg-white">
            <div className="form_container p-5 border border-dark shadow rounded bg-white">
                <form onSubmit={handleSubmit}>
                    <h3 className="text-center">Sign In</h3>
                    <div className="mb-2">
                        <label>Email</label>
                        <input type="email" name="email" placeholder="Enter Email" className="form-control mt-1" required />
                    </div>
                    <div className="mb-2">
                        <label>Password</label>
                        <input type="password" name="password" placeholder="Enter Password" className="form-control mt-1" required />
                    </div>
                    <div>
                        <input type="checkbox" className="custom-control custom-checkbox" id="check" name="remember" />
                        <label htmlFor="check" className="custom-input-label ms-2">
                            Remember me
                        </label>
                    </div>
                    <div className="d-grid mt-2">
                        <button type="submit" className="btn btn-primary btn-block form-control mt-2">Login</button>
                    </div>
                    <Link to="/signup" type="button" className="btn btn-outline-primary btn-block form-control mt-2">SIGN UP</Link>
                </form>
            </div>
        </div>
    );
};

export default Login;