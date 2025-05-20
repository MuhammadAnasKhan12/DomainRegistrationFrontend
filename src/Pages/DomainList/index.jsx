import React, { useEffect, useState } from "react";
import "./index.css"
import { Box, Typography } from "@mui/material";
import PermanentDrawerLeft from "../../Component/Drawer";
import EnhancedTable from "../../Component/Table";
import apiInstance from "../ApiInstance";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function DomainList() {
    const [domainList,setDomainList] = useState('')
    const [details,setDetails] = useState("");
    const navigate  = useNavigate();
    const handleOpenDetailPage = (val)=>{
      setDetails(val)

      navigate("/contact-information", { state: { details: val } });

    }

  
    // console.log("details: " ,details)


    const fetchDomainList = async()=>{
        try {
             const response = await apiInstance.post("get-domain-list");
             setDomainList(response.data);         
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
                        <Typography sx={{ fontWeight: "700", fontSize: '28px' }}>Registered Domains</Typography>
                       
                        <EnhancedTable
                            domainList={domainList}
                            
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




  
