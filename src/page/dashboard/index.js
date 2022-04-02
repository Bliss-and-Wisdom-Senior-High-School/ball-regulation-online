import React from 'react'
import Typography from '@mui/material/Typography';
import ClassDashBoard from './components/classdashboard';

const DashBoard = () => {
    return (
     <>
      <Typography
      sx={{
        FontSize: '80px',
        p: '10px'
      }}
      fontSize="xx-large"
      >儀錶板</Typography>
      <ClassDashBoard />
      <h6 sx = {{align: "center", position: "fix", bottom: "2px"}}>Made with ❤️ by Bo-Chain</h6>
     </>
    );
  };
  export default DashBoard;