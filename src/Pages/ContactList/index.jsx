
import React, { useEffect, useState } from "react";
import { Box, Grid, Paper, Typography, TextField, Button } from "@mui/material";
import { useLocation } from "react-router-dom";
import PermanentDrawerLeft from "../../Component/Drawer";
import apiInstance from "../ApiInstance";

const ContactCard = ({ title, contactData, onUpdate, onDelete }) => {
    const [editable, setEditable] = useState(false);
    const [formData, setFormData] = useState(contactData);
    useEffect(() => {
        setFormData(contactData);
      }, [contactData]); 
    
    

    const handleChange = (key, value) => {
        setFormData({ ...formData, [key]: value });
    };
    console.log('formdata',formData)

    const handleSave = () => {
        onUpdate(formData);
        setEditable(false);
    };
    const displayKey = (val)=>{
        if(val ==="category"){
            return "Type"
        }
        else if(val==="company"){
            return "Company"
        }
        else if(val === "firstname"){
            return "First Name"
        }
        else if(val === "lastname"){
            return "Last Name"
        } else if(val === "telephoneNumber"){
            return "Telephone Number"
        } else if(val === "faxNumber"){
            return "Fax Number"
        } else if(val === "email"){
            return "Email"
        } else if(val === "address1"){
            return "Address"
        }
        else if(val === "address2"){
            return "Address"
        }else if(val === "zipcode"){
            return "Zip Code"
        }else if(val === "city"){
            return "City"
        }
        else if(val === "state"){
            return "State"
        }else if(val === "country"){
            return "Country"
        }else if(val === "contactType"){
            return "Contact Type"
        }
        else if(val === "organizationType"){
            return "Organization Type"
        }
        else if(val === "organizationRegistrationNumber"){
            return "Organization Registration Number"
        }else{
            return val
        }



    }

    return (
        <Paper sx={{ p: 2,  }}>
            <Typography variant="h6" sx={{ mb: 2, textDecoration:"underline"}}>{title}</Typography>
            <Grid container spacing={1}>
  {Object.entries(formData).map(([key, value]) => {
    if (["_id", "__v", "userId"].includes(key)) return null;

    return (
      <Grid item xs={12} key={key}>
        {editable ? (
          <TextField
            label={displayKey(key)}
            fullWidth
            value={value}
            onChange={(e) => handleChange(key, e.target.value)}
            size="small"
            sx={{ mb: 1.4 }}
          />
        ) : (
          <div className="Inputfield">
            <Typography variant="body2">
              <strong>{displayKey(key)}</strong>: {value}
            </Typography>
          </div>
        )}
      </Grid>
    );
  })}
</Grid>

            <Box mt={2} display="flex" justifyContent="space-between">
                <Button variant="outlined" color="error" onClick={onDelete}>Delete</Button>
                {editable ? (
                    <Button variant="contained" onClick={handleSave}>Save</Button>
                ) : (
                    <Button variant="contained" sx={{backgroundColor:"#1F384C"}} onClick={() => setEditable(true)}>Edit</Button>
                )}
            </Box>
        </Paper>
    );
};

const ContactListPage = () => {
    const [data, setData] = useState({});
    const location = useLocation();
    const { details } = location.state || {};
const [type,setType] = useState("")
    const fetchList = async () => {
        try {
            const response = await apiInstance.post("get-contact-detail", { contactid: details });
            setData(response.data);
            setType(response.data.category)
        } catch (error) {
            console.log("Error", error);
        }
    };
    console.log(data)

    useEffect(() => {
        fetchList();
    }, []);

    const handleUpdate = (type, updatedData) => {
        console.log("Update", type, updatedData);
        try {
            const response = apiInstance.post(`update-contact-information/${updatedData._id}`,{mainid:details,updatedData:updatedData,type:type});
            console.log("Anas",response.data)
        } catch (error) {
            console.log("error in updating",error)
        }
    };

    const handleDelete = (type) => {
        console.log("Delete", type);
    };

    return (
        <Box sx={{ display: 'flex', maxHeight: "100%", minHeight: "100vh",  backgroundColor: "rgb(243, 245, 250)" }}>
            <PermanentDrawerLeft />
            <Box sx={{ flexGrow: 1, p: 3, mt: 7 }}>
                <Typography sx={{ fontWeight: "700", fontSize: '28px', mb: 3 }}>Contact List</Typography>
                <Grid container spacing={2} className="DisplayBox">
                <ContactCard
                                    contactData={data}
                                    onUpdate={(updatedData) => handleUpdate(type, updatedData)}
                                    onDelete={() => handleDelete(type)}
                                />
                </Grid>
            </Box>
        </Box>
    );
};

export default ContactListPage;


                                        
                                        {/* <FullDomainTable domainList={[{
                                                "_id": "68024bc4d30ffe6772a1fc8a",
                                                "userId": "67f8c40bbd985a5382c946ad",
                                                "domainName": "domain121.com",
                                                "WhoisPrivacy": false,
                                                "registrationAgreementCheck": true,
                                                "acceptedFAQ": true,
                                                "nsList": [
                                                    {
                                                        "nsUrl": "acv.com",
                                                        "_id": "68024bc4d30ffe6772a1fc8b"
                                                    },
                                                    {
                                                        "nsUrl": "aacx.com",
                                                        "_id": "68024bc4d30ffe6772a1fc8c"
                                                    }
                                                ],
                                                "RegistrantId": "68024bb0d30ffe6772a1fc84",
                                                "AdminId": "68024bb0d30ffe6772a1fc86",
                                                "TechnicalId": "68024bb0d30ffe6772a1fc88",
                                                "BillingId": "68024bb0d30ffe6772a1fc82",
                                                "terms": "1 years",
                                                "language": "4 Year(s)",
                                                "__v": 0,
                                                "Registrant": {
                                                    "_id": "68024bb0d30ffe6772a1fc84",
                                                    "company": "rapid",
                                                    "firstname": "anas",
                                                    "lastname": "khan",
                                                    "telephoneNumber": "123123123",
                                                    "faxNumber": "123123123",
                                                    "email": "anask@gmail.com",
                                                    "address1": "saddar",
                                                    "address2": "saddar",
                                                    "zipcode": "123123123",
                                                    "city": "Karachi",
                                                    "state": "Sindh",
                                                    "country": "afaf",
                                                    "contactType": "Organization",
                                                    "organizationType": "afaf",
                                                    "organizationRegistrationNumber": "123123123",
                                                    "__v": 0
                                                },
                                                "Admin": {
                                                    "_id": "68024bb0d30ffe6772a1fc86",
                                                    "company": "rapid",
                                                    "firstname": "anas",
                                                    "lastname": "khan",
                                                    "telephoneNumber": "12312313",
                                                    "faxNumber": "12312313",
                                                    "email": "anask@gmail.com",
                                                    "address1": "saddar",
                                                    "address2": "saddar",
                                                    "zipcode": "123123123",
                                                    "city": "karachi",
                                                    "state": "sindh",
                                                    "country": "afaf",
                                                    "contactType": "Organization",
                                                    "organizationType": "afaf",
                                                    "organizationRegistrationNumber": "12312313",
                                                    "__v": 0
                                                },
                                                "Technical": {
                                                    "_id": "68024bb0d30ffe6772a1fc88",
                                                    "company": "rapid",
                                                    "firstname": "anas",
                                                    "lastname": "khan",
                                                    "telephoneNumber": "123132131",
                                                    "faxNumber": "132123123",
                                                    "email": "anask@gmail.com",
                                                    "address1": "saddar",
                                                    "address2": "saddar",
                                                    "zipcode": "123123123",
                                                    "city": "karachi",
                                                    "state": "sindh",
                                                    "country": "afaf",
                                                    "contactType": "Organization",
                                                    "organizationType": "afaf",
                                                    "organizationRegistrationNumber": "1312313",
                                                    "__v": 0
                                                },
                                                "Billing": {
                                                    "_id": "68024bb0d30ffe6772a1fc82",
                                                    "company": "rapid",
                                                    "firstname": "anas",
                                                    "lastname": "khan",
                                                    "telephoneNumber": "3123123",
                                                    "faxNumber": "1231313",
                                                    "email": "anask@gmail.com",
                                                    "address1": "saddar",
                                                    "address2": "saddar",
                                                    "zipcode": "1231231",
                                                    "city": "karachi",
                                                    "state": "sindh",
                                                    "country": "afaf",
                                                    "contactType": "Organization",
                                                    "organizationType": "afaf",
                                                    "organizationRegistrationNumber": "123123123",
                                                    "__v": 0
                                                }
                                            }]} /> */}

                    
                        {/* {data.map((item, i) => (
                            // <AccordionUsage key={i} Data={item} />
                            <>
                            </>
                        ))} */}


