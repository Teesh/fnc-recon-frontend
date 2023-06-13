import * as React from 'react'
import { useTheme } from '@mui/material/styles'
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer } from 'recharts'
import Button, { ButtonProps } from '@mui/material/Button'
import styled from '@emotion/styled'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack';
import { purple } from '@mui/material/colors';
import Slider from '@mui/material/Slider'
import Text from 'react'

function preventDefault(event: React.MouseEvent) {
    event.preventDefault()
  }
  
  export default function TablePlusMinus() {
     const StandardButton = styled(Button)({
      borderRadius: 20,
      fontSize: 35,
      border: '4px solid',
      lineHeight: 1.5,
      backgroundColor: '#32CD32',
      borderColor: '#111111',
      color: 'black',
      width: '400px',
      height: '120px',
      fontFamily: [
        '"Lucida Console"',
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
    });
    const BiggerButton = styled(Button)({
      borderRadius: 20,
      fontSize: 80,
      border: '4px solid',
      lineHeight: 1.5,
      backgroundColor: '#32CD32',
      borderColor: '#111111',
      color: 'black',
      width: '400px',
      height: '80px',
      fontFamily: [
        '"Lucida Console"',
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
    });
    const SmallerButton = styled(Button)({
      borderRadius: 20,
      fontSize: 80,
      border: '4px solid',
      lineHeight: 1.5,
      backgroundColor: '#32CD32',
      borderColor: '#111111',
      color: 'black',
      width: '80px',
      height: '60px',
      fontFamily: [
        '"Lucida Console"',
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
    });
         const ScoredPiecesButton = styled(Button)({
      borderRadius: 20,
      fontSize: 30,
      border: '4px solid',
      lineHeight: 1.5,
      backgroundColor: '#32CD32',
      borderColor: '#111111',
      color: 'black',
      width: '300px',
      height: '80px',
      fontFamily: [
        '"Lucida Console"',
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
    });
    const BottomLine = styled(Button)({
      borderRadius: 20,
      fontSize: 30,
      border: '4px solid',
      lineHeight: 1.5,
      backgroundColor: 'gray',
      borderColor: '#111111',
      color: 'black',
      width: '2000px',
      height: '1px',
      fontFamily: [
        '"Lucida Console"',
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
    });
    
    return ( 
      <React.Fragment>  {/* Firship was wrong about nesting and for that I am forever ungrateful  */}
<Grid container xs={12} p='20px'>
  <Grid container xs={6}>   {/* Column 1 */}
    <Grid item xs={12}>  {/* Row 1 */}
      <ScoredPiecesButton>Scored Pieces</ScoredPiecesButton>
    </Grid>
    <Grid container xs={12}>  {/* Row 2 */}
      <Grid xs={6} pt='10px' pl='80px'>
      <SmallerButton>+</SmallerButton>
      </Grid>
      <Grid item xs={6} pt='10px' pr='80px'>
      <SmallerButton>-</SmallerButton>
      </Grid>
    </Grid>
  </Grid>
  <Grid container xs={6}>   {/* Column 1 */}
    <Grid container xs={12}>  {/* Row 1 */}
      <BiggerButton>TOTAL</BiggerButton>
    </Grid>
    <Grid xs={12} pr='80px'>  {/* Row 2 */}
    Total display
      <Grid xs={6}>
      </Grid>
      <Grid xs={6}>
  
      </Grid>
    </Grid>
  </Grid>
</Grid>
<Grid item xs={12}>
<BottomLine></BottomLine>
</Grid>
      </React.Fragment>
    )
  }



