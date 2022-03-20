import { BrowserRouter, Route, Routes, NavLink } from "react-router-dom";
import { React } from "react";
import Home from "./page/home";
import DashBoard from"./page/dashboard";
import styled from "@emotion/styled";
import HomeIcon from '@mui/icons-material/Home';
import StorageIcon from '@mui/icons-material/Storage';
import Breadcrumbs from '@mui/material/Breadcrumbs';
const Title = styled.div`
  text-align: center;
`;



const iconstyle = {color: '#1565c0',  fontSize: "50px"};



const App = () => {
 

  return (
    <Title>
      <BrowserRouter style={{ display: 'flex', justifyContent: 'center'}}>
        <Breadcrumbs
          ria-label="breadcrumb" 
          sx={{
          alignItems: 'center',
          display: 'inline-flex'
        }}>
          <NavLink to="/"><HomeIcon sx={iconstyle}  /></NavLink> 
          
          <NavLink to="/dashboard"><StorageIcon sx={iconstyle} /></NavLink>
        </Breadcrumbs>
                          
        <Routes>
          <Route path="/*" element={<Home />} />
          <Route path="/dashboard/*" element={<DashBoard />} />
        </Routes>
      </BrowserRouter>
    </Title>
  );
}
export default App;


//https://mui.com/zh/components/toggle-button/#standalone-toggle-button