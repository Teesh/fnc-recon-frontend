import * as React from 'react'
import { Button, Divider, FormControl, Grid, InputLabel, MenuItem, Select, Slider, TextField, ToggleButton, ToggleButtonGroup } from '@mui/material'
import { useState } from 'react'
import ScoringTable from './ScoringTable'

type ScoutReport = {
  teamNumber: string,
  alliance: string,
  drivingAbility: number,
  driveTrain: string
}

export default function ScoutForm() {
  const [scoutInfo, setScoutInfo] = useState<ScoutReport>({
    teamNumber: '',
    alliance: 'red',
    drivingAbility: 50,
    driveTrain: ''
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
              onChange={e => setScoutInfo({...scoutInfo, teamNumber: e.target.value})}
              value={scoutInfo.teamNumber}
              fullWidth
            />
          </Grid>
        </Grid>
        <Grid item xs={12}><Divider /></Grid>
      { /* Alliance */}
        <Grid item xs={6}>
          <h3>Alliance</h3>
        </Grid>
        <Grid item xs={6}>
          <ToggleButtonGroup
            value={scoutInfo.alliance}
            exclusive
            size="large"
            onChange={handleAllianceChange}
            fullWidth
          >
            <ToggleButton color="error" value="red">Red</ToggleButton>
            <ToggleButton color="primary" value="blue">Blue</ToggleButton>
          </ToggleButtonGroup>
        </Grid>
        <Grid item xs={12}><Divider /></Grid>
      { /* Scoring */}
        <Grid item xs={12}>
          <ScoringTable />
        </Grid>
      { /* Driving Ability */}
        <Grid item xs={12}>
          <Divider />
          <h3 margin-bottom={1}>Driving Ability: {scoutInfo.drivingAbility}%</h3>
          <Slider value={scoutInfo.drivingAbility} defaultValue={scoutInfo.drivingAbility} step={10} marks min={0} max={100} onChange={(e,value) => setScoutInfo({...scoutInfo, drivingAbility: +value})}/>
          <Divider />
        </Grid>
      { /* Drivetrain */}
        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel id="drivetrain">Drivetrain</InputLabel>
            <Select
              value={scoutInfo.driveTrain}
              label="Drivetrain"
              onChange={e => setScoutInfo({...scoutInfo, driveTrain: e.target.value})}
              fullWidth
            >
              <MenuItem value="">None</MenuItem>
              <MenuItem value="Tank">Tank</MenuItem>
              <MenuItem value="Swerve">Swerve</MenuItem>
              <MenuItem value="Monstrosity">Monstrosity</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      { /* Submit */}
        <Grid item xs={12}>
          <Button sx={{minHeight: 50}} variant="contained" color="success" fullWidth>Submit</Button>
        </Grid>
      </Grid>
    </React.Fragment>
  )
}