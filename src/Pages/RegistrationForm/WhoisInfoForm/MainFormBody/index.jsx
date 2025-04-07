import React, { use, useEffect } from "react";
import "./index.css"
import TextField from '@mui/material/TextField';

import { useState } from "react";
import InputLabel from '@mui/material/InputLabel';

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import MenuItem from "@mui/material/MenuItem";
import { Box, FormHelperText, Select } from "@mui/material";
import { Button } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import * as Yup from "yup";
import { useFormikContext, Formik, Form, Field } from "formik";
import ErrorIcon from '@mui/icons-material/Error';
import InputAdornment from "@mui/material/InputAdornment";

const validationSchema = Yup.object({
    company: Yup.string().required("Company is required"),
    firstname: Yup.string().required("First Name is required"),
    lastname: Yup.string().required("Last name is required"),
    telephoneNumber: Yup.string().required("Telephone number is required"),
    faxNumber: Yup.string().required("Fax number is required"),
    email: Yup.string().email("Invalid email address").required("Email is required"),
    address1: Yup.string().required("Address 1 is required"),
    zipcode: Yup.string().required("Zip Code is required"),
    city: Yup.string().required("City is required"),
    state: Yup.string().required("State/Province is required"),
    country: Yup.string().required("Country is required"),
    contactType: Yup.string().required("Contact Type is required"),
    organizationType: Yup.string().required("Organization Type is required"),
    organizationRegistrationNumber: Yup.string().required("Organization Registration Number is required"),
    identificationNumber: Yup.string().required("Identification Number is required"),
    // organizationType: Yup.string().when('contactType', {
    //     is: 'Organization',
    //     then: Yup.string().required("Organization Type is required"),
    //     otherwise: Yup.string(),

    // }),
    // organizationRegistrationNumber: Yup.string().when('contactType', {
    //     is: 'Organization',
    //     then: Yup.string().required("Organization Registration Number is required"),
    //     otherwise: Yup.string(),

    // }),
    // identificationNumber: Yup.string().when('contactType', {
    //     is: 'Individual',
    //     then: Yup.string().required("Identification Number is required"),
    //     otherwise: Yup.string(),

    // }),
    organizationRegistrationNumber: Yup.string().required("Organization Registration Number is required")
})




function RowRadioButtons({ contacttype, defaultValue }) {
    const handleChange = (event) => {
        contacttype(event.target.value)
    };

    return (
        <FormControl>
            <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
                value={defaultValue}
                sx={{ marginTop: { xs: "-40px", sm: "-4px" } }}
            >
                <FormControlLabel sx={{
                    '& .MuiFormControlLabel-label': {
                        fontSize: '13px',
                    },
                }} onChange={handleChange} value="Organization" control={<Radio />} label="Organization" />
                <FormControlLabel
                    sx={{
                        '& .MuiFormControlLabel-label': {
                            fontSize: '13px',
                        },
                    }}
                    onChange={handleChange}
                    value="Individual" control={<Radio />} label="Individual" />

            </RadioGroup>
        </FormControl>
    );
}


export default function MainFormBody({ formType, formdata, onFormChange }) {
    const [contactype, setContactType] = useState("Organization")

    const ContactType = (val) => {
        setContactType(val)
        formdata.contactType = val;
        onFormChange(formType, formdata);

    }






    const handleFormChange = (name, value) => {
        const updatedFormData = { ...formdata, [name]: value };

        onFormChange(formType, updatedFormData);
    };

    
    const clearContact = (resetForm) => {
        const clearedFormData = {
          company: "",
          firstname: '',
          lastname: '',
          telephoneNumber: '',
          faxNumber: '',
          email: '',
          address1: '',
          address2: '',
          zipcode: '',
          city: '',
          state: '',
          country: '',
          contactType: contactype,
          organizationType: '',
          organizationRegistrationNumber: '',
        };
    
        // Update parent state
        onFormChange(formType, clearedFormData);
    
        // Reset Formik form
        resetForm();
      };
    // console.log("adafa",formdata)
    return (
        <div className="MainFormBody">

            <Formik

                initialValues={formdata}
                validationSchema={validationSchema}
            >
                {({ values, handleChange, handleBlur, setFieldValue, errors, touched, resetForm }) => (
                    <Form>

                        <div className="Header">
                            <Button onClick={() => clearContact(resetForm)}
 sx={{ color: "#fffff", backgroundColor: "#1F384C", fontSize: { xs: "9px", sm: "11px" } }} variant="contained" startIcon={<DeleteIcon />}>
                                Clear Contact
                            </Button>
                        </div>
                        <div className="MainFormHead">
                            <p>Contact Type</p>
                            <RowRadioButtons contacttype={ContactType} defaultValue={contactype} />
                        </div>
                        <div className="MainBody">
                            <div className="LeftCol">
                                <div className="InputFields">
                                    <Field
                                        as={TextField}
                                        name="company"
                                        id="outlined-basic"
                                        // className="InputField"
                                        label="Company"
                                        fullWidth
                                        variant="outlined"
                                        value={formdata.company}
                                        onChange={(e) => {
                                            handleChange(e);
                                            handleFormChange(e.target.name, e.target.value);
                                        }}
                                        error={Boolean(touched.company && errors.company)}

                                        sx={{
                                            "& .MuiInputBase-input::placeholder": {
                                                color: "red",
                                                opacity: 1,
                                                fontSize: "13px",
                                            },
                                        }}
                                    />

                                    {touched.company && errors.company && (
                                        <FormHelperText sx={{ fontSize: "12px" }} error>{errors.company}</FormHelperText>
                                    )}


                                </div>
                                <div className="InputFields">
                                    <Field
                                        as={TextField}
                                        name="firstname"
                                        className="InputField"
                                        fullWidth
                                        variant="outlined"
                                        value={formdata.firstname}
                                        label={"First Name"}
                                        onChange={(e) => {
                                            handleChange(e);
                                            handleFormChange(e.target.name, e.target.value);

                                        }}
                                        error={Boolean(touched.firstname && errors.firstname)}

                                        sx={{
                                            "& .MuiInputBase-input::placeholder": {
                                                color: "red",
                                                opacity: 1,
                                                fontSize: "13px",
                                            },
                                        }}
                                    />
                                    {touched.firstname && errors.firstname && (
                                        <FormHelperText sx={{ fontSize: "12px" }} error>{errors.firstname}</FormHelperText>
                                    )}
                                </div>
                                <div className="InputFields">
                                    <Field
                                        as={TextField}
                                        name="lastname"
                                        className="InputField"
                                        fullWidth
                                        label={"Last Name"}
                                        value={formdata.lastname}
                                        onChange={(e) => {
                                            handleChange(e);
                                            handleFormChange(e.target.name, e.target.value);

                                        }}
                                        variant="outlined"
                                        error={Boolean(touched.lastname && errors.lastname)}
                                        sx={{
                                            "& .MuiInputBase-input::placeholder": {
                                                color: "red",
                                                opacity: 1,
                                                fontSize: "13px",
                                            },


                                        }}
                                    />
                                    {touched.lastname && errors.lastname && (
                                        <FormHelperText sx={{ fontSize: "12px" }} error>{errors.lastname}</FormHelperText>
                                    )}
                                </div>

                                {/* telephoneNumber */}
                                <div className="InputFields">
                                    <div className="SelectDiv">
                                        <select>
                                            <option>afaf</option>
                                            <option>afaf</option>

                                        </select>
                                        <input
                                            className={"InputField"}
                                            name="telephoneNumber"
                                            onChange={(e) => {
                                                handleChange(e);
                                                handleFormChange(e.target.name, e.target.value);
                                            }}
                                            value={formdata.telephoneNumber}
                                        />

                                    </div>
                                </div>

                                {/* fax/ */}

                                <div className="InputFields">
                                    <div className="SelectDiv">
                                        <select>
                                            <option>afaf</option>
                                            <option>afaf</option>

                                        </select>
                                        <input onChange={(e) => {
                                            handleChange(e);
                                            handleFormChange(e.target.name, e.target.value);
                                        }}
                                            value={formdata.faxNumber} className={"InputField"} name="faxNumber" />
                                    </div>
                                </div>

                                <div className="InputFields">
                                    <Field
                                        as={TextField}
                                        name="email"
                                        className="InputField"
                                        fullWidth
                                        variant="outlined"
                                        value={formdata.email}

                                        label={"Email"}
                                        onChange={(e) => {
                                            handleChange(e);
                                            handleFormChange(e.target.name, e.target.value);

                                        }}
                                        error={Boolean(touched.email && errors.email)}

                                        sx={{
                                            "& .MuiInputBase-input::placeholder": {
                                                color: "red",
                                                opacity: 1,
                                                fontSize: "13px",
                                            },
                                        }}
                                    />
                                    {touched.email && errors.email && (
                                        <FormHelperText sx={{ fontSize: "12px" }} error>{errors.email}</FormHelperText>
                                    )}



                                </div>
                            </div>

                            <div className="RightCol">
                                <div className="InputFields">

                                    <Field
                                        as={TextField}
                                        name="address1"
                                        className="InputField"
                                        fullWidth

                                        label={"Address 1"}
                                        variant="outlined"
                                        value={formdata.address1}
                                        onChange={(e) => {
                                            handleChange(e);
                                            handleFormChange(e.target.name, e.target.value);

                                        }}
                                        error={Boolean(touched.address1 && errors.address1)}

                                        sx={{
                                            "& .MuiInputBase-input::placeholder": {
                                                color: "red",
                                                opacity: 1,
                                                fontSize: "13px",
                                            },
                                        }}
                                    />
                                    {touched.address1 && errors.address1 && (
                                        <FormHelperText sx={{ fontSize: "12px" }} error>{errors.address1}</FormHelperText>
                                    )}

                                </div>
                                <div className="InputFields">
                                    <Field
                                        as={TextField}
                                        name="address2"

                                        label={"Address 2"}
                                        className="InputField"
                                        fullWidth
                                        variant="outlined"
                                        value={formdata.address2}
                                        onChange={(e) => {
                                            handleChange(e);
                                            handleFormChange(e.target.name, e.target.value);

                                        }}
                                        error={Boolean(touched.address2 && errors.address2)}
                                        placeholder={touched.address2 && errors.address2 ? errors.address2 : ""}
                                        InputProps={{
                                            startAdornment: touched.address2 && errors.address2 ? (
                                                <InputAdornment position="start">
                                                    <ErrorIcon style={{ color: "red" }} />
                                                </InputAdornment>
                                            ) : null,
                                        }}
                                        sx={{
                                            "& .MuiInputBase-input::placeholder": {
                                                color: "red",
                                                opacity: 1,
                                                fontSize: "13px",
                                            },
                                        }}
                                    />
                                </div>
                                <div className="InputFields">
                                    <Field
                                        as={TextField}
                                        name="zipcode"
                                        className="InputField"
                                        fullWidth

                                        label={"Zip Code"}

                                        value={formdata.zipcode}
                                        onChange={(e) => {
                                            handleChange(e);
                                            handleFormChange(e.target.name, e.target.value);

                                        }}
                                        variant="outlined"
                                        error={Boolean(touched.zipcode && errors.zipcode)}

                                        sx={{
                                            "& .MuiInputBase-input::placeholder": {
                                                color: "red",
                                                opacity: 1,
                                                fontSize: "13px",
                                            },
                                        }}
                                    />
                                    {touched.zipcode && errors.zipcode && (
                                        <FormHelperText sx={{ fontSize: "12px" }} error>{errors.zipcode}</FormHelperText>
                                    )}
                                </div>
                                <div className="InputFields">
                                    <Field
                                        as={TextField}
                                        name="city"
                                        className="InputField"
                                        fullWidth

                                        label={"City"}
                                        value={formdata.city}
                                        onChange={(e) => {
                                            handleChange(e);
                                            handleFormChange(e.target.name, e.target.value);

                                        }}
                                        variant="outlined"
                                        error={Boolean(touched.city && errors.city)}

                                        sx={{
                                            "& .MuiInputBase-input::placeholder": {
                                                color: "red",
                                                opacity: 1,
                                                fontSize: "13px",
                                            },
                                        }}
                                    />
                                    {touched.city && errors.city && (
                                        <FormHelperText sx={{ fontSize: "12px" }} error>{errors.city}</FormHelperText>
                                    )}
                                </div>
                                <div className="InputFields">
                                    <Field
                                        as={TextField}
                                        name="state"
                                        className="InputField"
                                        fullWidth
                                        label={"State"}
                                        variant="outlined"
                                        value={formdata.state}
                                        onChange={(e) => {
                                            handleChange(e);
                                            handleFormChange(e.target.name, e.target.value);

                                        }}
                                        error={Boolean(touched.state && errors.state)}


                                    />
                                    {touched.state && errors.state && (
                                        <FormHelperText error sx={{ fontSize: "12px" }}>
                                            {errors.state}
                                        </FormHelperText>
                                    )}
                                </div>
                                <div className="InputFields">

                                    <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-helper-label">Country</InputLabel>

                                    <Field
                                        as={Select}
                                        name="country"
                                        label="Country"
                                        className="CountyDiv"
                                        value={formdata.country}
                                        fullWidth
                                        variant="outlined"

                                        
                                        onChange={(e) => {
                                            handleChange(e);
                                            handleFormChange(e.target.name, e.target.value);
                                        }}

                                        sx={{ color: "black" }}


                                    >
                                        <MenuItem value="please select" disabled>
                                            --Please select--
                                        </MenuItem>
                                        <MenuItem value="afaf">afaf</MenuItem>
                                        <MenuItem value="afaf">afaf</MenuItem>
                                        <MenuItem value="afaf">afaf</MenuItem>
                                        <MenuItem value="afaf">afaf</MenuItem>
                                    </Field>
                                    </FormControl>

                                    {touched.country && errors.country && (
                                        <FormHelperText error sx={{ fontSize: "12px" }}>
                                            {errors.country}
                                        </FormHelperText>
                                    )}
                                </div>



                            </div>
                        </div>


                        {
                            contactype === "Organization" ? (
                                <div className="GridTemp">
                                    <div className="LeftCol">
                                        <div className="InputFields">
                            <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-helper-label">Organization Type</InputLabel>

                                    <Field
                                        as={Select}
                                        name="organizationType"
                                        label="Organization Type"
                                        className="CountyDiv"
                                        value={formdata.organizationType}
                                        fullWidth
                                        variant="outlined"

                                        
                                        onChange={(e) => {
                                            handleChange(e);
                                            handleFormChange(e.target.name, e.target.value);
                                        }}

                                        sx={{ color: "black" }}


                                    >
                                        <MenuItem value="" disabled>
                                            --Please select--
                                        </MenuItem>
                                        <MenuItem value="afaf">afaf</MenuItem>
                                        <MenuItem value="afaf">afaf</MenuItem>
                                        <MenuItem value="afaf">afaf</MenuItem>
                                        <MenuItem value="afaf">afaf</MenuItem>
                                    </Field>
                                    </FormControl>
                                            {touched.organizationType && errors.organizationType && (
                                                <FormHelperText error sx={{ fontSize: { sm: "12px" } }}>

                                                    {errors.organizationType}</FormHelperText>
                                            )}
                                        </div>


                                    </div>
                                    <div className="RightCol">
                                        <div className="InputFields">
                                            <Field
                                                as={TextField}
                                                name="organizationRegistrationNumber"
                                                className="InputField"
                                                fullWidth
                                                label={"Organization Registration Number"}
                                                value={formdata.organizationRegistrationNumber}
                                                onChange={(e) => {
                                                    handleChange(e);
                                                    handleFormChange(e.target.name, e.target.value);

                                                }}
                                                variant="outlined"
                                                error={Boolean(touched.organizationRegistrationNumber && errors.organizationRegistrationNumber)}

                                                sx={{
                                                    "& .MuiInputBase-input::placeholder": {
                                                        color: "red",
                                                        opacity: 1,
                                                        fontSize: "13px",
                                                    },
                                                }}
                                            />
                                            {touched.organizationRegistrationNumber && errors.organizationRegistrationNumber && (
                                                <FormHelperText sx={{ fontSize: "12px" }} error>{errors.organizationRegistrationNumber}</FormHelperText>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ) : (<div className="GridTemp">
                                <div className="LeftCol">
                                    <div className="InputFields">
                                        <Field
                                            as={TextField}
                                            name="identificationNumber"
                                            className="InputField"
                                            fullWidth
                                            value={formdata.identificationNumber}
                                            onChange={(e) => {
                                                handleChange(e);
                                                handleFormChange(e.target.name, e.target.value);

                                            }}
                                            variant="outlined"
                                            error={Boolean(touched.identificationNumber && errors.identificationNumber)}

                                            sx={{
                                                "& .MuiInputBase-input::placeholder": {
                                                    color: "red",
                                                    opacity: 1,
                                                    fontSize: "13px",
                                                },
                                            }}
                                        />
                                        {touched.identificationNumber && errors.identificationNumber && (
                                            <FormHelperText sx={{ fontSize: "12px" }} error>{errors.identificationNumber}</FormHelperText>
                                        )}
                                    </div>


                                </div>
                                <div className="RightCol">

                                </div>
                            </div>)
                        }
                    </Form>
                )}

            </Formik>

        </div>

    )
}







