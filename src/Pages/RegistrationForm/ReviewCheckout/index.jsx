import React, { useEffect, useState } from "react";
import "./index.css"
import { Link, useParams } from "react-router-dom";
import ColorCheckboxes from "../../../Component/CheckBox";
import { Typography } from "@mui/material";
import Accordian from "../../../Component/Accordian";
const ReviewAndCheckout = ({buttonDisable,handleFormData}) => {
    const [checks,setChecks] = useState({
        registrationAgreementCheck:false,
        acceptedFAQ:false,
    })
    const [isChecked1, setIsChecked1] = useState(false);  
    const [isChecked2, setIsChecked2] = useState(false);
    const [data,setData] = useState("")
    const handleChecked1 = (checked) =>{
        setIsChecked1(checked);
        setChecks({
            ...checks,
            registrationAgreementCheck:checked
        })
    }
    const handleChecked2 = (checked) =>{
        setIsChecked2(checked);
        setChecks({
            ...checks,
            acceptedFAQ:checked
        })
    }


 

    const { domainName } = useParams();

    const TrimDomain = () => {
        let name = domainName.split(".");
        return name[0];

    }
    let CheckBox1 = (
        <Typography variant="body2">
            I have reviewed and accepted the <Link to="/registration" style={{ color: '#29a1f8', textDecoration: 'none' }}>
                Registration Agreement
            </Link> and <Link to="/domain-policies" style={{ color: '#29a1f8', textDecoration: 'none' }}>
                Domain Name Policies
            </Link>
        </Typography>
    )
    let CheckBox2 = (
        <Typography variant="body2">
            I have reviewed and accepted the FAQ for <Link style={{ color: '#29a1f8', textDecoration: 'none' }} to={"/com"}>.com</Link>.
        </Typography>
    );


    const [accordianData,setaccordianData] = useState("")

    const getAccordianData = (val)=>{
        setaccordianData(val)       
    }




    useEffect(() => {
        const newData = {...accordianData, ...checks, domainName, };
        if (JSON.stringify(newData) !== JSON.stringify(data)) {
          setData(newData);  
          handleFormData(newData); 
        }
    
        const isButtonDisabled = !(isChecked1 && isChecked2);
        buttonDisable(isButtonDisabled);
      }, [isChecked1, isChecked2, buttonDisable, checks, data, domainName,accordianData]); 
    


    return (
        <>
            <div className="MainForm">
                <div className="FormGrid">
                    <div className="FormLeftSide">
                        <Typography sx={{ color: "#1F384C", fontWeight: "600", pl: 1.5, mb: 3 }}>{`${domainName} (${TrimDomain()})`}</Typography>
                        <div className="CheckboxesDiv">
                        <ColorCheckboxes label={CheckBox1} onCheckboxChange={handleChecked1} />
                        <ColorCheckboxes label={CheckBox2} onCheckboxChange={handleChecked2} />

                        </div>

                    </div>
                    <div className="FormRightSide"><p>
                        <Accordian getAccordianData={getAccordianData} />
                    </p></div>

                </div>

            </div>
        </>

    )
}

export default ReviewAndCheckout;