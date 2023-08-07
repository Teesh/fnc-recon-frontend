import * as React from 'react'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import ReportsList from './ReportsList'
import { Link } from "react-router-dom";

function ReportsContent() {
  return (
    <React.Fragment>
      <Link to="/scout" ><div style={{height: "60px", width: "60px", borderRadius: "100%", backgroundColor: "green", position: "fixed", bottom: "10px", right: "10px", cursor: "pointer"}}><img src="https://www.svgrepo.com/download/42233/pencil-edit-button.svg" width="60%" style={{justifyContent: "center", paddingTop: "10px"}} /></div></Link>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        {/* Recent Orders */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
            <ReportsList />
          </Paper>
        </Grid>
      </Container>
    </React.Fragment>
  )
}

export default function Reports() {
  return <ReportsContent />
}
