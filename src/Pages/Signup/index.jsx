import React, { useState } from 'react';
import { TextField, Button, Typography, Container, Grid, Box, colors } from '@mui/material';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import "./index.css"
import { useNavigate } from 'react-router-dom';
import CryptoJS from 'crypto-js';
const secretKey = "my top secret"
import axios from 'axios';
import apiInstance from '../ApiInstance';


const signupValidationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email('Invalid email address').required('Email is required'),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm Password is required'),
  role:Yup.string().required("Role is required")
});


const SignupPage = () => {

  const navigate = useNavigate()

                                                                                                                                            

  const SignUp = async (values) => {
    try {
      // const jsonstring = JSON.stringify(values);
      // const encryptedData = CryptoJS.AES.encrypt(jsonstring, secretKey).toString();
                                                                                                                                                  
      const response = await apiInstance.post('signup', { values });
      console.log(response.data);
    } catch (error) {
      console.log("Error:", error);
    }
  };


  return (
    <div className='FullScreen'>
      <Container className='MainDiv' maxWidth="xs">
        <Box  p={4}  borderRadius={4} >
          <Typography variant="h4" align="center" mb={3}>Sign Up</Typography>

          <Formik
            initialValues={{ name:'',email: '', password: '', confirmPassword: '',role:'' }}
            validationSchema={signupValidationSchema}
            onSubmit={(values) => {
              SignUp(values);
            }}
            
          >
            {({ isSubmitting }) => (
              <Form>
                <Grid container direction="column" spacing={2}>
                <Grid item>
                    <Field
                      as={TextField}
                      name="name"
                      label="Name"
                      fullWidth
                      variant="outlined"
                      helperText={<ErrorMessage name="name" />}
                      error={!!<ErrorMessage name="name" />}
                    />
                  </Grid>
                  <Grid item>
                    <Field
                      as={TextField}
                      name="email"
                      label="Email"
                      fullWidth
                      variant="outlined"
                      helperText={<ErrorMessage name="email" />}
                      error={!!<ErrorMessage name="email" />}
                    />
                  </Grid>
                  <Grid item>
                    <Field
                      as={TextField}
                      name="password"
                      label="Password"
                      type="password"
                      fullWidth
                      variant="outlined"
                      helperText={<ErrorMessage name="password" />}
                      error={!!<ErrorMessage name="password" />}
                    />
                  </Grid>
                  <Grid item>
                    <Field
                      as={TextField}
                      name="confirmPassword"
                      label="Confirm Password"
                      type="password"
                      fullWidth
                      variant="outlined"
                      helperText={<ErrorMessage name="confirmPassword" />}
                      error={!!<ErrorMessage name="confirmPassword" />}
                    />
                  </Grid>
                  <Grid item>
                    <Field
                      as={TextField}
                      name="role"
                      label="Role"
                      fullWidth
                      variant="outlined"
                      helperText={<ErrorMessage name="role" />}
                      error={!!<ErrorMessage name="role" />}
                    />
                  </Grid>
                  <Grid sx={{marginTop:"-20px"}} item >
                        <p>Already have an account? | <span onClick={()=>navigate("/")} style={{color:"blue",cursor:"pointer"}}>Sign in </span> </p>
                  </Grid>
                  <Grid item>
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      fullWidth
                      disabled={isSubmitting}
                      sx={{ backgroundColor: '#2b2bc8', color: 'white', '&:hover': { backgroundColor: "#0a0a93" } }}>

                      Sign Up
                    </Button>
                  </Grid>
                </Grid>
              </Form>
            )}
          </Formik>
        </Box>
      </Container>
    </div>

  );
};

export default SignupPage;
