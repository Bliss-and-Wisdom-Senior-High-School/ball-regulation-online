import Typography from '@mui/material/Typography';
import Option from "./component/option";

const Setting = () => {
  return(
  <>
    <Typography
      sx={{
        FontSize: '80px',
        p: '10px'
      }}
      fontSize="xx-large"
    >設定</Typography>
    <Option/>
    <h6 align="center">Made with ❤️ by Bo-Chain</h6>
  </>
  );
  
};

export default Setting;