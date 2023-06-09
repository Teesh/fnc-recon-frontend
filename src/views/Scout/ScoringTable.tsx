import { Button, ButtonGroup, Card, CardActionArea, Divider, FilledInput, FormControl, FormControlLabel, FormLabel, Grid, Icon, IconButton, Input, InputAdornment, Paper, Radio, RadioGroup, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@mui/material"
import { styled } from '@mui/material/styles'
import { useEffect, useState } from "react"
import { Add, Remove } from '@mui/icons-material';

const CountText = styled(TextField)({
  minWidth: 280, 
  borderRadius: 0, 
  textAlign: 'center'
})

const CobeCard = styled(Card)({
  borderRadius: 0,
  height: '100%'
})

const CobeGrid = styled(Grid)({
  width: 'calc(100% / 9)',
})

type ScoringGrid = {
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

  cobe_3_1: boolean,
  cobe_3_2: boolean,
  cobe_3_3: boolean,
  cobe_3_4: boolean,
  cobe_3_5: boolean,
  cobe_3_6: boolean,
  cobe_3_7: boolean,
  cobe_3_8: boolean,
  cobe_3_9: boolean,
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

enum ChargingMode {
  None,
  Community, // Taxied in Auto, Parked in Endgame
  Docked,
  Engaged
}

type DockingState = {
  autonomous: ChargingMode,
  endgame: ChargingMode
}

export default function ScoringTable() {
  const [totalScore, setTotalScore] = useState(0)
  const [autonomousGamePieces, setAutonomousGamePiece] = useState(0)
  const [autonomousGamePiecesMissed, setAutonomousGamePieceMissed] = useState(0)
  const [dockingState, setDockingState] = useState<DockingState>({
    autonomous: ChargingMode.None,
    endgame: ChargingMode.None,
  })

  const [score, setScore] = useState<ScoringGrid>({
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
  
    cobe_3_1: false,
    cobe_3_2: false,
    cobe_3_3: false,
    cobe_3_4: false,
    cobe_3_5: false,
    cobe_3_6: false,
    cobe_3_7: false,
    cobe_3_8: false,
    cobe_3_9: false,
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

  const calcScore = () => {
    let tempScore = 0
    let linkCounter = 0
    Object.values(score).forEach((value: boolean, index: number) => {
      if (index < 9 && value) tempScore += 5
      if (index >= 9 && index < 18 && value) tempScore += 3
      if (index >= 18 && value) tempScore += 2
      if (index === 9 || index === 18) linkCounter = 0
      value ? linkCounter++ : linkCounter = 0
      if (linkCounter === 3) {
        tempScore += 5
        linkCounter = 0
      }
    })
    
    tempScore += autonomousGamePieces

    if(dockingState.autonomous === ChargingMode.Community) tempScore += 3
    if(dockingState.autonomous === ChargingMode.Docked) tempScore += 8
    if(dockingState.autonomous === ChargingMode.Engaged) tempScore += 12
    if(dockingState.endgame === ChargingMode.Community) tempScore += 2
    if(dockingState.endgame === ChargingMode.Docked) tempScore += 6
    if(dockingState.endgame === ChargingMode.Engaged) tempScore += 10

    return tempScore
  }

  useEffect(() => {
    setTotalScore(calcScore())
  }, [score, autonomousGamePieces, dockingState])

  return (
    <Grid container>
      <Grid item xs={12} mb={2}>
        <h3>Autonomous</h3>
      </Grid>
      <Grid item xs={12} mb={2}>
        <ButtonGroup fullWidth>
          <Button variant="contained" color="success" onClick={e => setAutonomousGamePiece(autonomousGamePieces+1)}>+</Button>
          <CountText 
            variant="outlined"
            label="Autonomous Game Pieces"
            sx={{textAlign: 'center'}}
            value={autonomousGamePieces}
            InputProps={{
              readOnly: true
            }}
          ></CountText>
          <Button variant="contained" color="error" onClick={e => setAutonomousGamePiece(autonomousGamePieces === 0 ? 0 : autonomousGamePieces-1)}>-</Button>
        </ButtonGroup>
      </Grid>
      <Grid item xs={12} mb={2}>
        <ButtonGroup fullWidth>
          <Button variant="contained" color="success" onClick={e => setAutonomousGamePieceMissed(autonomousGamePiecesMissed+1)}>+</Button>
          <CountText 
            variant="outlined"
            label="Autonomous Game Pieces Missed"
            sx={{textAlign: 'center'}}
            value={autonomousGamePiecesMissed}
            InputProps={{
              readOnly: true
            }}
          ></CountText>
          <Button variant="contained" color="error" onClick={e => setAutonomousGamePieceMissed(autonomousGamePiecesMissed === 0 ? 0 : autonomousGamePiecesMissed-1)}>-</Button>
        </ButtonGroup>
      </Grid>
      <Grid item xs={12} mb={2}>
        <FormControl>
          <FormLabel id="demo-row-radio-buttons-group-label">Docking</FormLabel>
          <RadioGroup
            onChange={e => setDockingState({...dockingState, autonomous: +e.target.value})}
            row
          >
            <FormControlLabel control={<Radio value={0} />} label="None" labelPlacement="end"/>
            <FormControlLabel control={<Radio value={1} />} label="Taxied" labelPlacement="end"/>
            <FormControlLabel control={<Radio value={2} />} label="Docked" labelPlacement="end"/>
            <FormControlLabel control={<Radio value={3} />} label="Engaged" labelPlacement="end"/>
          </RadioGroup>
        </FormControl>
      </Grid>
      <Grid item xs={12} mb={2}>
        <Divider />
        <h3>Teleop</h3>
      </Grid>
      <Grid item xs={12} mb={2}>
        <TextField
          variant="outlined"
          label="Points"
          value={totalScore}
          fullWidth
          InputProps={{
            readOnly: true
          }}
        />
      </Grid>
      <Grid container spacing={0} mb={2}>
      { 
        Object.values(score).map((value: boolean, index: number) => {
          let i = Math.ceil((index + 1) / 9)
          let j = (index) % 9 + 1
          let gamePiece, color, shape
          if (i > 2) {
            gamePiece = 'cobe'
            color = 'pink'
            shape = 'radio_button_unchecked'
          } else if (j === 2 || j === 5 || j === 8) {
            gamePiece = 'cube'
            color = 'purple'
            shape = 'crop_square'
          } else {
            gamePiece = 'cone'
            color = 'orange'
            shape = 'change_history'
          }

          let key = `${gamePiece}_${i}_${j}`
          return (
            <CobeGrid item>
              <CobeCard variant="outlined" style={{ backgroundColor: score[key as keyof ScoringGrid] ? color : 'inherit'}}>
                <CardActionArea onClick={e => setScore({...score, [key]: !score[key as keyof ScoringGrid]})} sx={{ padding: '36%', position: 'relative' }}>
                  <Icon>{ shape }</Icon>
                </CardActionArea>
              </CobeCard>
            </CobeGrid>
          )
        })
      }
      </Grid>
      <Grid item xs={12} mb={2}>
        <TableContainer component={Paper}>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell>Misses</TableCell>
                <TableCell align="center">High</TableCell>
                <TableCell align="center">Mid</TableCell>
                <TableCell align="center">Low</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Cones</TableCell>
                <TableCell align="center">
                 <FilledInput
                    inputProps={{min: 0, style: { textAlign: 'center' }}}
                    value={misses.cone_high}
                    startAdornment={
                      <InputAdornment position="start">
                        <IconButton edge="start"><Add /></IconButton>
                      </InputAdornment>
                    }
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton edge="end"><Remove /></IconButton>
                      </InputAdornment>
                    }
                  />
                </TableCell>
                <TableCell align="center">
                  <FilledInput
                    inputProps={{min: 0, style: { textAlign: 'center' }}}
                    value={misses.cone_mid}
                    startAdornment={
                      <InputAdornment position="start">
                        <IconButton edge="start"><Add /></IconButton>
                      </InputAdornment>
                    }
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton edge="end"><Remove /></IconButton>
                      </InputAdornment>
                    }
                  />
                </TableCell>
                <TableCell align="center">
                  <FilledInput
                    inputProps={{min: 0, style: { textAlign: 'center' }}}
                    value={misses.cone_low}
                    startAdornment={
                      <InputAdornment position="start">
                        <IconButton edge="start"><Add /></IconButton>
                      </InputAdornment>
                    }
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton edge="end"><Remove /></IconButton>
                      </InputAdornment>
                    }
                  />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Cubes</TableCell>
                <TableCell align="center">
                  <FilledInput
                    inputProps={{min: 0, style: { textAlign: 'center' }}}
                    value={misses.cube_high}
                    startAdornment={
                      <InputAdornment position="start">
                        <IconButton edge="start"><Add /></IconButton>
                      </InputAdornment>
                    }
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton edge="end"><Remove /></IconButton>
                      </InputAdornment>
                    }
                  />
                </TableCell>
                <TableCell align="center">
                  <FilledInput
                    inputProps={{min: 0, style: { textAlign: 'center' }}}
                    value={misses.cube_mid}
                    startAdornment={
                      <InputAdornment position="start">
                        <IconButton edge="start"><Add /></IconButton>
                      </InputAdornment>
                    }
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton edge="end"><Remove /></IconButton>
                      </InputAdornment>
                    }
                  />
                </TableCell>
                <TableCell align="center">
                  <FilledInput
                    inputProps={{min: 0, style: { textAlign: 'center' }}}
                    value={misses.cube_low}
                    startAdornment={
                      <InputAdornment position="start">
                        <IconButton edge="start"><Add /></IconButton>
                      </InputAdornment>
                    }
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton edge="end"><Remove /></IconButton>
                      </InputAdornment>
                    }
                  />
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
      <Grid item xs={12} mb={2}>
        <TableContainer component={Paper}>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell>Intakes</TableCell>
                <TableCell align="center">Single</TableCell>
                <TableCell align="center">Double</TableCell>
                <TableCell align="center">Floor</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Grabbed</TableCell>
                <TableCell align="center">
                  <FilledInput
                    inputProps={{min: 0, style: { textAlign: 'center' }}}
                    value={intakes.single_grabbed}
                    startAdornment={
                      <InputAdornment position="start">
                        <IconButton edge="start"><Add /></IconButton>
                      </InputAdornment>
                    }
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton edge="end"><Remove /></IconButton>
                      </InputAdornment>
                    }
                  />
                </TableCell>
                <TableCell align="center">
                  <FilledInput
                    inputProps={{min: 0, style: { textAlign: 'center' }}}
                    value={intakes.double_grabbed}
                    startAdornment={
                      <InputAdornment position="start">
                        <IconButton edge="start"><Add /></IconButton>
                      </InputAdornment>
                    }
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton edge="end"><Remove /></IconButton>
                      </InputAdornment>
                    }
                  />
                </TableCell>
                <TableCell align="center">
                  <FilledInput
                    inputProps={{min: 0, style: { textAlign: 'center' }}}
                    value={intakes.floor_grabbed}
                    startAdornment={
                      <InputAdornment position="start">
                        <IconButton edge="start"><Add /></IconButton>
                      </InputAdornment>
                    }
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton edge="end"><Remove /></IconButton>
                      </InputAdornment>
                    }
                  />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Missed</TableCell>
                <TableCell align="center">
                  <FilledInput
                    inputProps={{min: 0, style: { textAlign: 'center' }}}
                    value={intakes.single_missed}
                    startAdornment={
                      <InputAdornment position="start">
                        <IconButton edge="start"><Add /></IconButton>
                      </InputAdornment>
                    }
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton edge="end"><Remove /></IconButton>
                      </InputAdornment>
                    }
                  />
                </TableCell>
                <TableCell align="center">
                  <FilledInput
                    inputProps={{min: 0, style: { textAlign: 'center' }}}
                    value={intakes.double_missed}
                    startAdornment={
                      <InputAdornment position="start">
                        <IconButton edge="start"><Add /></IconButton>
                      </InputAdornment>
                    }
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton edge="end"><Remove /></IconButton>
                      </InputAdornment>
                    }
                  />
                </TableCell>
                <TableCell align="center">
                  <FilledInput
                    inputProps={{min: 0, style: { textAlign: 'center' }}}
                    value={intakes.floor_missed}
                    startAdornment={
                      <InputAdornment position="start">
                        <IconButton edge="start"><Add /></IconButton>
                      </InputAdornment>
                    }
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton edge="end"><Remove /></IconButton>
                      </InputAdornment>
                    }
                  />
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
      <Grid item xs={12} mb={2}>
        <Divider />
        <h3>Endgame</h3>
      </Grid>
      <Grid item xs={12} mb={2}>
        <FormControl>
          <FormLabel id="demo-row-radio-buttons-group-label">Docking</FormLabel>
          <RadioGroup
            onChange={e => setDockingState({...dockingState, endgame: +e.target.value})}
            row
          >
            <FormControlLabel control={<Radio value={0} />} label="None" labelPlacement="end"/>
            <FormControlLabel control={<Radio value={1} />} label="Parked" labelPlacement="end"/>
            <FormControlLabel control={<Radio value={2} />} label="Docked" labelPlacement="end"/>
            <FormControlLabel control={<Radio value={3} />} label="Engaged" labelPlacement="end"/>
          </RadioGroup>
        </FormControl>
      </Grid>
    </Grid>
  )
}
