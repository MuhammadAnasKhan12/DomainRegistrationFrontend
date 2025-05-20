import React, { useEffect, useState } from "react";
import "./index.css"
import { Box, Typography } from "@mui/material";
import PermanentDrawerLeft from "../../Component/Drawer";
import EnhancedTable from "./Table/index";
import apiInstance from "../ApiInstance";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function DomainList() {
    const [contactList,setcontactList] = useState('')
    const [details,setDetails] = useState("");
    const navigate  = useNavigate();
    const handleOpenDetailPage = (val)=>{
      setDetails(val)

      navigate("/contactDetails", { state: { details: val } });

    }

  


    const fetchDomainList = async()=>{
        try {
             const response = await apiInstance.post("get-contact-list");
             setcontactList(response.data);         
        } catch (error) {
            console.log("Error",error)
        }
    }

    useEffect(()=>{
        fetchDomainList()
    },[]);

    const handleDeleteDomain = async (selectedIds) => {
        try {
          await apiInstance.post('/delete-domain', { data: { ids: selectedIds } });
          if (response.status === 200) {
            window.location.reload();

          }
        } catch (error) {
          console.error("Error deleting domains", error);
        }
      };
      
      const handleUpdateDomain = async (updatedDomain) => {
        try {
          const response = await apiInstance.post(`/update-domains/${updatedDomain._id}`, updatedDomain);
            // setDomainList(response.data);   
            if (response.status === 200) {
                window.location.reload();

            }                   
            
        } catch (error) {
          console.error("Error updating domain", error);
        }
      };



    return (
        <>
        <Box sx={{ display: 'flex', minHeight: "100vh", maxHeight:"100%"  ,backgroundColor: "rgb(243, 245, 250)" }}>
          <PermanentDrawerLeft/>
                    <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 7 }}>
                        <Typography sx={{ fontWeight: "700", fontSize: '28px' }}>Registered Contacts</Typography>
                       
                        <EnhancedTable

                            domainList={contactList}                            
                            onDeleteDomain={handleDeleteDomain}
                            onUpdateDomain={handleUpdateDomain}
                            onOpenDetailPage={handleOpenDetailPage}
                            
                        />
                        
                        </Box>
        </Box>   
        </>
    );
}
export default DomainList;















// [{
//     company: "rapid",
//     firstname:
//     "anas",
//     lastname:
//     "khan",
//     telephoneNumber:
//     "1312412421",
//     faxNumber:
//     "1241212412",
//     email:
//     "anask@gmail.com",
//     address1:
//     "saddar",
//     address2:
//     "saddar",
//     zipcode:
//     "123123123",
//     city:
//     "Karachi",
//     state:
//     "Sindh",
//     country:
//     "afaf",
//     contactType:
//     "Organization",
//     organizationType:
//     "afaf",
//     organizationRegistrationNumber:
//     "123123123"
//     }]







// import React, { useEffect } from "react";
// import "./index.css"
// import { Box, Grid, Paper, Typography } from "@mui/material";
// import { useState } from "react";
// import Accordion from '@mui/material/Accordion';
// import AccordionActions from '@mui/material/AccordionActions';
// import AccordionSummary from '@mui/material/AccordionSummary';
// import AccordionDetails from '@mui/material/AccordionDetails';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// import Button from '@mui/material/Button';
// import PermanentDrawerLeft from "../../Component/Drawer";
// import apiInstance from "../ApiInstance";
// // import EnhancedTable from "./Table";
// // import FullDomainTable from "./Table";
// import EnhancedAccordionTable from "../ContactList/Table/index";
// const Formss = [
//     "Registrant",
//     "Admin",
//     "Technical",
//     "Billing"
// ]


// const Dataform = ({ originalData }) => {
//     return (
//       <div className="AccFormDiv">
//         <div className="AccFormGrid">
//           <div>
//             <div className="form-data">
//               <Typography sx={{ fontSize: { xs: '12px', sm: '13px', md: '15px' }, fontWeight: "500", color: "gray" }}>Contact Handle</Typography>
//               <Typography sx={{ fontSize: { xs: '10px', sm: '12px', md: '13px' }, fontWeight: "600" }}>WNC971467T</Typography>
//             </div>
//             <div className="form-data">
//               <Typography sx={{ fontSize: { xs: '12px', sm: '13px', md: '15px' }, fontWeight: "500", color: "gray" }}>Company</Typography>
//               <Typography sx={{ fontSize: { xs: '10px', sm: '12px', md: '13px' }, fontWeight: "600" }}>{originalData?.company}</Typography>
//             </div>
//             <div className="form-data">
//               <Typography sx={{ fontSize: { xs: '12px', sm: '13px', md: '15px' }, fontWeight: "500", color: "gray" }}>Full Name</Typography>
//               <Typography sx={{ fontSize: { xs: '10px', sm: '12px', md: '13px' }, fontWeight: "600" }}>
//                 {`${originalData?.firstname || ''} ${originalData?.lastname || ''}`}
//               </Typography>
//             </div>
//             <div className="form-data">
//               <Typography sx={{ fontSize: { xs: '12px', sm: '13px', md: '15px' }, fontWeight: "500", color: "gray" }}>Address</Typography>
//               <Typography sx={{ fontSize: { xs: '10px', sm: '12px', md: '13px' }, fontWeight: "600" }}>{originalData?.address1}</Typography>
//             </div>
//           </div>
//           <div>
//             <div className="form-data">
//               <Typography sx={{ fontSize: { xs: '12px', sm: '13px', md: '15px' }, fontWeight: "500", color: "gray" }}>City</Typography>
//               <Typography sx={{ fontSize: { xs: '10px', sm: '12px', md: '13px' }, fontWeight: "600" }}>{originalData?.city}</Typography>
//             </div>
//             <div className="form-data">
//               <Typography sx={{ fontSize: { xs: '12px', sm: '13px', md: '15px' }, fontWeight: "500", color: "gray" }}>State</Typography>
//               <Typography sx={{ fontSize: { xs: '10px', sm: '12px', md: '13px' }, fontWeight: "600" }}>{originalData?.state}</Typography>
//             </div>
//             <div className="form-data">
//               <Typography sx={{ fontSize: { xs: '12px', sm: '13px', md: '15px' }, fontWeight: "500", color: "gray" }}>Zip Code</Typography>
//               <Typography sx={{ fontSize: { xs: '10px', sm: '12px', md: '13px' }, fontWeight: "600" }}>{originalData?.zipcode}</Typography>
//             </div>
//             <div className="form-data">
//               <Typography sx={{ fontSize: { xs: '12px', sm: '13px', md: '15px' }, fontWeight: "500", color: "gray" }}>Country</Typography>
//               <Typography sx={{ fontSize: { xs: '10px', sm: '12px', md: '13px' }, fontWeight: "600" }}>{originalData?.country}</Typography>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   };
  

// function AccordionUsage({ Data }) {

//     // console.log("anasssssss",Data)

//     const [activeForm, setActiveForm] = useState("Registrant");
//     const [expanded, setExpanded] = useState(['panel1', 'panel2']);

//     const handleAccordionChange = (panel) => (event, isExpanded) => {
//         setExpanded((prevExpanded) =>
//             isExpanded
//                 ? [...prevExpanded, panel]
//                 : prevExpanded.filter((p) => p !== panel)
//         );
//     };



//     const activeState = (elem) => {
//         setActiveForm(elem)
//     }

 

//     return (
//         <div>


//             <Accordion defaultExpanded expanded={expanded.includes('panel2')}
//                 onChange={handleAccordionChange('panel2')}
//             >
//                 <AccordionSummary
//                     sx={{
//                         backgroundColor: "#eeee",
//                         color: expanded === 'panel2' ? "red" : "black",
//                     }}
//                     expandIcon={<ExpandMoreIcon />}
//                     aria-controls="panel2-content"
//                     id="panel2-header"
//                 >
//                     <Typography component="span">
//                         <strong>Domain Name:</strong> {Data.domainName}
//                     </Typography>
//                 </AccordionSummary>
//                 <AccordionDetails>
//                     <div className="FormHeader">
//                         {Formss.map((form, index) => (
//                             <li
//                                 key={index}
//                                 onClick={() => activeState(form)}
//                                 className={activeForm === form ? "ActiveLi" : "listitem"}
//                             >
//                                 {form}
//                             </li>
//                         ))}
//                     </div>
//                     {
//                         activeForm === "Registrant" && (<Dataform originalData={Data?.Registrant} />)
//                     }
//                     {
//                         activeForm === "Admin" && (<Dataform originalData={Data?.Admin} />)
//                     }
//                     {
//                         activeForm === "Technical" && (<Dataform originalData={Data?.Technical} />)
//                     }
//                     {
//                         activeForm === "Billing" && (<Dataform originalData={Data?.Billing} />)
//                     }
//                 </AccordionDetails>
//             </Accordion>

//         </div>
//     );
// }





// // const ContactList = () => {
// //     // console.log("abasasd",formdata)

// //     return (
// //         <>
// //             <div className="MainForm">
// //                 <div className="table-container">

// //                     <AccordionUsage Data={formdata}/>

// //                 </div>

// //             </div>
// //         </>

// //     )
// // }

// const ContactList = () => {
//  const [data,setData] = useState([]);
// const fetchList = async()=>{
//     try {
//         const response = await apiInstance.post("get-contact-information");
//         setData(response.data);
//     } catch (error) {
//         console.log("Error",error)
//     }
// }

// useEffect(()=>{
//     // fetchList();
// },[])
// console.log(data)

// const handleDeleteDomain = async (selectedIds) => {
//     try {
//       await apiInstance.post('/delete-domain', { data: { ids: selectedIds } });
//       if (response.status === 200) {
//         window.location.reload();

//       }
//     } catch (error) {
//       console.error("Error deleting domains", error);
//     }
//   };
  
//   const handleUpdateDomain = async (updatedDomain) => {
//     try {
//       const response = await apiInstance.post(`/update-domains/${updatedDomain._id}`, updatedDomain);
//         // setDomainList(response.data);   
//         if (response.status === 200) {
//             window.location.reload();

//         }                   
        
//     } catch (error) {
//       console.error("Error updating domain", error);
//     }
//   };
//     return (

//         <Box sx={{ display: 'flex', maxHeight: "100%",minHeight:"100vh",width:"100%",backgroundColor: "rgb(243, 245, 250)" }}>
//             <PermanentDrawerLeft />
//             <Box   sx={{ flexGrow: 1, p: 3, mt: 7 }}>
//                 <Typography sx={{ fontWeight: "700", fontSize: '28px' }}>Contact List</Typography>
//                 <div className="TableBox">
//                 <EnhancedAccordionTable
//                                         domainList={[{
//                                             "_id": "68024bc4d30ffe6772a1fc8a",
//                                             "userId": "67f8c40bbd985a5382c946ad",
//                                             "domainName": "domain121.com",
//                                             "WhoisPrivacy": false,
//                                             "registrationAgreementCheck": true,
//                                             "acceptedFAQ": true,
//                                             "nsList": [
//                                                 {
//                                                     "nsUrl": "acv.com",
//                                                     "_id": "68024bc4d30ffe6772a1fc8b"
//                                                 },
//                                                 {
//                                                     "nsUrl": "aacx.com",
//                                                     "_id": "68024bc4d30ffe6772a1fc8c"
//                                                 }
//                                             ],
//                                             "RegistrantId": "68024bb0d30ffe6772a1fc84",
//                                             "AdminId": "68024bb0d30ffe6772a1fc86",
//                                             "TechnicalId": "68024bb0d30ffe6772a1fc88",
//                                             "BillingId": "68024bb0d30ffe6772a1fc82",
//                                             "terms": "1 years",
//                                             "language": "4 Year(s)",
//                                             "__v": 0,
//                                             "Registrant": {
//                                                 "_id": "68024bb0d30ffe6772a1fc84",
//                                                 "company": "rapid",
//                                                 "firstname": "anas",
//                                                 "lastname": "khan",
//                                                 "telephoneNumber": "123123123",
//                                                 "faxNumber": "123123123",
//                                                 "email": "anask@gmail.com",
//                                                 "address1": "saddar",
//                                                 "address2": "saddar",
//                                                 "zipcode": "123123123",
//                                                 "city": "Karachi",
//                                                 "state": "Sindh",
//                                                 "country": "afaf",
//                                                 "contactType": "Organization",
//                                                 "organizationType": "afaf",
//                                                 "organizationRegistrationNumber": "123123123",
//                                                 "__v": 0
//                                             },
//                                             "Admin": {
//                                                 "_id": "68024bb0d30ffe6772a1fc86",
//                                                 "company": "rapid",
//                                                 "firstname": "anas",
//                                                 "lastname": "khan",
//                                                 "telephoneNumber": "12312313",
//                                                 "faxNumber": "12312313",
//                                                 "email": "anask@gmail.com",
//                                                 "address1": "saddar",
//                                                 "address2": "saddar",
//                                                 "zipcode": "123123123",
//                                                 "city": "karachi",
//                                                 "state": "sindh",
//                                                 "country": "afaf",
//                                                 "contactType": "Organization",
//                                                 "organizationType": "afaf",
//                                                 "organizationRegistrationNumber": "12312313",
//                                                 "__v": 0
//                                             },
//                                             "Technical": {
//                                                 "_id": "68024bb0d30ffe6772a1fc88",
//                                                 "company": "rapid",
//                                                 "firstname": "anas",
//                                                 "lastname": "khan",
//                                                 "telephoneNumber": "123132131",
//                                                 "faxNumber": "132123123",
//                                                 "email": "anask@gmail.com",
//                                                 "address1": "saddar",
//                                                 "address2": "saddar",
//                                                 "zipcode": "123123123",
//                                                 "city": "karachi",
//                                                 "state": "sindh",
//                                                 "country": "afaf",
//                                                 "contactType": "Organization",
//                                                 "organizationType": "afaf",
//                                                 "organizationRegistrationNumber": "1312313",
//                                                 "__v": 0
//                                             },
//                                             "Billing": {
//                                                 "_id": "68024bb0d30ffe6772a1fc82",
//                                                 "company": "rapid",
//                                                 "firstname": "anas",
//                                                 "lastname": "khan",
//                                                 "telephoneNumber": "3123123",
//                                                 "faxNumber": "1231313",
//                                                 "email": "anask@gmail.com",
//                                                 "address1": "saddar",
//                                                 "address2": "saddar",
//                                                 "zipcode": "1231231",
//                                                 "city": "karachi",
//                                                 "state": "sindh",
//                                                 "country": "afaf",
//                                                 "contactType": "Organization",
//                                                 "organizationType": "afaf",
//                                                 "organizationRegistrationNumber": "123123123",
//                                                 "__v": 0
//                                             }
//                                         }]}
//                                         onDeleteDomain={handleDeleteDomain}
//                                         onUpdateDomain={handleUpdateDomain}
//                                         />
//                     </div>           

//             </Box>
//         </Box>


//     )

// }

// export default ContactList;

