import { useCallback, useEffect ,useState} from "react";
import { Box, Button, Typography } from "@mui/material";
import PermanentDrawerLeft from "../../Component/Drawer";
import "./index.css"
import HorizontalStepper from "../../Component/Stepper";
import ReviewAndCheckout from "./ReviewCheckout";
import WhoisInformation from "./WhoisInfoForm";
import Confirm from "./Confirm";
import RegisterDomainFooter from "../../Component/RegisterDomainFooter";
import { toast, ToastContainer } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 
import apiInstance from "../ApiInstance";
import { useNavigate } from "react-router-dom";

const DomainRegistrationForm = () => {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const steps = [
    'Review & Checkout',
    'WHOIS Information',
    'Confirm',
  ];

  const [btndisable, setbtndisable] = useState(true);
  const [formData, setFormData] = useState({});
  const [footerData, setFooterData] = useState("");
  const buttonDisable1 = (x) => {
    setbtndisable(x);
  }
const [completeDomainData, setCompleteDomainData] = useState(null);

  const getDomainTermsLang = (val) => {
    setFooterData(val);
  }

  useEffect(() => {
    setFormData((prevData) => ({
      ...prevData,
      ...footerData,
    }));
  }, [footerData]);

  const handleFormData = useCallback((data) => {
    setFormData((prevData) => ({
      ...prevData,
      ...data,
    }));
  }, []);

  const validateFormData = (requiredFields) => {
  
console.log(formData)
console.log(footerData)
console.log(completeDomainData)

    for (let field of requiredFields) {
      if (!formData[field] || Object.values(formData[field]).some(value => value === null || value === undefined || value === "")) {
              
        if (field === "nsList" && (!formData[field] || formData[field].length === 0)) {
          toast.error(`Please add at least one Name Server`);
        } else if (field === "RegistrantId" && !formData[field]) {
          toast.error(`Please select RegistrantId`);
        } else if (field === "terms" && !formData[field]) {
          toast.error(`Please select terms from the bottom`);
        } else if (field === "language" && !formData[field]) {
          toast.error(`Please select language from the bottom`);
        } else {
          toast.error(`Please fill in all the fields for ${field}`);
        }


        return false;
      }
    }
    return true;
  }

  const  getFormData  = async() => {

    if(activeStep ===0){
      let list = ["nsList","RegistrantId"]
      const isValid = validateFormData(list);
      if (isValid) {
        handleNext();
      }
    }else if(activeStep===1){
      let list = [
        "Registrant",
        "Admin",
        "Technical",
        "Billing",
      ]
      const isValid = validateFormData(list);
      if (isValid) {
        try {
          const [registrantResponse,adminResponse,technicalResponse,billingResponse] =await Promise.all(
            [
              apiInstance.post('registerDomainFormFields', { form:formData["Registrant"] }),
              apiInstance.post('registerDomainFormFields', { form:formData["Admin"] }),
              apiInstance.post('registerDomainFormFields', { form:formData["Technical"] }),
              apiInstance.post('registerDomainFormFields', { form:formData["Billing"] }),

            ]
          )

          setFormData((prevData) => ({
            ...prevData,
            RegistrantId: registrantResponse.data.id,
            AdminId: adminResponse.data.id,
            TechnicalId: technicalResponse.data.id,
            BillingId: billingResponse.data.id,
          }));
        
          handleNext();
        } catch (error) {
            console.log("Error in posting fields data",error)
        }
      }
    } else {
      let list = ["terms", "language"];
      const isValid = validateFormData(list);
    
      if (isValid) {
        const finalDomainData = {
          RegistrantId: formData["RegistrantId"],
          AdminId: formData["AdminId"],
          TechnicalId: formData["TechnicalId"],
          BillingId: formData["BillingId"], 
          domainName: formData["domainName"],
          WhoisPrivacy: formData["WhoisPrivacy"],
          registrationAgreementCheck: formData["registrationAgreementCheck"],
          acceptedFAQ: formData["acceptedFAQ"],
          nsList: formData["nsList"],
          terms: formData["terms"],
          language: formData["language"]
        };
    
        setCompleteDomainData(finalDomainData); 
    
        try {
          const domainRes = await apiInstance.post("registerDomain", { form: finalDomainData });
          console.log("Response after completing whole form:", domainRes);
        } catch (error) {
          console.log("Error in submitting the full domain form", error);
        }
        toast.success("Login Successfully");
        navigate("/domainList")
        handleNext();
      }
    }

    
  }

  const handleNext = () => {
    if(activeStep <3 ){

      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }else{
      setActiveStep(2)
    }
  };


  

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  const renderStepContent = () => {
  switch (activeStep) {
    case 0:
      return <ReviewAndCheckout handleFormData={handleFormData} buttonDisable={buttonDisable1} />;
    case 1:
      return <WhoisInformation handleFormData={handleFormData} />;
    default:
      return <Confirm formdata={formData} />;
  }
};

  

  return (
    <Box sx={{ display: 'flex', height  : "100%", minHeight: { sx: "100vh", sm: "100%" }, backgroundColor: "rgb(243, 245, 250)", position: "relative" }}>
      <PermanentDrawerLeft />
      <Box className="mainbody" component="main" sx={{ flexGrow: 1, px:5, mt: 7, height: "100%" }}>
        <Typography sx={{ color: "#1F384C", fontWeight: "700", fontSize: {xs:"22px",sm:'28px'} }}>Domain Registration</Typography>

        <div className="FormContainer">
          <HorizontalStepper activeStep={activeStep} steps={steps} />

          <div className="borderBtmDiv">
            <div className="borderbottom"></div>
            {/* form registration pages  */}
          </div>
        
          {renderStepContent()}
          

          <Box sx={{ display: 'flex', justifyContent: 'center', gap: '10px', mt: 4, mb: 4 }}>
            <Button
              color="primary"
              onClick={handleBack}
              disabled={activeStep === 0}
              variant="contained"
            >
              Back
            </Button>
            {
              activeStep < 2 ? (
           
                <Button
                      variant="contained"
                      color="primary"
                      sx={{ backgroundColor: "#1F384C", color: "white" }}
                      onClick={getFormData } 
                      disabled={btndisable || activeStep === steps.length - 1}
                      >
                      Next
                </Button>
                
                
              ) : (
                <Button
                variant="contained"
                color="primary"
                sx={{ backgroundColor: "#1F384C", color: "white" }}
                onClick={activeStep === 2 ?  getFormData  : handleNext}
              >
                Submit
              </Button>
              )
            }
          </Box>
        </div>
        <RegisterDomainFooter getDomainTermsLang={getDomainTermsLang} />

      </Box>
      <ToastContainer /> 
    </Box>
  );
}

export default DomainRegistrationForm;
