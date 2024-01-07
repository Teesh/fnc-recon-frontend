import * as React from 'react'
import { Box, Button, Divider, Grid, Tab, Tabs, TextField, ToggleButton, ToggleButtonGroup, MenuItem, Select, FormControl,  InputLabel} from '@mui/material'
import { useEffect, useState } from 'react'
import { Link, Route } from "react-router-dom";
import { addReport } from 'db/Crescendo/connector'

type ScoutReport = {
  teamNumber: string,
  alliance: string,
  eventName: string,
  match: string
}

export type ScoreData = {
  reporting_team: string,
  alliance: string,
  event: string,
  match: string,
  scouted_team: string,
  total_score: number
  score: ScoreSheet,
  details: string
}

export enum Climbing {
  None,
  Park,
  Single,
  Double,
  Triple
}

export type ScoreSheet = {
  leave: boolean,
  auto_amp: number,
  auto_speaker: number,
  amp: number,
  speaker: number,
  amped_speaker: number,
  ground_intake: number,
  source_intake: number,
  cooperetition: boolean,
  climb: Climbing,
  high_note: boolean,
  trap: number
}

let defaultScore: ScoreSheet = {
  leave: false,
  auto_amp: 0,
  auto_speaker: 0,
  amp: 0,
  speaker: 0,
  amped_speaker: 0,
  ground_intake: 0,
  source_intake: 0,
  cooperetition: false,
  climb: Climbing.None,
  high_note: false,
  trap: 0
}

interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  )
}

export default function ScoutForm() {
  const [screenWidth, setScreenWidth] = useState<number>(window.innerWidth)
  useEffect(() => {
    const changesize = () => {
      setScreenWidth(window.innerWidth)
    }
    window.addEventListener('resize', changesize)
    return () => {
      window.removeEventListener('resize', changesize)
    }
  }, [window.innerWidth])

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

  const [totalScore, setTotalScore] = useState(0)
  const [score, setScore] = useState<ScoreSheet>(defaultScore)
  const [details, setDetails] = useState('')

  useEffect(() => {
    const calcScore = () => {
    }
  }, [score])

  const submitReport = async () => {
    if (!process.env.REACT_APP_TEAM_NUMBER) {
      //alert("Team Number missing in env file")
      //return
    }
    let body: ScoreData = {
      reporting_team: "0000",
      alliance: scoutInfo.alliance,
      event: scoutInfo.eventName,
      match: scoutInfo.match,
      total_score: totalScore,
      scouted_team: scoutInfo.teamNumber,
      score: score,
      details: details,
    }

    console.log(body)
    await addReport(body)
    alert("Report added!")
  }

  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
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
        <Grid item xs={12}></Grid>
        <Grid container spacing={2}>
          <Grid item xs={12} lg={6}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Event</InputLabel>
              <Select
                value={scoutInfo.eventName}
                label="Event"
                inputProps={{
                  name: 'Event',
                  id: 'uncontrolled-native',
                }}
                sx={{ textAlign: 'left' }}
                onChange={e => setScoutInfo({...scoutInfo, eventName: e.target.value})}
              >
                <MenuItem value={"Orange County"}>Orange County</MenuItem>
                <MenuItem value={"UNC Pembrooke"}>UNC Pembrooke</MenuItem>
                <MenuItem value={"UNC Asheville"}>UNC Asheville</MenuItem>
                <MenuItem value={"Mecklenberg County"}>Mecklenberg County</MenuItem>
                <MenuItem value={"Wake County"}>Wake County</MenuItem>
                <MenuItem value={"State Championship"}>State Championship</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} lg={6}>
            <TextField
              variant="outlined"
              label="Match Number"
              placeholder="12"
              type="number"
              onChange={e => setScoutInfo({...scoutInfo, match: e.target.value})}
              value={scoutInfo.match}
              fullWidth
            />
          </Grid>
        </Grid>
        <Grid item xs={12}><Divider /></Grid>
        { /* Alliance */ } 
        <Grid item xs={13} style={{paddingLeft: "0px"}}>
          <ToggleButtonGroup
            value={scoutInfo.alliance}
            exclusive
            fullWidth
            size="large"
            onChange={handleAllianceChange}
            style={{}}
          >
            <ToggleButton color="error" value="red1">{screenWidth <= 768 ? 'R1' : 'Red 1'}</ToggleButton>
            <ToggleButton color="error" value="red2">{screenWidth <= 768 ? 'R2' : 'Red 2'}</ToggleButton>
            <ToggleButton color="error" value="red3">{screenWidth <= 768 ? 'R3' : 'Red 3'}</ToggleButton>
            <ToggleButton color="primary" value="blue1">{screenWidth <= 768 ? 'B1' : 'Blue 1'}</ToggleButton>
            <ToggleButton color="primary" value="blue2">{screenWidth <= 768 ? 'B2' : 'Blue 2'}</ToggleButton>
            <ToggleButton color="primary" value="blue3">{screenWidth <= 768 ? 'B3' : 'Blue 3'}</ToggleButton>
          </ToggleButtonGroup>
        </Grid>
        <Grid item xs={12}><Divider /></Grid>
        { /* Scoring */ }
        <Grid item xs={12} mb={2}>
          <TextField
            variant="outlined"
            label="Points"
            type="number"
            value={totalScore}
            fullWidth
            InputProps={{
              readOnly: true
            }}
          />
        </Grid>
        <Box sx={{ width: '100%' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={value} onChange={handleChange} variant="fullWidth">
              <Tab label="Autonomous" />
              <Tab label="Teleop" />
              <Tab label="Endgame" />
            </Tabs>
          </Box>
          <CustomTabPanel value={value} index={0}>
            
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
          </CustomTabPanel>
          <CustomTabPanel value={value} index={2}>
            <Grid item xs={12} mb={2}>
              <ToggleButtonGroup
                value={score.climb}
                size="large"
                onChange={(e,v) => setScore({...score, climb: v})}
                exclusive
                fullWidth
                orientation={screenWidth < 660 ? 'vertical' : 'horizontal'}
              >
                <ToggleButton color="warning" value={Climbing.None}>None</ToggleButton>
                <ToggleButton color="info" value={Climbing.Park}>Park</ToggleButton>
                <ToggleButton color="success" value={Climbing.Single}>Single</ToggleButton>
                <ToggleButton color="success" value={Climbing.Double}>Double</ToggleButton>
                <ToggleButton color="success" value={Climbing.Triple}>Triple</ToggleButton>
              </ToggleButtonGroup>
            </Grid>
          </CustomTabPanel>
        </Box>
        <Grid item xs={12} mb={2}>
          <TextField
            variant="outlined"
            label="Additional Details"
            value={details}
            onChange={e => { setDetails(e.target.value) }}
            fullWidth
            multiline
          />
        </Grid>
        { /* Submit */ }
        <Grid item xs={12}>
          <Button sx={{minHeight: 50}} variant="contained" color="success" fullWidth
            onClick={submitReport}
          >Submit</Button>
        </Grid>
        <Grid item xs={12}>
          <Link to="/reports" ><Button variant="contained" color="secondary" fullWidth>Show Reports</Button></Link>
        </Grid>
      </Grid>
    </React.Fragment>
  )
}