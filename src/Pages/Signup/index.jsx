import React from 'react';
import { TextField, Button, Typography, Container, Grid, Box } from '@mui/material';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import './index.css';
import { useNavigate } from 'react-router-dom';
import CryptoJS from 'crypto-js';
import apiInstance from '../ApiInstance';

const secretKey = 'my top secret';

const signupValidationSchema = Yup.object({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email address').required('Email is required'),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm Password is required'),
  role: Yup.string().required('Role is required'),
});

const SignupPage = () => {
  const navigate = useNavigate();

  const SignUp = async (values) => {
    try {
      // const jsonstring = JSON.stringify(values);
      // const encryptedData = CryptoJS.AES.encrypt(jsonstring, secretKey).toString();

      const response = await apiInstance.post('signup', { values });
      if(response.status === 201){
        navigate("/domain")
      }
      console.log(response.data);
    } catch (error) {
      console.log('Error:', error);
    }
  };

  return (
    <div className="FullScreen">
      <Grid container className="SignupContainer">
        {/* Left Side - Blue Section */}
        <Grid item xs={12} sm={6} className="LeftSide">
          <Box className="LeftContent">
            <Typography variant="h3" color="white" fontWeight="bold">
              Welcome!
            </Typography>
            <Typography variant="h6" color="white">
              Sign up to get started
            </Typography>
          </Box>
        </Grid>

        {/* Right Side - Form */}
        <Grid item xs={12} sm={6} className="RightSide1">
          <Container className="MainDiv" maxWidth="xs">
            <Box p={4} borderRadius={4}>
                          <Typography variant="h4" align="center" mb={3}>Sign Up</Typography>

              <Formik
                initialValues={{
                  name: '',
                  email: '',
                  password: '',
                  confirmPassword: '',
                  role: '',
                }}
                validationSchema={signupValidationSchema}
                onSubmit={(values) => {
                  SignUp(values);
                }}
              >
                {({ isSubmitting, touched, errors }) => (
                  <Form>
                    <Grid container direction="column" spacing={2}>
                      <Grid item>
                        <Field
                          as={TextField}
                          name="name"
                          label="Name"
                          fullWidth
                          variant="outlined"
                          helperText={touched.name && errors.name ? errors.name : ''}
                          error={touched.name && Boolean(errors.name)}
                        />
                      </Grid>
                      <Grid item>
                        <Field
                          as={TextField}
                          name="email"
                          label="Email"
                          fullWidth
                          variant="outlined"
                          helperText={touched.email && errors.email ? errors.email : ''}
                          error={touched.email && Boolean(errors.email)}
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
                          helperText={touched.password && errors.password ? errors.password : ''}
                          error={touched.password && Boolean(errors.password)}
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
                          helperText={touched.confirmPassword && errors.confirmPassword ? errors.confirmPassword : ''}
                          error={touched.confirmPassword && Boolean(errors.confirmPassword)}
                        />
                      </Grid>
                      <Grid item>
                        <Field
                          as={TextField}
                          name="role"
                          label="Role"
                          fullWidth
                          variant="outlined"
                          helperText={touched.role && errors.role ? errors.role : ''}
                          error={touched.role && Boolean(errors.role)}
                        />
                      </Grid>
                      <Grid sx={{ marginTop: '-10px' }} item>
                        <p>
                          Already have an account? |{' '}
                          <span
                            onClick={() => navigate('/')}
                            style={{ color: 'blue', cursor: 'pointer' }}
                          >
                            Sign in
                          </span>
                        </p>
                      </Grid>
                      <Grid item>
                        <Button
                          type="submit"
                          variant="contained"
                          color="primary"
                          fullWidth
                          disabled={isSubmitting}
                          sx={{
                            backgroundColor: '#2b2bc8',
                            color: 'white',
                            '&:hover': { backgroundColor: '#0a0a93' },
                          }}
                        >
                          Sign Up
                        </Button>
                      </Grid>
                    </Grid>
                  </Form>
                )}
              </Formik>
            </Box>
          </Container>
        </Grid>
      </Grid>
    </div>
  );
};

export default SignupPage;
