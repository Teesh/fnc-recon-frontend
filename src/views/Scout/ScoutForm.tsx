import * as React from 'react'
import { Box, Button, Divider, Grid, Tab, Tabs, TextField, ToggleButton, ToggleButtonGroup, MenuItem, Select, FormControl,  InputLabel} from '@mui/material'
import { useEffect, useState } from 'react'
import { Link, Route, useNavigate } from "react-router-dom";
import { addReport } from 'db/connector'
import ScoringTable from './ScoringTable'

type ScoutReport = {
  teamNumber: string,
  alliance: string,
  eventName: string,
  match: string
}

export enum GamePiece {
  None,
  Cone,
  Cube
}

export type ScoringGrid = {
  cone_1_1: boolean,
  cube_1_2: boolean,
  cone_1_3: boolean,
  cone_1_4: boolean,
  cube_1_5: boolean,
  cone_1_6: boolean,
  cone_1_7: boolean,
  cube_1_8: boolean,
  cone_1_9: boolean,

  cone_2_1: boolean,
  cube_2_2: boolean,
  cone_2_3: boolean,
  cone_2_4: boolean,
  cube_2_5: boolean,
  cone_2_6: boolean,
  cone_2_7: boolean,
  cube_2_8: boolean,
  cone_2_9: boolean,

  cobe_3_1: GamePiece,
  cobe_3_2: GamePiece,
  cobe_3_3: GamePiece,
  cobe_3_4: GamePiece,
  cobe_3_5: GamePiece,
  cobe_3_6: GamePiece,
  cobe_3_7: GamePiece,
  cobe_3_8: GamePiece,
  cobe_3_9: GamePiece
}

export type ScoreSheet = {
  grid: ScoringGrid,
  charging: ChargingMode | ChargingMode[]
}

export enum ChargingMode {
  None,
  Community, // Left Community in Auto, Parked in Endgame
  Docked,
  Engaged
}

let defaultScore: ScoreSheet = {
  grid: {
    cone_1_1: false,
    cube_1_2: false,
    cone_1_3: false,
    cone_1_4: false,
    cube_1_5: false,
    cone_1_6: false,
    cone_1_7: false,
    cube_1_8: false,
    cone_1_9: false,

    cone_2_1: false,
    cube_2_2: false,
    cone_2_3: false,
    cone_2_4: false,
    cube_2_5: false,
    cone_2_6: false,
    cone_2_7: false,
    cube_2_8: false,
    cone_2_9: false,

    cobe_3_1: GamePiece.None,
    cobe_3_2: GamePiece.None,
    cobe_3_3: GamePiece.None,
    cobe_3_4: GamePiece.None,
    cobe_3_5: GamePiece.None,
    cobe_3_6: GamePiece.None,
    cobe_3_7: GamePiece.None,
    cobe_3_8: GamePiece.None,
    cobe_3_9: GamePiece.None,
  },

  charging: ChargingMode.None
}

export type ScoreData = {
  reporting_team: string,
  alliance: string,
  event: string,
  match: string,
  scouted_team: string,
  total_score: number
  auto_score: ScoreSheet,
  tele_score: ScoreSheet,
  details: string
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
  const [autoScore, setAutoScore] = useState<ScoreSheet>({...defaultScore, charging: []})
  const [teleScore, setTeleScore] = useState<ScoreSheet>(defaultScore)
  const [details, setDetails] = useState('')

  useEffect(() => {
    const calcScore = () => {
      let tempScore = 0
      Object.values(autoScore.grid).forEach((value: boolean | GamePiece, index: number) => {
        if (index < 9 && value) tempScore += 6
        if (index >= 9 && index < 18 && value) tempScore += 4
        if (index >= 18 && value) tempScore += 3
      })
      Object.values(teleScore.grid).forEach((value: boolean | GamePiece, index: number) => {
        if (index < 9 && value) tempScore += 5
        if (index >= 9 && index < 18 && value) tempScore += 3
        if (index >= 18 && value) tempScore += 2
      })
      
      let linkCounter = 0
      for (let i = 0; i < 27; i++) {
        if (Object.values(autoScore.grid)[i] || Object.values(teleScore.grid)[i]) linkCounter++
        if (linkCounter === 3) {
          tempScore += 5
          linkCounter = 0
        }
        if (i === 8 || i === 17) linkCounter = 0
      }
  
      if (Array.isArray(autoScore.charging)) {
        if(autoScore.charging.includes(ChargingMode.Community)) tempScore += 3
        if(autoScore.charging.includes(ChargingMode.Docked)) tempScore += 8
        else if(autoScore.charging.includes(ChargingMode.Engaged)) tempScore += 12
      }
      if(teleScore.charging === ChargingMode.Community) tempScore += 2
      else if(teleScore.charging === ChargingMode.Docked) tempScore += 6
      else if(teleScore.charging === ChargingMode.Engaged) tempScore += 10
  
      return tempScore
    }
    setTotalScore(calcScore())
  }, [autoScore, teleScore])

  const submitReport = async () => {
    if (!process.env.REACT_APP_TEAM_NUMBER) {
      //alert("Team Number missing in env file")
      //return
    }
    console.log({
      reporting_team: "0000",
      alliance: scoutInfo.alliance,
      event: scoutInfo.eventName,
      match: scoutInfo.match,
      total_score: totalScore,
      scouted_team: scoutInfo.teamNumber,
      auto_score: autoScore,
      tele_score: teleScore
    })
    let body: ScoreData = {
      reporting_team: "0000",
      alliance: scoutInfo.alliance,
      event: scoutInfo.eventName,
      match: scoutInfo.match,
      total_score: totalScore,
      scouted_team: scoutInfo.teamNumber,
      auto_score: autoScore,
      tele_score: teleScore,
      details: details,
    }

    console.log(body)
    await addReport(body)
    useNavigate('reports')
  }

  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  let flip = ['blue1', 'blue2', 'blue3'].includes(scoutInfo.alliance)

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
              placeholder="9999"
              inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
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
                <MenuItem value={"UNC Asheville Event"}>UNC Asheville Event</MenuItem>
                <MenuItem value={"THOR East"}>THOR East</MenuItem>
                <MenuItem value={"Doyenne East"}>Doyenne East</MenuItem>
                <MenuItem value={"THOR West"}>THOR West</MenuItem>
                <MenuItem value={"Doyenne West"}>Doyenne West</MenuItem>
                <MenuItem value={"Rumble on the Road"}>Doyenne West</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} lg={6}>
            <TextField
              variant="outlined"
              label="Match Number"
              placeholder="0"
              inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
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
            </Tabs>
          </Box>
          <CustomTabPanel value={value} index={0}>
            <ScoringTable key={0} score={autoScore} flip={flip} setScore={setAutoScore} teleScore={teleScore} sw={screenWidth}/>
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            <ScoringTable key={1} score={teleScore} flip={flip} setScore={setTeleScore} autoScore={autoScore}  sw={screenWidth} teleop/>
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
