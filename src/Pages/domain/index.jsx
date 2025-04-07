import React, { useState } from "react";
import { Box, IconButton, TextField, Typography, List, ListItem, ListItemText } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from "react-router-dom"; // For navigation

import PermanentDrawerLeft from "../../Component/Drawer";
import "./index.css";
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';

const Domain = () => {
  const [searchItem, setSearchItem] = useState("");
  const [results, setResults] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  const navigate = useNavigate();

  const items = [
    'Domain1.com',
    'ali.com',
    'sifafa.com',
    'zxcaf.com',
    'ali.com',
    'sifafa.com',
    'zxcaf.com',
    'ali.com',
    'adsifafa.com',
    'zxcaf.com', 'ali.com',
    'sifafa.com',
    'zxacaf.com',

  ];



  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearchItem(value);

    const filteredResults = items.filter(item =>
      item.toLowerCase().includes(value.toLowerCase())
    );
    setResults(filteredResults);
  };

  const handleSelectItem = (item) => {
    setSearchItem(item);
    setSelectedItem(item);
    navigate(`/domain/registration/${item}`);
  };





  return (
    <Box sx={{ display: 'flex', height: "100vh", backgroundColor: "rgb(243, 245, 250)" }}>
      <PermanentDrawerLeft />
      <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 7 }}>
        <Typography sx={{ color: "  ", fontWeight: "700", fontSize: '28px' }}>Find your domain</Typography>

        <div className="SearchDiv">


          <TextField
            placeholder="Register / Search your domain here"
            value={searchItem}
            onChange={handleSearchChange}
            sx={{
              borderRadius: "0px",
              width: "60%",
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderRadius: 0,
                },
                '&:hover fieldset': {
                  borderColor: '#1F384C',
                },
                '&.Mui-focused fieldset': {
                  border: "1px solid #1F384C"
                },
              },
            }}
          />

          <IconButton
            sx={{
              backgroundColor: "red", width: "10%", color: "white", borderRadius: "0px",
              '&:hover': { backgroundColor: '#800000' },
              '&:active': { backgroundColor: '#800000' },
              
            }}
            onClick={() => { console.log("Search Item: ", searchItem) }}
            aria-label="search"
          >
            <Typography sx={
              {fontSize: {
                          xs: '12px',
                          sm: '13px',
                          md: '14px',
                          lg: '16px',
                          xl: '16px'
                        },}}>Search</Typography>
          </IconButton>

        </div>
        {results.length > 0 ? (
          <Box sx={{ width: "60%", backgroundColor: "white", borderRadius: "10px", height: "200px", overflowY: "scroll" }}>
            {results.map((item, index) => (
              <ListItem  button key={index} onClick={() => handleSelectItem(item)}>
                <ListItemText
                sx={{pt:"0px"}}
                  primary={
                    <Typography
                      sx={{
                        fontSize: {
                          xs: '12px',
                          sm: '13px',
                          md: '14px',
                          lg: '16px',
                          xl: '15px'
                        },
                        color: "#333",
                      }}
                    >
                      {item}
                    </Typography>
                  }
                />
              </ListItem>
            ))}
          </Box>
        ) : <></>}


      </Box>
    </Box>
  );
};

export default Domain;
