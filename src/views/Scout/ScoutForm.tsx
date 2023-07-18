import * as React from 'react'
import { Button, Divider, FormControl, Grid, InputLabel, MenuItem, Select, Slider, TextField, ToggleButton, ToggleButtonGroup } from '@mui/material'
import { useRef, useState } from 'react'
import ScoringTable, { RefObject } from './ScoringTable'

type ScoutReport = {
  teamNumber: string,
  alliance: string,
  eventName: string,
  match: string
}

export default function ScoutForm() {
  const scoreRef = useRef<RefObject>(null)
  
  const [scoutInfo, setScoutInfo] = useState<ScoutReport>({
    teamNumber: '',
    alliance: '',
    eventName: '',
    match: ''
  })

  const handleAllianceChange = (
    event: React.MouseEvent<HTMLElement>,
    newAlliance: string,
  ) => {
    setScoutInfo({
      ...scoutInfo,
      alliance: newAlliance
    })
  }

  const submitReport = () => {
    let endpoint = "http://localhost:8080"
    let requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        team_number: scoutInfo.teamNumber,
        alliance: scoutInfo.alliance,
        year: '2023',
        event: scoutInfo.eventName,
        match: scoutInfo.match,
        scouted_team: scoutInfo.teamNumber,
        ...scoreRef.current?.getScoreData()
      })
    }
    fetch(endpoint, requestOptions)
  }

  return (
    <React.Fragment>
      <Grid px={3} justifyContent="center" container spacing={2}>
        <Grid item xs={12}>
          <h1>Scouting Sheet</h1>
        </Grid>
        { /* Team Number */}
        <Grid container>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              label="Team Number"
              placeholder="1234"
              type="number"
              onChange={e => setScoutInfo({...scoutInfo, teamNumber: e.target.value})}
              value={scoutInfo.teamNumber}
              fullWidth
            />
          </Grid>
        </Grid>
        { /* Event and Match */}
        <Grid item xs={12}><Divider /></Grid>
        <Grid container>
          <Grid item xs={6}>
            <TextField
              variant="outlined"
              label="Event"
              placeholder="Asheville District Event"
              onChange={e => setScoutInfo({...scoutInfo, teamNumber: e.target.value})}
              value={scoutInfo.eventName}
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              variant="outlined"
              label="Match Number"
              placeholder="Q22"
              onChange={e => setScoutInfo({...scoutInfo, teamNumber: e.target.value})}
              value={scoutInfo.match}
              fullWidth
            />
          </Grid>
        </Grid>
        <Grid item xs={12}><Divider /></Grid>
        { /* Alliance */ }
        <Grid item xs={12}>
          <ToggleButtonGroup
            value={scoutInfo.alliance}
            exclusive
            size="large"
            onChange={handleAllianceChange}
            fullWidth
          >
            <ToggleButton color="error" value="red1">Red 1</ToggleButton>
            <ToggleButton color="error" value="red2">Red 2</ToggleButton>
            <ToggleButton color="error" value="red3">Red 3</ToggleButton>
            <ToggleButton color="primary" value="blue1">Blue 1</ToggleButton>
            <ToggleButton color="primary" value="blue2">Blue 2</ToggleButton>
            <ToggleButton color="primary" value="blue3">Blue 3</ToggleButton>
          </ToggleButtonGroup>
        </Grid>
        <Grid item xs={12}><Divider /></Grid>
        { /* Scoring */ }
        <Grid item xs={12}>
          <ScoringTable ref={scoreRef} />
        </Grid>
        { /* Submit */ }
        <Grid item xs={12}>
          <Button sx={{minHeight: 50}} variant="contained" color="success" fullWidth
            onClick={submitReport}
          >Submit</Button>
        </Grid>
      </Grid>
    </React.Fragment>
  )
}