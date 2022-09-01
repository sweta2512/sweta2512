import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "../registration/style.css";
import {  Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React, { useState } from "react";
import callApi from '../../Helper';
import SERVICES from '../../Services';
import { useDispatch, useSelector } from "react-redux";
import { getLogin } from '../../Redux/actioncreator/action';



const Login = () => {
    const [values, setValues] = useState({
        email: '',
        password: ''
    })
    


    //handle input value change
    let dispatch = useDispatch();
    let isLoggedin = useSelector((state) => { return state.AuthReducer.isAuthenticated });
    console.log('loginnnnnnn',isLoggedin);
    let user =useSelector((state) => { return state.AuthReducer.user});
    console.log('loginnnnnnn',user);
    // const history = useHistory();
    // console.log(history)
    const navigate = useNavigate();
    //console.log(navigate);

    let handleChange = (e) => {
        // console.log(values)
        setValues({ ...values, [e.target.name]: e.target.value });
    }

    //login Handler
    let handleInput = (e) => {
        e.preventDefault();
        if (validateData(values)) {
            let URL = SERVICES.LOGIN_API;
            let promise = callApi(URL, values)
            // console.log(promise);
            promise.then((result) => {
                console.log(result);
                let response = JSON.parse(result);
                if (response) {
                    if (response.status === 404) {
                        toast.success(response.msg, {
                            position: toast.POSITION.TOP_CENTER,
                        });
                    }
                    if (response.status === 200) {

                        localStorage.setItem("user", JSON.stringify(response.user));
                        localStorage.setItem("role", JSON.stringify(response.role));
                        dispatch(getLogin());
                        //history.push("/");
                        // toast.success(response.msg, {
                        //     position: toast.POSITION.TOP_CENTER,
                        // });
                        navigate('/home');
                    }
                }
            }).catch((error) => {
                console.log(error);
            })
        }

    }

    //validation
    let validateData = ({ email, password }) => {
        if (!email) {
            toast.warning("Email is mandatory.", {
                position: toast.POSITION.TOP_CENTER,
            });
            return false;
        } else {
            let emailValid = email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
            if (!emailValid) {
                let fieldValidationErrors = emailValid ? "" : " is invalid";
                toast.warning("Email " + fieldValidationErrors, {
                    position: toast.POSITION.TOP_CENTER,
                });
                return false;
            }
        }
        if (!password) {
            toast.warning("Password is mandatory.", {
                position: toast.POSITION.TOP_CENTER,
            });
            return false;
        } else {
            let passwordValid = password.length >= 6;
            if (!passwordValid) {
                let validpassword = passwordValid ? "" : " is too short";
                toast.warning("Password is " + validpassword, {
                    position: toast.POSITION.TOP_CENTER,
                });
                return false;
            }
        }
        return true;
    }

    // if (!isLoggedin) {
    //      <Navigate to="/login" />;
    // } else {
    //      //<Navigate to="/login" />;
    // }
    return (
        <div>
            <ToastContainer />
            <h1 className="text1">Login</h1>
            <div className="container" id="form1">
                <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Enter email"
                            value={values.email}
                            onChange={handleChange}
                            name="email"
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Password"
                            value={values.password}
                            onChange={handleChange}
                            name="password"
                        />
                    </Form.Group>
                    <Button
                        variant="primary"
                        type="submit"
                        id="registration-submit"
                        onClick={handleInput}
                    >
                        Submit
                    </Button>
                </Form>
                {/* <div className="GeeksforGeeks">
            <button onClick={notify}>Click Me!</button>
            </div> */}
                <Link to="/register">New User Register Here.. </Link>
            </div>
        </div>
    )
}

export default Login;