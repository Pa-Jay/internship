import * as React from 'react';
import './container.css'
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import { Outlet } from 'react-router-dom'
import DateAndTimePicker from './Home/reuse/DateTimePicker';
import DataGridDemo from './Home/reuse/DataGridTable';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#FCFCFC',
  ...theme.typography.body2,
  padding: theme.spacing(1),
//   textAlign: 'center',
  color: theme.palette.text.secondary,
}));

function MainContainer() {
  return (
    <Box sx={{ flexGrow: 1 }} >
      <Grid container spacing={2} sx={{flexWrap: 'nowrap'}} id='mainBox'>
        <Grid item xs={12} md={8}>
            <Item>
                <div className="main-part">
                    <Outlet></Outlet>
                </div>
            </Item>
        </Grid>
        <Grid item xs={12} md={4} id='leftbar'>
          <Item>
            <div className="leftbar">
                <Card sx={{marginBottom: 5}}>
                    <DateAndTimePicker />
                </Card>
                <div id="transactions">
                    <h2 style={{paddingBottom: 8, color: '#0D4E98', fontSize: '24px'}}>Transactions</h2>
                    <DataGridDemo />
                </div>
            </div>
          </Item>
        </Grid>
      </Grid>
    </Box>
  );
}
// // import './container.css'
// // import LeftBar from './Home/leftbar'

//  {
//   return (
//         
//     </div>
//   )
// }

export default MainContainer