import * as React from 'react'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import Chart from './Chart'
import Deposits from './Deposits'
import Orders from './Orders'
import Button, { ButtonProps } from '@mui/material/Button'
import styled from '@emotion/styled'
import Stack from '@mui/material/Stack';
import { purple } from '@mui/material/colors';
import Slider from '@mui/material/Slider'




export const StandardButton = styled(Button)({
  borderRadius: 20,
  boxShadow: 'none',
  textTransform: 'none',
  fontSize: 35,
  padding: '6px 12px',
  border: '4px solid',
  lineHeight: 1.5,
  backgroundColor: '#32CD32',
  borderColor: '#111111',
  color: 'black',
  width: '400px',
  height: '120px',
  fontFamily: [

    '"Lucida Console"',
    'moonhouse',

  ].join(','),
  '&:hover': {
    backgroundColor: '#0069d9',
    borderColor: '#0062cc',
    boxShadow: 'none',
  },
  '&:active': {
    boxShadow: 'none',
    backgroundColor: '#0062cc',
    borderColor: '#005cbf',
  },
  '&:focus': {
    boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
  },
});

function DashboardContent() {

  const SettingButton = styled(Button)({
    borderRadius: 10,
    boxShadow: 'none',
    textTransform: 'none',
    fontSize: 10,
    padding: '6px 12px',
    border: '4px solid',
    lineHeight: 1.5,
    backgroundColor: '#32CD32',
    borderColor: '#111111',
    color: 'black',
    width: '40px',
    height: '60px',
    fontFamily: [

      '"Lucida Console"',
      'moonhouse',

    ].join(','),
    '&:hover': {
      backgroundColor: '#0069d9',
      borderColor: '#0062cc',
      boxShadow: 'none',
    },
    '&:active': {
      boxShadow: 'none',
      backgroundColor: '#0062cc',
      borderColor: '#005cbf',
    },
    '&:focus': {
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
    },
  });

 
  



  return (
    <React.Fragment>
      
<Grid item xs={12} m="80px" ml="560px">
   <SettingButton variant="contained">Settings</SettingButton>
 </Grid>
        <Grid container spacing={2}>
        <Grid item xs={12}><StandardButton variant="contained">Start Scouting! 2023 Sheet</StandardButton>
          </Grid> 
        <Grid item xs={12}>
    
   <StandardButton variant="contained">Make Custom</StandardButton>
 </Grid>
 <Grid item xs={12} mt="40px">
   <StandardButton variant="contained">Tutorial</StandardButton>
 </Grid>
 <Grid item xs={12} py="40px">
   <StandardButton variant="contained">Color Theme</StandardButton>
 </Grid>
 
</Grid>
      <Slider
   
  defaultValue={30}
  sx={{
    width: 300,
    color: 'success.mai n',
    '& .MuiSlider-thumb': {
      borderRadius: '1px',
      
    },
  }}
/>
    </React.Fragment>
  )
}


export default function Dashboard() {
 
  
  return <DashboardContent />
}