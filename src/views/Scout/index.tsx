import * as React from 'react'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import Crescendo from './Crescendo'
import { Link } from "react-router-dom";

function ReportsContent() {
  return (
    <React.Fragment>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        {/* Recent Orders */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
            <Crescendo />
          </Paper>
        </Grid>
      </Container>
    </React.Fragment>
  )
}

export default function Reports() {
  return <ReportsContent />
}