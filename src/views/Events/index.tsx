import * as React from 'react'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import EventsList from './EventsList'

function TeamsContent() {
  return (
    <React.Fragment>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        {/* Recent Orders */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
            <EventsList />
          </Paper>
        </Grid>
      </Container>
    </React.Fragment>
  )
}

export default function Teams() {
  return <TeamsContent />
}
