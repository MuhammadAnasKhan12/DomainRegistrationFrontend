import React, { useState,useEffect, useRef } from "react";
import "./index.css"
import MainFormBody from "./MainFormBody";
const WhoisInformation=({handleFormData})=>{
    const Formss= [
        "Registrant",
        "Admin",
        "Technical",
        "Billing"
    ]
    const [activeForm,setactiveForm] = useState("Registrant");

    const activeState= (elem)=>{
        setactiveForm(elem)

        
    }   
    
    

    const [FormData,setFormData] = useState({
        Registrant:{
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
          contactType: "Organization",
          organizationType: '',
          organizationRegistrationNumber: '',
      },
        Admin:{
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
          contactType: "Organization",
          organizationType: '',
          organizationRegistrationNumber: '',
      },
        Technical:{
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
          contactType: "Organization",
          organizationType: '',
          organizationRegistrationNumber: '',
      },
        Billing:{
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
          contactType: "Organization",
          organizationType: '',
          organizationRegistrationNumber: '',
      },
    })

    const handleFormChange = (formType, updatedData) => {
      setFormData((prevData) => ({
        ...prevData,
        [formType]: updatedData,
      }));
    };
    
// // Only update the parent if FormData has changed
// useEffect(() => {
//   const hasDataChanged = JSON.stringify(FormData) !== JSON.stringify(prevFormData);
  
//   if (hasDataChanged) {
//     handleFormData(FormData);  // Update the parent only when FormData has changed
//   }
// }, [FormData]); // Only run effect when FormData changes

      
    const prevFormDataRef = useRef();
    const prevFormData = prevFormDataRef.current; 
    useEffect(() => {
      if (JSON.stringify(FormData) !== JSON.stringify(prevFormData)) {
        handleFormData(FormData);  
      }
  
      prevFormDataRef.current = FormData; 
    }, [FormData, handleFormData]); 

   
    return(
        
        <>
<div className="MainForm">
      <div className="FormHeader">
        {Formss.map((form, index) => (
          <li
            key={index}
            onClick={() => activeState(form)}
            className={activeForm === form ? "ActiveLi" : "listitem"}
          >
            {form}
          </li>
        ))}
      </div>
      {activeForm === "Registrant" && (
        <MainFormBody
          formType={activeForm}
          formdata={FormData[activeForm]}
          onFormChange={handleFormChange}

        />
      )}
      {activeForm === "Admin" && (
        <MainFormBody
        formType={activeForm}
        formdata={FormData[activeForm]}
        onFormChange={handleFormChange}
        />
      )}
      {activeForm === "Technical" && (
        <MainFormBody
        formType={activeForm}
        formdata={FormData[activeForm]}
        onFormChange={handleFormChange}
        />
      )}
      {activeForm === "Billing" && (
        <MainFormBody
        formType={activeForm}
        formdata={FormData[activeForm]}
        onFormChange={handleFormChange}
        />
      )}
    </div>
        </>

    )
}

export  default WhoisInformation;








// import React, { useState } from "react";
// import RegistrantForm from "./Registrantform";
// import MainFormBody from "./MainFormBody";
// import { Button } from "@mui/material"; 
// import DeleteIcon from "@mui/icons-material/Delete";

// const WhoisInformation = () => {
//   const Formss = ["Registrant", "Admin", "Technical", "Billing"];
//   const [activeForm, setActiveForm] = useState("Registrant");
//   const [formData, setFormData] = useState({
//     Registrant: {},
//     Admin: {},
//     Technical: {},
//     Billing: {},
//   });

//   const handleFormChange = (formType, newData) => {
//     setFormData((prevData) => ({
//       ...prevData,
//       [formType]: newData,
//     }));
//   };

//   const activeState = (formType) => {
//     setActiveForm(formType);
//   };

//   return (
    // <div className="MainForm">
    //   <div className="FormHeader">
    //     {Formss.map((form, index) => (
    //       <li
    //         key={index}
    //         onClick={() => activeState(form)}
    //         className={activeForm === form ? "ActiveLi" : "listitem"}
    //       >
    //         {form}
    //       </li>
    //     ))}
    //   </div>
    //   {activeForm === "Registrant" && (
    //     <MainFormBody
    //       formType="Registrant"
    //       initialData={formData.Registrant}
    //       onFormChange={handleFormChange}
    //     />
    //   )}
    //   {activeForm === "Admin" && (
    //     <MainFormBody
    //       formType="Admin"
    //       initialData={formData.Admin}
    //       onFormChange={handleFormChange}
    //     />
    //   )}
    //   {activeForm === "Technical" && (
    //     <MainFormBody
    //       formType="Technical"
    //       initialData={formData.Technical}
    //       onFormChange={handleFormChange}
    //     />
    //   )}
    //   {activeForm === "Billing" && (
    //     <MainFormBody
    //       formType="Billing"
    //       initialData={formData.Billing}
    //       onFormChange={handleFormChange}
    //     />
    //   )}
    // </div>
//   );
// };

// export default WhoisInformation;





