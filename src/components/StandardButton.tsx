import * as React from 'react'
import Button, { ButtonProps } from '@mui/material/Button'
import styled from '@emotion/styled'


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