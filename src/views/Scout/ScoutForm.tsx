import * as React from 'react'
import { Button, ButtonGroup, Divider, FormControl, Grid, InputLabel, MenuItem, Select, Slider, TextField, ToggleButton, ToggleButtonGroup } from '@mui/material'
import { useEffect, useState } from 'react'
import { Add, Remove } from '@mui/icons-material'
import { styled } from '@mui/material/styles'

type ScoutReport = {
  teamNumber: string,
  alliance: string,
  points: number,
  drivingAbility: number,
  driveTrain: string
}

export default function ScoutForm() {
  const [scoutInfo, setScoutInfo] = useState<ScoutReport>({
    teamNumber: '',
    alliance: 'red',
    points: 0,
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

  const PointButton = styled(Button)({
    height: '57px'
  })

  return (
    <React.Fragment>
      <Grid p={3} justifyContent="center" container spacing={2}>
        <Grid item xs={12}>
          <h1>Scouting Sheet</h1>
        </Grid>
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
        <Grid item xs={6}>
          <TextField
            variant="outlined"
            label="Points"
            onChange={e => setScoutInfo({...scoutInfo, points: +e.target.value})}
            value={scoutInfo.points}
            fullWidth
          />
        </Grid>
        <Grid item xs={6}>
          <ButtonGroup
            size="large"
            variant="contained"
            fullWidth
          >
            <PointButton color="primary" onClick={e => setScoutInfo({...scoutInfo, points: ++scoutInfo.points})}><Add/></PointButton>
            <PointButton color="error" onClick={e => setScoutInfo({...scoutInfo, points: --scoutInfo.points})}><Remove /></PointButton>
          </ButtonGroup>
        </Grid>
        <Grid item xs={12}>
          <Divider />
          <h3 margin-bottom={1}>Drivig Ability: {scoutInfo.drivingAbility}%</h3>
          <Slider value={scoutInfo.drivingAbility} defaultValue={scoutInfo.drivingAbility} step={10} marks min={0} max={100} onChange={(e,value) => setScoutInfo({...scoutInfo, drivingAbility: +value})}/>
          <Divider />
        </Grid>
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
      </Grid>
    </React.Fragment>
  )
}