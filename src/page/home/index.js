import Option from "./components/option";
import Typography from "@mui/material/Typography";

const Home = () => {
  return (
    <>
      <Typography
        sx={{
          FontSize: "80px",
          p: "10px",
        }}
        fontSize="xx-large"
      >
        上傳
      </Typography>
      <Option />
      <h6 align="center">Made with ❤️ by Bo-Chain</h6>
    </>
  );
};

export default Home;
