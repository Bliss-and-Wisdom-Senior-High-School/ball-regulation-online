import { BrowserRouter, Route, Routes, NavLink } from "react-router-dom";
import { React } from "react";
import Home from "./page/home";
import DashBoard from"./page/dashboard";
import styled from "@emotion/styled";

const Title = styled.div`
  text-align: center;
`;


const App = () => {
 

  return (
    <Title>
      <BrowserRouter>
        <NavLink to="/">Home</NavLink>   home    <NavLink to="/dashboard">dashboard</NavLink>
        <Routes>
          <Route path="/*" element={<Home />} />
          <Route path="/dashboard/*" element={<DashBoard />} />
      </Routes>
    </BrowserRouter>
    </ Title>
  );
}
export default App;


//https://mui.com/zh/components/toggle-button/#standalone-toggle-button