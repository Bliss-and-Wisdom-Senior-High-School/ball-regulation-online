import Option from'./components/option';
import Typography from '@mui/material/Typography';

const Home = () => {
  return(
  <>
    <Typography
      sx={{
        FontSize: '80px',
        p: '10px'
      }}
      fontSize="xx-large"
    >Home</Typography>
      <Option />
  </>
  );
  
};

export default Home;