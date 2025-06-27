import React, { useState,useEffect, useRef } from "react";
import "./index.css"
import MainFormBody from "./MainFormBody";
import PropTypes from "prop-types";
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
          category:"Registrant",
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
          category:"Admin",

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
          category:"Technical",

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
          category:"Billing",
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
        {/* states of contact form */}
<div className="MainForm">
      <div className="FormHeader">
        {Formss.map((form, index) => (
          <li
            key={index+1}
          className="list"
  >
    <button             
    onClick={() => activeState(form)}
    className={activeForm === form ? "ActiveLi" : "listitem"}
>
            {form}

    </button>
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
WhoisInformation.propTypes={
  handleFormData:PropTypes.func.isRequired,
}

export  default WhoisInformation;





