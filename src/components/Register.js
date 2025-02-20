import { Button, CircularProgress, Stack, TextField } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { useSnackbar } from "notistack";
import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import { config } from "../App";
import Footer from "./Footer";
import Header from "./Header";

import "./Register.css";

const Register = () => {
  const { enqueueSnackbar } = useSnackbar();

 
  const [isLoading, setLoading] = useState(false);
  const [isSuccess, setSuccess] = useState(false);

  const [formData , setFormData] =useState({
    username: "",
    password: "",
    confirmPassword: ""
  })


  let history = useHistory();
  // TODO: CRIO_TASK_MODULE_REGISTER - Implement the register function
  /**
   * Definition for register handler
   * - Function to be called when the user clicks on the register button or submits the register form
   *
   * @param {{ username: string, password: string, confirmPassword: string }} formData
   *  Object with values of username, password and confirm password user entered to register
   *
   * API endpoint - "POST /auth/register"
   *
   * Example for successful response from backend for the API call:
   * HTTP 201
   * {
   *      "success": true,
   * }
   *
   * Example for failed response from backend for the API call:
   * HTTP 400
   * {
   *      "success": false,
   *      "message": "Username is already taken"
   * }
   */
//   const register = async (formData) => {
//     // console.log('entered',formData)
    
//     // console.log(url)
   
//     //   console.log(config.endpoint);
//     setLoading(true);
//  await axios.post(`${config.endpoint}/auth/register`, formData)
//  .then((response) => {
//   // console.log(response);

//   // const key = enqueueSnackbar("Registered successfully",{ variant: 'success' })
//    if(response.status === 201){
//     // alert("success");
//     setLoading(false)
//      const key = enqueueSnackbar("success",{ variant: 'success' });
//      setSuccess(true);
//      history.push("/login", {from:"Register"});
//      return true;

//     // {<Login />}
//    }

//   }).catch((error) => {
//   // console.error(error)
//   // console.log(error.response.status);
//   setLoading(false)
//   if(error.response.status === 400){
// // alert("its 400");
// // console.log(error.response.data.message)
// const key = enqueueSnackbar(error.response.data.message,{ variant: 'error' })
//   }

//   else{
//     const key = enqueueSnackbar("Something went wrong. Check that the backend is running, reachable and returns valid JSON." ,{ variant: 'error' })
//   }
//  });
 


   

// // console.log(jsonData);

//   };
const register = async (formData) => {
  if(validateInput(formData)){
  setLoading(true);
  try{
    await axios.post(`${config.endpoint}/auth/register`, {
      username: formData.username,
      password: formData.password
    });

    // if (response.status === 201) {
      setLoading(false)
      enqueueSnackbar("/successs/i", { variant: "success" }); 
    
      history.push("/login", { from: "Register" });
      
     }
     catch(e){
      console.log(e.response)
      if(e.response && e.response.data.message){
        enqueueSnackbar(e.response.data.message,{
          variant:"Warning"
        })
      }
      else{
      enqueueSnackbar("Something went wrong please try again aftersometime",{
        variant:"Warning"
      })
    }
    setLoading(false)
    }
  }

};








  // TODO: CRIO_TASK_MODULE_REGISTER - Implement user input validation logic
  /**
   * Validate the input values so that any bad or illegal values are not passed to the backend.
   *
   * @param {{ username: string, password: string, confirmPassword: string }} data
   *  Object with values of username, password and confirm password user entered to register
   *
   * @returns {boolean}
   *    Whether validation has passed or not
   *
   * Return false if any validation condition fails, otherwise return true.
   * (NOTE: The error messages to be shown for each of these cases, are given with them)
   * -    Check that username field is not an empty value - "Username is a required field"
   * -    Check that username field is not less than 6 characters in length - "Username must be at least 6 characters"
   * -    Check that password field is not an empty value - "Password is a required field"
   * -    Check that password field is not less than 6 characters in length - "Password must be at least 6 characters"
   * -    Check that confirmPassword field has the same value as password field - Passwords do not match
   */
  const validateInput = (data) => {
    console.log("validatedata")
    let isValidated =true;
    if(data.username == ""){
      const key = enqueueSnackbar('Username is a required field',{ variant: 'error' })
      
      isValidated =false;
      return false;
    }
    else if(data.username.length < 6){
      const key = enqueueSnackbar("Username must be at least 6 characters",{ variant: 'error' })
      isValidated =false;
      return false;
      
    }
    else if(data.password == ""){
      const key = enqueueSnackbar("Password is a required field",{ variant: 'error' })
      isValidated =false;
      return false;
    }
    else if(data.password.length < 6){
      const key = enqueueSnackbar("Password must be at least 6 characters",{ variant: 'error' })
      isValidated =false;
      return false;
      
    }
    else if(data.password != data.confirmPassword){

      const key = enqueueSnackbar("Passwords do not match",{ variant: 'error' })
      isValidated = false;
      return false;
    }
    else{
      console.log(isValidated)
      return isValidated
    }
     
    
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      minHeight="100vh"
    >
      <Header hasHiddenAuthButtons />
      <Box className="content">
        <Stack spacing={2} className="form">
          <h2 className="title">Register</h2>
          <TextField
          
            id="username"
            label="Username"
            variant="outlined"
            title="Username"
            name="username"
            placeholder="Enter Username"
            fullWidth
            value={formData.username}
            onChange={(e) => {
              // setUsername(e.target.value)
            setFormData({...formData , username: e.target.value})
            }}
          />
          <TextField
            id="password"
            variant="outlined"
            label="Password"
            name="password"
            type="password"
            helperText="Password must be atleast 6 characters length"
            fullWidth
            value={formData.password}
            placeholder="Enter a password with minimum 6 characters"
            onChange={(e) => {
              // setUsername(e.target.value)
            setFormData({...formData , password: e.target.value})
            }}
          />
          <TextField
            id="confirmPassword"
            variant="outlined"
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            fullWidth
            value={formData.confirmPassword}
            onChange={(e) => {
              // setUsername(e.target.value)
            setFormData({...formData , confirmPassword: e.target.value})
            }}
          />
           {isLoading ? <Box display="flex"
  justifyContent="center"
  alignItems="center"
   clone><CircularProgress color="inherit" size="30px" /></Box> :  <Button className="button" variant="contained" onClick={() => {;
          
          //  if(validateInput(formData)){
            register(formData);
            
          //  }
         
           }} >
            Register Now
           </Button>}
           
         
          <p className="secondary-action">
            Already have an account?{" "}
            <Link to = "/login" className="link">Login here</Link> 
              
            
          </p>
        </Stack>
      </Box>
      <Footer />
    </Box>
  );
};

export default Register;
