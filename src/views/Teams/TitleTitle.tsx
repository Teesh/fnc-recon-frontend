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
  
  export default function TitleTitle() {
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
      fontSize: 140,
      border: '8px solid',
      lineHeight: 1.5,
      backgroundColor: '#32CD32',
      borderColor: '#111111',
      color: 'black',
      width: '700px',
      height: '160px',
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
      margin: 5,
      borderRadius: 20,
      fontSize: 80,
      border: '8px solid',
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
      border: '8px solid',
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
      borderRadius: 1,
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
<Grid item xs={12} m='20px'>
  <BiggerButton>Title!</BiggerButton>
</Grid>
<Grid item xs={12}>
<BottomLine></BottomLine>
</Grid>
      </React.Fragment>
    )
  }



