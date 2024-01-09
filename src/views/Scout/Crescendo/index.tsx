import * as React from 'react'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import ScoutForm from './ScoutForm'
import { Link } from "react-router-dom";

function ReportsContent() {
  return (
    <React.Fragment>
      <ScoutForm />
    </React.Fragment>
  )
}

export default function Reports() {
  return <ReportsContent />
}