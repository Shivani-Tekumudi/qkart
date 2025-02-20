import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Avatar, Button, Stack } from "@mui/material";
import { useHistory, Link } from "react-router-dom";
import Box from "@mui/material/Box";
import React from "react";
import "./Header.css";
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';

const Header = ({ children, hasHiddenAuthButtons }) => {
  const history = useHistory();
    return (
      <Box className="header">
        <Box className="header-title">
            <img src="logo_light.svg" alt="QKart-icon"></img>
        </Box>
        {/* {console.log(children)} */}
{children}

        {/* {
        children ?   <FormControl className="search-desktop" variant="outlined">
          <OutlinedInput sx={{ m: 1, width: '50ch' }} 
            id="outlined-adornment-weight"  placeholder="Search for items/categories"
        name="search"
            endAdornment={<InputAdornment position="end">
            
               <SearchIcon />
         
            </InputAdornment>}
            aria-describedby="outlined-weight-helper-text"   size="small"
            inputProps={{
              'aria-label': 'weight',
            }}
          />
          </FormControl> :""  
          } */}


       {hasHiddenAuthButtons?  <Button
          className="explore-button"
          startIcon={<ArrowBackIcon />}
          variant="text" onClick={() => {history.push("/")}}
        >
          Back to explore
        </Button>
        : 
       
      
        <Box>
          {localStorage.getItem("token")? 
          <Box> 
           
           <Stack spacing={2} flexDirection='row' justifyContent='center' alignItems='center'  useFlexGap
  sx={{ flexWrap: 'wrap' }}>
           <Avatar  src="avatar.png" alt={localStorage.getItem("username")} />
          <p> {localStorage.getItem("username")}</p>
           <Button
          className="explore-button" sx={{ marginTop: '0px' }}
          
          variant="text" onClick={() => {
            localStorage.clear();
            window.location.reload()
           }}
        >
         Logout
        </Button>
      </Stack>
           
          
          </Box> :  <Stack spacing={2} flexDirection='row' justifyContent='center' alignItems='center'  useFlexGap
  sx={{ flexWrap: 'wrap' }}>
        <Button
          className="explore-button"
          
          variant="text" onClick={() => {history.push("/login")}}
        >
         Login
        </Button>
        
        <Button
          className="button" variant="contained" label="primary"
          
          onClick={() => {history.push("/register")}}
        >
         Register
        </Button>
        </Stack>}
         
        
        </Box>
        
        
        }
        
       
      </Box>
    );
};

export default Header;
