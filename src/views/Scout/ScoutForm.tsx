import * as React from 'react'
import { Button, Grid, TextField } from '@mui/material'
import { useEffect, useState } from 'react'

type Report = {
  id: number,
  reporting_team: number,
  year: number,
  event: string,
  match: string,
  scouted_team: number,
  alliance: number
}

type ScoutReport = {
    name: string,
    email: string,
    phonenumber: string,
}

export default function ScoutForm() {
  const [contactInfo, setContactInfo] = useState<ScoutReport>({
    name: "",
    email: "",
    phonenumber: "",
  })

  useEffect(() => {
    if(process.env.REACT_APP_ENVIRONMENT === 'local') {
      // setReports()
    } else {
      
    }
  }, [contactInfo])

  return (
    <React.Fragment>
      <Grid container spacing={2}>
        <form>
            <Grid container>
                <h1>Scouting Sheet</h1>
            </Grid>
            <Grid container>
                <Grid container>
                    <h3>Alliance</h3>
                </Grid>
                <Grid container>
                    <Grid item xs={6}>
                        <Button color="error" variant="contained">Red</Button>
                    </Grid>
                    <Grid item xs={6}>
                        <Button variant="contained">Blue</Button>
                    </Grid>
                </Grid>
            </Grid>
            <Grid container>
                <Grid container></Grid>
                <Grid container xs={6}></Grid>
            </Grid>
            <Grid container xs={12}>
                <Grid container xs={6}></Grid>
                <Grid container xs={6}></Grid>
            </Grid>
            <Grid container xs={12}>
                <Grid container xs={6}></Grid>
                <Grid container xs={6}></Grid>
            </Grid>
            <Grid container xs={12}>
                <Grid container xs={6}></Grid>
                <Grid container xs={6}></Grid>
            </Grid>
            <Grid container xs={12}>
                <Grid container xs={6}></Grid>
                <Grid container xs={6}></Grid>
            </Grid>
        </form>
      </Grid>
          {/* <TextField
            variant="standard"
            type="text"
            name="name"
            placeholder="Name"
            value={contactInfo.name}
          /> */}
    </React.Fragment>
  )
}