import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// Importing toastify module
// {ToastContainer,toast} from 'react-toastify';

// Import toastify css file
//import 'react-toastify/dist/ReactToastify.css';

// toast-configuration method,
// it is compulsory method.
//toast.configure()
import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "./style.css";
import SERVICES from "../../Services";
import apiCall, { getUserData } from "../../Helper.js";
//toast.configure();
let RegistrationForm = () => {
  const [isFoodChecked, setIsFoodChecked] = useState(false);
  const [isMovieChecked, setIsMovieChecked] = useState(false);
  const [countries, setCountry] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [allValues, setAllValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    country: "",
    state: "",
    city: "",
    role: "",
    food: "",
    movie: "",
  });
  const [id, setId] = useState({
    country_id: "",
    state_id: "",
  });


  //handle when input value changes
  
  let handleChange = (e) => {
    //console.log({ ...allValues });
    // console.log("target event", e.target.value);
    //console.log("target event check", e.target.checked);

    //  console.log({ [e.target.name]: e.target.value });
    //console.log(allValues.username);
    if (e.target.name === "food") setIsFoodChecked(!isFoodChecked);
    if (e.target.name === "movie") setIsMovieChecked(!isMovieChecked);
     setAllValues({ ...allValues, [e.target.name]: e.target.value });

     //select country id for state filter

    if (e.target.name === "country"){
     const selectedIndex = e.target.options.selectedIndex;
     const country_id= e.target.options[selectedIndex].getAttribute('data-key');
     setId({ ...id, country_id: country_id });
    }
      
    //select state id for city filter

    if (e.target.name === "state"){
      const selectedIndex = e.target.options.selectedIndex;
      const state_id= e.target.options[selectedIndex].getAttribute('data-key');
      setId({ ...id, state_id: state_id });
    } 
    //console.log(isChecked)
  };


  //handle form submit

  let handleSubmit = (e) => {
    e.preventDefault();
    //console.log({ ...allValues });
    //console.log(Object.entries({...allValues}));

    //submit user data on registration api
    if (validateField(allValues)) {
      let URL = SERVICES.REGISTER_API;
      let promise = apiCall(URL, allValues);
      // console.log(promise);
      promise
        .then((result) => {
          console.log(result);
          console.log(JSON.parse(result));
          let response = JSON.parse(result);
          // console.log(result);
          if (response) {
            if (response.status === "failed") {
              toast.success(response.msg, {
                position: toast.POSITION.TOP_CENTER,
              });
            }
            if (response.status === "success") {
              toast.success(response.msg, {
                position: toast.POSITION.TOP_CENTER,
              });

              //remove all value from the input fields

              // setAllValues({username: "",
              // email: "",
              // password: "",
              // confirmPassword: "",
              // country: "",
              // state: "",
              // city: "",
              // food: false,
              // movie: false,})
            }
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
    //console.log("submit");
    //toast.success('User Register Successfully..', { position: toast.POSITION.TOP_CENTER });
  };

 
  

  //form validation

  const validateField = ({
    username,
    email,
    password,
    confirmPassword,
    country,
    state,
    city,
    food,
    movie,
  }) => {
    if (!username) {
      toast.warning("User Name is mandatory.", {
        position: toast.POSITION.TOP_CENTER,
      });
      return false;
    }

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
        toast.warning("Password " + validpassword, {
          position: toast.POSITION.TOP_CENTER,
        });
        return false;
      }
    }

    // if(confirmPassword){
    //   let cpasswordValid = confirmPassword.length >= 6;
    //   let validcpassword = cpasswordValid ? '': ' is too short';
    //   toast.success('Confirm Password is '+validcpassword,{position: toast.POSITION.TOP_CENTER});
    // }
    if (password !== confirmPassword) {
      toast.warning("Password and confirm password is not matched!! ", {
        position: toast.POSITION.TOP_CENTER,
      });
      return false;
    }
    return true;
  };

  //get country
  useEffect(() => {
    let country_url = SERVICES.COUNTRY_LIST;
    getUserData(country_url)
      .then((data) => {
        //console.log(data)
        if (data.status == 200) {
          setCountry(data.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);



  //get state

  useEffect(() => {
    let state_url = SERVICES.STATE_LIST;
    const country_id = Number(id.country_id);
    getUserData(state_url)
      .then((response) => {
        if (response.status === 200) {
          let filterstate = response.data.state.filter((data, i) => {
            // console.log("gfgsf", country_id);
            let state = data.country_id === country_id ? data : "";
            return state;
          });
          setStates(filterstate);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  //get city

  useEffect(() => {
    let city_url = SERVICES.CITY_LIST;
    const state_id = Number(id.state_id);
    getUserData(city_url)
      .then((response) => {
        if (response.status === 200) {
          let filterCityList = response.data.city.filter((item) => {
            let data = item.state_id ===state_id  ? item : "";
            return data;
          });
          setCities(filterCityList);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);






  return (
    <div>
      <ToastContainer />
      <h1 className="text1">Registration</h1>
      <div className="container" id="form1">
        <Form>
          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label>User Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Name"
              value={allValues.username}
              onChange={handleChange}
              name="username"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={allValues.email}
              onChange={handleChange}
              name="email"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={allValues.password}
              onChange={handleChange}
              name="password"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm Password"
              value={allValues.confirmPassword}
              onChange={handleChange}
              name="confirmPassword"
            />
          </Form.Group>
          <Form.Select
            aria-label="Default select example"
            value={allValues.country}
            onChange={handleChange}
            name="country"
          >
            <option>Select Country</option>
            {countries.country ? (
              countries.country.map((item, i) => {
                return (
                  <option key={i} data-key={item.country_id} value={item.name}>
                    {item.name}
                  </option>
                );
              })
            ) : (
              <option>No Data</option>
            )}
          </Form.Select>
          <br />
          <Form.Select
            aria-label="Default select example"
            value={allValues.state}
            onChange={handleChange}
            name="state"
          >
            <option>Select State</option>
            {states.length > 0 ? (
              states.map((item, i) => {
                return (
                  <option key={i} data-key={item.state_id} value={item.name}>
                    {item.name}
                  </option>
                );
              })
            ) : (
              <option>No Data</option>
            )}
          </Form.Select>{" "}
          <br />
          <Form.Select
            aria-label="Default select example"
            value={allValues.city}
            onChange={handleChange}
            name="city"
          >
            <option>Select City</option>
            {cities.length > 0 ? (
              cities.map((item, i) => {
                return (
                  <option key={i} value={item.name}>
                    {item.name}
                  </option>
                );
              })
            ) : (
              <option>No Data</option>
            )}
          </Form.Select>
          <br />
          <Form.Select
            aria-label="Default select example"
            value={allValues.role}
            onChange={handleChange}
            name="role"
          >
            <option>Select Role</option>
            <option value="admin">Admin</option>
            <option value="user">User</option>
          </Form.Select>
          <br />
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check
              type="checkbox"
              label="Food" //{`Food-${isFoodChecked}`}
              value={!isFoodChecked ? "food" : ""}
              // value= {isFoodChecked ? '':'checked'}
              onChange={handleChange}
              name="food"
              checked={isFoodChecked}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check
              type="checkbox"
              label="Movie" //{`Movie-${isMovieChecked}`}
              value={!isMovieChecked ? "movie" : ""}
              onChange={handleChange}
              name="movie"
              checked={isMovieChecked}
              // {isMovieChecked ? '':'checked'}
            ></Form.Check>
          </Form.Group>
          <Button
            variant="primary"
            type="submit"
            id="registration-submit"
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </Form>
        {/* <div className="GeeksforGeeks">
            <button onClick={notify}>Click Me!</button>
            </div> */}

        <Link to="/">
          Already Registered<span> Login..</span>{" "}
        </Link>
      </div>
    </div>
  );
};

export default RegistrationForm;
