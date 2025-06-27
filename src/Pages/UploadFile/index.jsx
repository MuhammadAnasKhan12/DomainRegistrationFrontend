import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./index.css"
import { Box,Typography } from '@mui/material';
import PermanentDrawerLeft from '../../Component/Drawer';
const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [uploaded, setUploaded] = useState(null);

  const onChange = (e) => setFile(e.target.files[0]);


  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await axios.post('http://localhost:3000/api/upload', formData);
      setUploaded(res.data);
    } catch (err) {
      console.error(err);
    }
  };
  const [fetchedFiles,setFetchedFiles]= useState(null);

  const fetchFiles = async()=>{
    try {
    const response = await axios.post("http://localhost:3000/api/get-files");
    setFetchedFiles(response.data);
            
    } catch (error) {
        console.log("Error in getting files from database",error)
    }

  }
  useEffect(()=>{
    fetchFiles();
  },[])

console.log(fetchedFiles)
  
  return (

      <Box sx={{ display: 'flex', height: "100vh", backgroundColor: "rgb(243, 245, 250)" }}>
      <PermanentDrawerLeft />
      <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 7 }}>

        <Typography sx={{ color: "#1F384C", fontWeight: "700", fontSize: {xs:"22px",sm:'28px'} }}>Domain Registration</Typography>
                <div>
      <form onSubmit={onSubmit}>
        <input type="file" onChange={onChange} />
        <button type="submit">Upload</button>
      </form>
      {uploaded && (
        <div>
          <p>Uploaded: {uploaded.originalName}</p>
          <a href={`http://localhost:5173/${uploaded.filePath}`} target="_blank" rel="noopener noreferrer">
            View File
          </a>
        </div>
      )}
    </div>

    

      


      </Box>
    </Box>



  );
};

export default FileUpload;
