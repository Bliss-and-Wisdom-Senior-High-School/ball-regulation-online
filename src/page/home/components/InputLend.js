import Card from '@mui/material/Card';
import styled from '@emotion/styled';
import BallType from'./BallType';

const Space = styled.div`
    padding: 15%
`;


const InputLend = () => {
    return(
        <Space>
            <Card sx = {{pl: '15%',pr: '15%',pt: '20px',pb: '30%', bgcolor: '#48a999'}}>
            <h1>借</h1>

            <BallType/>
        </Card>
        </Space>
    );
};
export default InputLend;