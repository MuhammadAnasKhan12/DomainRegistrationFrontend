import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import "./index.css"
import { useState } from 'react';
import { Button, colors, TextField } from '@mui/material';
import ControlledCheckbox from '../CheckBox';
// import RadioButtonsGroup from '../RadioGroup';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { useNavigate } from 'react-router-dom';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import { Field } from 'formik';
import CloseIcon from '@mui/icons-material/Close';

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';

function BasicSelect({ listitem ,handleRegistrantId}) {
    const [registrant,setregistrant] = useState("")
    const handleChange = (event) => {
        setregistrant(event.target.value)
        handleRegistrantId(event.target.value)
    };

    return (
        <Box sx={{ minWidth: "100%" }}>
            <FormControl fullWidth>
                <Select
                    value={registrant}
                    onChange={handleChange}
                    inputProps={{ 'aria-label': 'Without label' }}
                    displayEmpty
                >
                    <MenuItem value="" disabled>
                        -- Please select --
                    </MenuItem>
                    {listitem.map((item, i) => (
                        <MenuItem onChange={handleChange} value={item}>{item}</MenuItem>

                    ))}
                </Select>
            </FormControl>
        </Box>
    );
}


function RadioButtonsGroup({ handleRadioButton }) {
    const [selectedValue, setSelectedValue] = useState("Monthly");
    const [selectedWebnicNs,setselectedWebnicNs]=useState("")
    const handleChange = (event) => {
        setSelectedValue(event.target.value);
    };


    const handleDrawer = () => {
        handleRadioButton(true);
    };
    const  handleClick=(name,val)=>{
        setselectedWebnicNs({
            [name]:val
        })
    }
    console.log(selectedWebnicNs)

    return (
        <Box >
            <FormControl sx={{ width: "100%" }}>
                <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    name="radio-buttons-group"
                >
                    <Box>
                        <FormControlLabel
                            sx={{
                                color: 'gray',
                                fontSize: '13px',
                                '& .MuiFormControlLabel-label': {
                                    fontSize: '13px',
                                },
                            }}
                        
                            value="Basic "
                            control={<Radio sx={{ fontSize: '13px' }} />}
                            label="Basic NS"
                            onClick={(e)=>handleClick("BasicNs",true)}
                        />
                    </Box>
                    <Box>
                        <FormControlLabel
                            sx={{
                                color: 'gray',
                                fontSize: '13px',
                                '& .MuiFormControlLabel-label': {
                                    fontSize: '13px',
                                },
                            }}
                            value="Premium NS"
                            control={<Radio sx={{ fontSize: '13px' }} />}
                            label="Premium NS"
                            onClick={(e)=>handleClick("BasicNs",true)}

                        />

                    </Box>
                    <Box sx={{ display: "flex", width: "100%", alignItems: "center", justifyContent: "space-between", }}>
                       <Box>
                       <FormControlLabel
                            sx={{
                                color: 'gray',
                                fontSize: '13px',
                                '& .MuiFormControlLabel-label': {
                                    fontSize: '13px',
                                },
                            }}
                            value="Premium Single With Georoute"
                            control={<Radio sx={{ fontSize: '13px' }} />}
                            label="Premium Single With Georoute"

                        />
                       </Box>
                        <Box>
                            <Select
                                sx={{
                                    color: 'gray',
                                    fontSize: '13px',
                                    '& .MuiFormControlLabel-label': {
                                        fontSize: '13px',
                                        
                                    },
                                    width: "100%",

                                }}
                                value={selectedValue}
                                onChange={handleChange}
                                inputProps={{ 'aria-label': 'Without label' }}
                                displayEmpty
                            >

                                {["Monthly", "Annually"].map((item, i) => (
                                    <MenuItem sx={{
                                        color: 'gray',
                                        fontSize: '13px',
                                        '& .MuiFormControlLabel-label': {
                                            fontSize: '13px',
                                        },
                                    }} value={item} >
                                        {item}
                                    </MenuItem>
                                ))}


                            </Select>
                        </Box>
                    </Box>
                </RadioGroup>
            </FormControl>
        </Box>
    );
}



export default function Accordian({getAccordianData}) {
    const [expanded, setExpanded] = useState(['panel1', 'panel2']);
    const [activeNS, setactiveNS] = useState("Custom NS")
    const [nsList, setNsList] = useState([{ nsUrl: "" }]);

    const [accordianData,setaccordianData] = useState({
        "WhoisPrivacy":false,
        "RegistrantId":null,

    })

    const handleAccordionChange = (panel) => (event, isExpanded) => {
        setExpanded((prevExpanded) =>
            isExpanded
                ? [...prevExpanded, panel]
                : prevExpanded.filter((p) => p !== panel)
        );
    };

    const [open, setOpen] = React.useState(false);
    const [openPremiumNS, setopenPremiumNS] = React.useState(false);

    const [SubcribeNow, setSubcribeNow] = useState({
        term: "1 Month",
        autorenew: "Yes"
    })



    const handleSubcribeChange = (name, value) => {
        setSubcribeNow({ ...SubcribeNow, [name]: value });
    }
    // console.log(SubcribeNow)

    let CheckBox2 = (
        <Typography variant="body2">
            WHOIS Privacy Subscription
        </Typography>
    );
    const NSitems = [
        "Basic NS",
        "Premium NS",
        "Premium Single with Georoute"
    ]
    const AddNS = () => {
        setNsList([...nsList, { nsUrl: "" }]);
    }


    const handleDelete = (index) => {
        console.log(nsList)
        const newNsList = nsList.filter((x, i) => i != index)
        setNsList(newNsList)
        setaccordianData(prev=>(
            {
                ...prev,
                "nsList":nsList
            }
        ))
    };

    const handleNSInputChange = (index, event) => {
        const newNsList = [...nsList];
        newNsList[index].nsUrl = event.target.value;
        setNsList(newNsList)
      
    }





    const HandleInputWhoisChage = (x) => {
        setaccordianData(prev =>({
            ...prev,
            "WhoisPrivacy":x          
        })
        )        


    }
   
    
   
    


    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };
    const toggleDrawer2 = (open) => {
        setopenPremiumNS(open);
    };


    //calculate Total Price for Premium NS Partner Bundle
    const TotalPrice = () => {
        return SubcribeNow.term === "1 Month" ? "10.00" : "120.00";
    };


    const DrawerList = (
        <Box sx={{ width: 400, p: 3 }} role="presentation" >
            <Box sx={{ display: "flex", width: "100%", justifyContent: "space-between", alignItems: "center" }}>
                <Typography sx={{ color: "black", fontWeight: 600, fontSize: "18px" }}>Create Registrant Account</Typography>
                <CloseIcon onClick={toggleDrawer(false)} sx={{ cursor: "pointer" }} />
            </Box>
            <Box sx={{ mt: 4 }}>
                <Typography sx={{ color: "#989695", fontSize: "14px", }}>Username</Typography>
                <input placeholder="please enter username" className='usernameInputField' />

            </Box>
            <Box>
                <Typography sx={{ color: "#989695", fontSize: "14px", mt: "10px" }}>Password</Typography>
                <Typography sx={{ color: "#989695", fontSize: "14px", mt: "10px", lineHeight: "15px" }}>Password will be generated automatically by the system.</Typography>
                <Button variant="contained" sx={{ width: "100%", mt: 4, fontSize: "13px", backgroundColor: "#1F384C" }}>Craete Acount</Button>
            </Box>
        </Box>
    );

    const SubcribeNowDrawer = (
        <Box sx={{ width: 400, p: 2.7, mt: 2 }} role="presentation" >
            <Box sx={{ display: "flex", width: "100%", justifyContent: "space-between", alignItems: "center" }}>
                <Typography sx={{ color: "black", fontWeight: 600, fontSize: "18px" }}>Subscribe Now</Typography>
                <CloseIcon onClick={toggleDrawer(false)} sx={{ cursor: "pointer" }} />
            </Box>
            <Box sx={{ mt: 4, width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap" }}>
                <Box sx={{ width: "47%", height: "100%" }}>
                    <Typography sx={{ fontSize: "13px", fontWeight: 500 }}>Subscription Type</Typography>

                </Box>
                <Box sx={{ width: "47%", height: "100%" }}>
                    <Typography sx={{ fontSize: "13px", fontWeight: 500 }}>Premium NS Partner Bundle </Typography>

                </Box>

            </Box>
            {/* select term */}
            <Box
              
                sx={{  mt: 3,
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    flexWrap: "wrap",
                    gap: 2,}}
            >
                <Box
                    sx={{
                        width: { xs: "100%", sm: "47%" },

                        height: "100%",
                    }}
                >
                    <Typography sx={{ fontSize: "13px", fontWeight: 500 }}>Select Term</Typography>
                </Box>

                <Box
                    sx={{
                        width: { xs: "100%", sm: "47%" }, 
                        height: "100%",
                    }}
                >
                    <select
                        defaultValue={SubcribeNow.term}
                        onChange={(e) => handleSubcribeChange("term", e.target.value)}
                        value={SubcribeNow.term}
                        className='SelectwebnicNs'
                        style={{ width: "100%", padding: "8px", fontSize: "13px" }}
                    >
                        <option>1 Month</option>
                        <option>12 Month</option>
                    </select>
                </Box>
            </Box>

            {/* Auto Renew */}
            <Box sx={{ mt: 4, width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap" }}>
                <Box sx={{    width: { xs: "100%", sm: "47%" }, }}>
                    <Typography sx={{ fontSize: "13px", fontWeight: 500 }}>Auto Renew</Typography>

                </Box>
                <Box  sx={{ width: { xs: "100%", sm: "47%" } }}>
                    <select defaultValue={SubcribeNow.autorenew} onChange={(e) => handleSubcribeChange("autorenew", e.target.value)} value={SubcribeNow.autorenew} className='SelectwebnicNs'>

                        <option>Yes</option>
                        <option>NO</option>

                    </select>
                </Box>

            </Box>
            {/* total  */}
            <Box sx={{ mt: 4, width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap" }}>
                <Box sx={{ width: "47%", height: "100%" }}>
                    <Typography sx={{ fontSize: "15px", fontWeight: 600 }}>Total</Typography>

                </Box>
                <Box sx={{ width: "47%", height: "100%" }}>
                    <Typography sx={{ fontSize: "15px", fontWeight: 600 }}>{`USD ${TotalPrice()} `}</Typography>

                </Box>

            </Box>
            <Box sx={{ mt: 4, width: "100%" }}>
                <Button sx={{ width: "100%", backgroundColor: "#1F384C" }} variant="contained" >Suscribe Now </Button>

            </Box>

        </Box>
    )

    const handleRadioButton = (val) => {
        console.log(val)
        toggleDrawer2(val);
    }

    const  handleRegistrantId= (val)=>{
        setaccordianData(prev=>(
            {
                ...prev,
                "RegistrantId":val
            }
        ))
    }
    React.useEffect(()=>{
        setaccordianData(prev=>(
            {
                ...prev,
                "nsList":nsList
            }
        ))


        getAccordianData(accordianData)
        
    },[nsList,accordianData.RegistrantId,accordianData.WhoisPrivacy])
    

    return (

        <div>
            <div className='CheckBoxDiv'>
                <ControlledCheckbox label={CheckBox2} onCheckboxChange={HandleInputWhoisChage} />
            </div>
            <Accordion sx={{ marginBottom: '20px' }} defaultExpanded expanded={expanded.includes('panel1')} onChange={handleAccordionChange('panel1')}>
                <AccordionSummary

                    sx={{
                        backgroundColor: "#eeee",
                        color: expanded === 'panel1' ? "red" : "black",
                    }}
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2-content"
                    id="panel2-header"
                >
                    <Typography component="span">Name Server</Typography>
                </AccordionSummary>
                <div className='AccordianContent'>
                    <div className='NSBtns'>
                        {/* <Button variant='contained' sx={{backgroundColor:"#1F384C",fontSize:{xs:"10px",sm:"11px"},padding:{xs:"9px",sm:"5px"}}} onClick={() => setactiveNS("WebNIC NS")}>
                            WebNIC NS
                        </Button> */}
                        <Button variant="contained" sx={{backgroundColor:"#1F384C",fontSize:{xs:"10px",sm:"11px"},padding:{xs:"9px",sm:"5px"},px:{sm:"10px"}   }}  onClick={() => setactiveNS("Custom NS")} >
                            Custom NS
                        </Button>

                    </div>

                    {
                        activeNS === "WebNIC NS" ? (
                            <>
                                <Box sx={{ width: "100%" }} className='WebNICDiv'>
                                    <RadioButtonsGroup handleRadioButton={handleRadioButton} />
                                    <Drawer open={openPremiumNS} onClose={() => toggleDrawer2(false)}>
                                        {SubcribeNowDrawer}
                                    </Drawer>

                                </Box>
                            </>
                        ) : (
                            <>
                                <div className='CustomNS'>
                                    {nsList.map((item, index) => (
                                        <div key={index} className='nsinputdiv'>
                                            <input
                                                placeholder='ns.example.com'
                                                value={item.nsUrl}
                                                onChange={(event) => handleNSInputChange(index, event)}
                                            />
                                            <button onClick={() => handleDelete(index)}><DeleteIcon /></button>
                                        </div>
                                    ))}

                                    <button onClick={AddNS} className='AddNSBtn'><AddIcon /></button>
                                </div>
                            </>
                        )
                    }
                </div>
            </Accordion>
            <Accordion sx={{ marginBottom: '20px' }} defaultExpanded expanded={expanded.includes('panel2')} onChange={handleAccordionChange('panel2')}>
                <AccordionSummary
                    sx={{
                        backgroundColor: "#eeee",
                        color: expanded === 'panel2' ? "red" : "black",
                    }}
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2-content"
                    id="panel2-header"
                >
                    <Typography component="span">Registrant Account</Typography>
                </AccordionSummary>
                <div className='AccordianContent'>
                    <div className='RegistrantBtnDiv'>
                        <Button onClick={toggleDrawer(true)} sx={{ backgroundColor: "#1F384C", color: "white", width: "120px", fontSize:{xs:"10px",sm:"11px",md:"12px"},padding:{xs:"6px",sm:"6px",md:"5px"} }}>Create</Button>
                        <Drawer open={open} onClose={toggleDrawer(false)}>
                            {DrawerList}
                        </Drawer>
                    </div>
                    <div>
                        <Typography sx={{ color: '#1F384C', fontWeight: "550", color: "gray", fontSize: "13px", mt: 2, mb: 1 }}>User ID</Typography>
                        <BasicSelect handleRegistrantId={handleRegistrantId} listitem={["Demouser123", "Rapid123", "Testcustomer", "testuserdemo1"]} />

                    </div>
                </div>
            </Accordion>






        </div>
    );
}
