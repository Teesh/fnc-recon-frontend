import * as React from 'react'
import { Box, Button, Divider, Grid, Tab, Tabs, TextField, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material'
import { useRef, useState } from 'react'
import ScoringTable, { RefObject } from './ScoringTable'
import { addReport } from 'db/connector'

type ScoutReport = {
  teamNumber: string,
  alliance: string,
  eventName: string,
  match: string
}

type ScoringGrid = {
  cone_1_1: ScoreMode,
  cube_1_2: ScoreMode,
  cone_1_3: ScoreMode,
  cone_1_4: ScoreMode,
  cube_1_5: ScoreMode,
  cone_1_6: ScoreMode,
  cone_1_7: ScoreMode,
  cube_1_8: ScoreMode,
  cone_1_9: ScoreMode,

  cone_2_1: ScoreMode,
  cube_2_2: ScoreMode,
  cone_2_3: ScoreMode,
  cone_2_4: ScoreMode,
  cube_2_5: ScoreMode,
  cone_2_6: ScoreMode,
  cone_2_7: ScoreMode,
  cube_2_8: ScoreMode,
  cone_2_9: ScoreMode,

  cobe_3_1: ScoreMode,
  cobe_3_2: ScoreMode,
  cobe_3_3: ScoreMode,
  cobe_3_4: ScoreMode,
  cobe_3_5: ScoreMode,
  cobe_3_6: ScoreMode,
  cobe_3_7: ScoreMode,
  cobe_3_8: ScoreMode,
  cobe_3_9: ScoreMode,
}


type MissedScores = {
  cone_high: number,
  cone_mid: number,
  cone_low: number,
  cube_high: number,
  cube_mid: number,
  cube_low: number
}

type Intakes = {
  single_grabbed: number,
  single_missed: number,
  double_grabbed: number,
  double_missed: number,
  floor_grabbed: number,
  floor_missed: number
}

export type ScoreData = {
  total_score: number
  autonomous_game_pieces: number,
  autonomous_game_pieces_missed: number,
  auto_charging: ChargingMode,
  high_cone_1: boolean,
  high_cube_2: boolean,
  high_cone_3: boolean,
  high_cone_4: boolean,
  high_cube_5: boolean,
  high_cone_6: boolean,
  high_cone_7: boolean,
  high_cube_8: boolean,
  high_cone_9: boolean,
  mid_cone_1: boolean,
  mid_cube_2: boolean,
  mid_cone_3: boolean,
  mid_cone_4: boolean,
  mid_cube_5: boolean,
  mid_cone_6: boolean,
  mid_cone_7: boolean,
  mid_cube_8: boolean,
  mid_cone_9: boolean,
  low_hybrid_1: boolean,
  low_hybrid_2: boolean,
  low_hybrid_3: boolean,
  low_hybrid_4: boolean,
  low_hybrid_5: boolean,
  low_hybrid_6: boolean,
  low_hybrid_7: boolean,
  low_hybrid_8: boolean,
  low_hybrid_9: boolean,
  miss_cone_high: number,
  miss_cone_mid: number,
  miss_cone_low: number,
  miss_cube_high: number,
  miss_cube_mid: number,
  miss_cube_low: number,
  intake_single: number,
  intake_double: number,
  intake_floor: number,
  intake_single_miss: number,
  intake_double_miss: number,
  intake_floor_miss: number,
  endgame_charging: ChargingMode
}

enum ChargingMode {
  None,
  Community, // Taxied in Auto, Parked in Endgame
  Docked,
  Engaged
}

enum ScoreMode {
  None,
  Auto,
  Teleop
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

  const [score, setScore] = useState<ScoringGrid>({
    cone_1_1: ScoreMode.None,
    cube_1_2: ScoreMode.None,
    cone_1_3: ScoreMode.None,
    cone_1_4: ScoreMode.None,
    cube_1_5: ScoreMode.None,
    cone_1_6: ScoreMode.None,
    cone_1_7: ScoreMode.None,
    cube_1_8: ScoreMode.None,
    cone_1_9: ScoreMode.None,
  
    cone_2_1: ScoreMode.None,
    cube_2_2: ScoreMode.None,
    cone_2_3: ScoreMode.None,
    cone_2_4: ScoreMode.None,
    cube_2_5: ScoreMode.None,
    cone_2_6: ScoreMode.None,
    cone_2_7: ScoreMode.None,
    cube_2_8: ScoreMode.None,
    cone_2_9: ScoreMode.None,
  
    cobe_3_1: ScoreMode.None,
    cobe_3_2: ScoreMode.None,
    cobe_3_3: ScoreMode.None,
    cobe_3_4: ScoreMode.None,
    cobe_3_5: ScoreMode.None,
    cobe_3_6: ScoreMode.None,
    cobe_3_7: ScoreMode.None,
    cobe_3_8: ScoreMode.None,
    cobe_3_9: ScoreMode.None,
  })

  const [ misses, setMisses ] = useState<MissedScores>({
    cone_high: 0,
    cone_mid: 0,
    cone_low: 0,
    cube_high: 0,
    cube_mid: 0,
    cube_low: 0
  })

  const [intakes, setIntakes ] = useState<Intakes>({
    single_grabbed: 0,
    single_missed: 0,
    double_grabbed: 0,
    double_missed: 0,
    floor_grabbed: 0,
    floor_missed: 0
  })

  const submitReport = async () => {
    if (!scoreRef.current) return
    let body = {
      reporting_team: process.env.REACT_APP_TEAM_NUMBER,
      alliance: scoutInfo.alliance,
      event: scoutInfo.eventName,
      match: scoutInfo.match,
      scouted_team: scoutInfo.teamNumber,
      ...scoreRef.current.getScoreData()
    }
    await addReport(body)
    alert("Report added!")
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
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    )
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
        <Grid item xs={12}><Divider /></Grid>
        <Grid container>
          <Grid item xs={6}>
            <TextField
              variant="outlined"
              label="Event"
              placeholder="Asheville District Event"
              onChange={e => setScoutInfo({...scoutInfo, eventName: e.target.value})}
              value={scoutInfo.eventName}
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              variant="outlined"
              label="Match Number"
              placeholder="Q22"
              onChange={e => setScoutInfo({...scoutInfo, match: e.target.value})}
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
        <Grid item xs={12} mb={2}>
          <TextField
            variant="outlined"
            label="Points"
            type="number"
            value={0}
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
            <ScoringTable ref={scoreRef} />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            <ScoringTable />
          </CustomTabPanel>
        </Box>
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