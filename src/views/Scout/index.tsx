import * as React from 'react'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import ScoutForm from './ScoutForm'
import { Link } from "react-router-dom";

function ReportsContent() {
  return (
    <React.Fragment>
      <Link to="/reports" ><div style={{height: "60px", width: "60px", borderRadius: "100%", backgroundColor: "green", position: "fixed", bottom: "10px", right: "10px", cursor: "pointer"}}><img src="https://i.imgur.com/ekphRxF.png" width="90%"  /></div></Link>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        {/* Recent Orders */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
            <ScoutForm />
          </Paper>
        </Grid>
      </Container>
    </React.Fragment>
  )
}

export default function Reports() {
  return <ReportsContent />
}