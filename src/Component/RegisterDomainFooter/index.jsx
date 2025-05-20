import { Box, Typography } from "@mui/material";
import "./index.css"
import { useCallback, useState } from "react";
import React from "react";
const RegisterDomainFooter = React.memo(({getDomainTermsLang})=>{
    const [data, setData] = useState({
        "terms":null,
        "language":null,
    });



    const HandleTermsChange = useCallback((name,val) => {
        setData(prev=>({
            ...prev,
            [name]:val
        }));
        getDomainTermsLang(data)
    }, [data.terms,data.language]);  

    const years = [
        "1 Year(s)",
        "2 Year(s)",
        "3 Year(s)",
        "4 Year(s)",
        "5 Year(s)",

    ]
     const language = [
        "English",
        "French",
        "Urdu",
        

    ]
    return (
        <>
            <Box className={"RegisterFooter"}  >
                <Typography sx={{ fontSize: { xs: "16px", sm: "18px", md: "19px" } }}>Register Domain </Typography>
                <Typography sx={{ fontSize: { sm: "12px", md: "15px" }, color: "red", fontWeight: "600", marginBottom: "10px" }}>{"domain name"}</Typography>
                <Box sx={{ display: 'flex', gap: "40px" }}>
                    <Box sx={{
                        display: "flex",
                        alignItems: "center",
                        flexDirection: { xs: "column", sm: "row" },
                        gap: 1,
                    }}
                    >
                        <Typography sx={{ fontSize: { xs: "12px", sm: "14px" } }}>{`Term(s): `}</Typography>
                        <select
                            style={{
                                marginLeft: "4px",
                            }}
                            className="FooterSelect"
                            defaultValue={"1 Year(s)"}
                            onChange={(e) => HandleTermsChange("terms",e.target.value)}
                        >
                            {years.map((year, i) => (
                                <option key={i}>{year}</option>
                            ))}
                        </select>
                    </Box>

                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            flexDirection: { xs: "column", sm: "row" },
                            gap: 1,
                        }}
                    ><Typography sx={{ fontSize: "14px" }}>{`Language: `}</Typography>
                        <select onChange={(e) => HandleTermsChange("language",e.target.value)} style={{  marginLeft: "4px" }} className="FooterSelect" defaultValue={"English"}>
                            {language.map((lang, i) => (
                                <option key={i}>{lang}</option>
                            ))}
                        </select>
                    </Box>
                </Box>
            </Box>
        </>
    )
})
export default RegisterDomainFooter;