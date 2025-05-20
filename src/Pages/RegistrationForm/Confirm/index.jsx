import React from "react";
import "./index.css"
import { Grid, Paper, Typography } from "@mui/material";
import { useState } from "react";
import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';


const Formss = [
    "Registrant",
    "Admin",
    "Technical",
    "Billing"
]


function AccordionUsage({Data}) {

    // console.log("anasssssss",Data)

    const [activeForm, setActiveForm] = useState("Registrant");
    const [expanded, setExpanded] = useState(['panel1', 'panel2']); 

    const handleAccordionChange = (panel) => (event, isExpanded) => {
        setExpanded((prevExpanded) =>
            isExpanded
                ? [...prevExpanded, panel] 
                : prevExpanded.filter((p) => p !== panel) 
        );
    };



    const activeState = (elem) => {
        setActiveForm(elem)
    }

    const Dataform = ({originalData}) => {
        return (
            <div className="AccFormDiv">
                <div className="AccFormGrid">
                    {/* left column */}
                    <div>
                        <div className="form-data">
                            <Typography sx={{ fontSize: { xs: '12px', sm: '13px', md: '15px' }, fontWeight: "500", color: "gray" }}>Contact Handle</Typography>
                            <Typography sx={{ fontSize: { xs: '10px', sm: '12px', md: '13px' }, fontWeight: "600" }}>WNC971467T</Typography>
                        </div>
                        <div className="form-data">
                            <Typography sx={{ fontSize: { xs: '12px', sm: '13px', md: '15px' }, fontWeight: "500", color: "gray" }}>Company</Typography>
                            <Typography sx={{ fontSize: { xs: '10px', sm: '12px', md: '13px' }, fontWeight: "600" }}>{originalData.company}</Typography>
                        </div>
                        <div className="form-data">
                            <Typography sx={{ fontSize: { xs: '12px', sm: '13px', md: '15px' }, fontWeight: "500", color: "gray" }}>Full Name</Typography>
                            <Typography sx={{ fontSize: { xs: '10px', sm: '12px', md: '13px' }, fontWeight: "600" }}>{`${originalData.firstname} ${originalData.lastname}`}</Typography>
                        </div>
                        <div className="form-data">
                            <Typography sx={{ fontSize: { xs: '12px', sm: '13px', md: '15px' }, fontWeight: "500", color: "gray" }}>Address</Typography>
                            <Typography sx={{ fontSize: { xs: '10px', sm: '12px', md: '13px' }, fontWeight: "600" }}>{originalData.address1}</Typography>
                        </div>

                    </div>
                    {/* right co?l */}
                    <div>
                        <div className="form-data">
                            <Typography sx={{ fontSize: { xs: '12px', sm: '13px', md: '15px' }, fontWeight: "500", color: "gray" }}>City</Typography>
                            <Typography sx={{ fontSize: { xs: '10px', sm: '12px', md: '13px' }, fontWeight: "600" }}>{originalData.city}</Typography>
                        </div>
                        <div className="form-data">
                            <Typography sx={{ fontSize: { xs: '12px', sm: '13px', md: '15px' }, fontWeight: "500", color: "gray" }}>State / Province</Typography>
                            <Typography sx={{ fontSize: { xs: '10px', sm: '12px', md: '13px' }, fontWeight: "600" }}>{originalData.state}</Typography>
                        </div>
                        <div className="form-data">
                            <Typography sx={{ fontSize: { xs: '12px', sm: '13px', md: '15px' }, fontWeight: "500", color: "gray" }}>Zip Code</Typography>
                            <Typography sx={{ fontSize: { xs: '10px', sm: '12px', md: '13px' }, fontWeight: "600" }}>{originalData.zipcode}</Typography>
                        </div>
                        <div className="form-data">
                            <Typography sx={{ fontSize: { xs: '12px', sm: '13px', md: '15px' }, fontWeight: "500", color: "gray" }}>Country</Typography>
                            <Typography sx={{ fontSize: { xs: '10px', sm: '12px', md: '13px' }, fontWeight: "600" }}>{originalData.country}</Typography>
                        </div>

                    </div>
                </div>
            </div>
        )
    }

    return (
        <div>
            <Accordion defaultExpanded expanded={expanded.includes('panel1')}
                onChange={handleAccordionChange('panel1')}
                sx={{ marginBottom: "20px" }}>
                <AccordionSummary
                    sx={{
                        backgroundColor: "#eeee",
                        color: expanded === 'panel1' ? "red" : "black",
                    }}
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                >
                    <Typography component="span">Name Server</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <div className="Grid">
                        {/* {console.log("dadadad",Data)} */}
                        {
                        Data.nsList.map((x,i)=>(
                            <div className="GridListItem"><li><Typography>{x.nsUrl}</Typography></li></div>

                        ))
                        }
                    </div>
                </AccordionDetails>
            </Accordion>

            <Accordion defaultExpanded expanded={expanded.includes('panel2')}
                onChange={handleAccordionChange('panel2')}
            >
                <AccordionSummary
                    sx={{
                        backgroundColor: "#eeee",
                        color: expanded === 'panel2' ? "red" : "black",
                    }}
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2-content"
                    id="panel2-header"
                >
                    <Typography component="span">Whois Information</Typography>
                </AccordionSummary>
                <AccordionDetails>
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
                    {
                        activeForm === "Registrant" && (<Dataform originalData={Data?.Registrant}/>)
                    }
                    {
                        activeForm === "Admin" && (<Dataform originalData={Data?.Admin} />)
                    }
                    {
                        activeForm === "Technical" && (<Dataform originalData={Data?.Technical} />)
                    }
                    {
                        activeForm === "Billing" && (<Dataform originalData={Data?.Billing} />)
                    }
                </AccordionDetails>
            </Accordion>

        </div>
    );
}



const Confirm = ({formdata}) => {
    // console.log("abasasd",formdata)

    return (
        <>
            <div className="MainForm">
                <div className="table-container">
                    <table className="custom-table">
                        <thead>
                            <tr>
                                <th><Typography >Domain</Typography></th>
                                <th><Typography >Price</Typography></th>

                            </tr>
                        </thead>
                        <tbody >
                            <tr>
                                <td><Typography sx={{ fontSize: { xs: '12px', sm: '14px', md: '15px' } }} style={{ fontWeight: "600" }}>{formdata.domainName}</Typography></td>
                                <td><Typography sx={{ fontSize: { xs: '12px', sm: '14px', md: '15px' } }}>{`USD 5.00`}</Typography></td>
                            </tr>
                            <tr className="Row">
                                <td></td>
                                <td className="usdtd"><Typography sx={{ fontSize: { xs: '12px', sm: '14px', md: '15px' } }} style={{ color: "green", fontSize: "18px", fontWeight: "600" }}>{`USD 5.00`}</Typography></td>
                            </tr>
                        </tbody>
                    </table>

                    <AccordionUsage Data={formdata}/>

                </div>

            </div>
        </>

    )
}

export default Confirm;


