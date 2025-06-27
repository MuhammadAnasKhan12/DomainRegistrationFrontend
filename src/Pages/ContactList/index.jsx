
import React, { useEffect, useState } from "react";
import { Box,Grid2 as Grid,  Paper, Typography, TextField, Button } from "@mui/material";
import { useLocation } from "react-router-dom";
import PermanentDrawerLeft from "../../Component/Drawer";
import apiInstance from "../ApiInstance";
import PropTypes from "prop-types";


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

    const displayKey=(val)=>{
        const keyMap ={
            category:"Type",
            company:"Company",
            firstname:"FirstName",
            lastname:"LastName" ,
            telephoneNumber:"Telephone Number",
            faxNumber:"Fax Number",
            email:"Email",
            address1:"Address",
            address2:"Address",
            zipcode:"Zip Code",
            city:"City",
            state:"State",
            country:"Country",
            contactType:"Contact Type",
            organizationType:"Organization Type",
            organizationRegistrationNumber:"Organization Registration Number"


        }
        return keyMap[val]||val;
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
ContactCard.propTypes={
    title: PropTypes.string,
    contactData: PropTypes.string,
    onUpdate: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired

}

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


                                        
             

