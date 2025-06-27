import React, { useEffect, useState } from "react";
import "./index.css"
import { Box, Typography } from "@mui/material";
import PermanentDrawerLeft from "../../Component/Drawer";
import EnhancedTable from "./Table/index";
import apiInstance from "../ApiInstance";
import { useNavigate } from "react-router-dom";
function DomainList() {
    const [contactList,setcontactList] = useState('')
    const navigate  = useNavigate();
    const handleOpenDetailPage = (val)=>{

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
            if (response.status === 200) {
                window.location.reload();

            }                   
            
        } catch (error) {
          console.error("Error updating domain", error);
        }
      };



    return (
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
        
    );
}
export default DomainList;













