import { TextField, Button, Typography, Container, Grid2, Box } from '@mui/material';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';     
import "./index.css";
import { useNavigate,Link } from 'react-router-dom';
import CryptoJS from 'crypto-js';
import apiInstance from "../ApiInstance";
const secretKey = "my top secret"
const loginValidationSchema = Yup.object({
  email: Yup.string().email('Invalid email address').required('Email is required'),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});
import { toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 
const LoginPage = () => {
  const navigate = useNavigate();

  
  const login = async(values)=>{
    try {
      const response = await apiInstance.post(`login`, values);
      const bytes = CryptoJS.AES.decrypt(response.data, secretKey);
      const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
      console.log("Decrypted Data: ", decryptedData);
  
      toast.success("Login Successfully");
      navigate("/domain");
  
    } catch (error) {
      if (error.response && error.response.status === 401) {
        toast.error("Invalid Credentials");
      } else {
        toast.error("Something went wrong. Please try again.");
        console.error("Login error:", error);
      }
    }
}


  return (
    <div className="FullScreen">
      <div className='LeftSidefs'>
        <Container className="MainDiv" maxWidth="xs">
          <Box p={4} borderRadius={4}>
            <Typography variant="h4" align="center" mb={3}>Login</Typography>
            
            <Formik
              initialValues={{ email: '', password: '' }}
              validationSchema={loginValidationSchema}
              onSubmit={(values) => {
                login(values)
              }}
            >
              {({ isSubmitting, touched, errors }) => (
                <Form>
                  <Grid2 container direction="column" spacing={2}>
                    {/* Email Field */}
                    <Grid2 item>
                      <Field
                        as={TextField}
                        name="email"
                        label="Email"
                        fullWidth
                        variant="outlined"
                        helperText={<ErrorMessage name="email" />}
                        error={touched.email && !!errors.email} 
                      />
                    </Grid2>

                    <Grid2 item>
                      <Field
                        as={TextField}
                        name="password"
                        label="Password"
                        type="password"
                        fullWidth
                        variant="outlined"
                        helperText={<ErrorMessage name="password" />}
                        error={touched.password && !!errors.password} 
                      />
                    </Grid2>

                    <Grid2 sx={{ marginTop: "-20px",mt:"1px" }} item>
<p>
  Don't have an account? | 
  <Link to="/signup" style={{ color: "blue" ,cursor:'pointer'}}>Sign Up</Link>
</p>
                    </Grid2>

                    <Grid2 item>
                      <Button 
                        type="submit"
                        variant="contained"
                        className="Button1"
                        fullWidth
                        disabled={isSubmitting}
                        sx={{ backgroundColor: '#2b2bc8', color: 'white', '&:hover': { backgroundColor: "#0a0a93" } }}>
                        Login

                      </Button>

                    </Grid2>

                  </Grid2>
                </Form>
              )}
            </Formik>
          </Box>
        </Container>
      </div>
      <div className='RightSide'>
                <Box className="LeftContent">
                  <Typography variant="h3" color="white" fontWeight="bold">
                    Welcome!
                  </Typography>
                  <Typography variant="h6" color="white">
                    Sign in to get started
                  </Typography>
                </Box>
      </div>
    </div>
  );
};

export default LoginPage;
