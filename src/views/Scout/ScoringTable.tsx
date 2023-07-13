import { Button, ButtonGroup, Card, CardActionArea, FormControlLabel, Grid, Icon, Radio, RadioGroup, TextField } from "@mui/material"
import { styled } from '@mui/material/styles'
import { useEffect, useState } from "react"

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
      <Grid container spacing={0}>
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
      <Grid item xs={12} mt={4}>
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
      <Grid item xs={5} mt={2} textAlign='right'>
        <h3>Autonomous</h3>
        <RadioGroup
          onChange={e => setDockingState({...dockingState, autonomous: +e.target.value})}
        >
          <FormControlLabel control={<Radio value={0} />} label="None" labelPlacement="start"/>
          <FormControlLabel control={<Radio value={1} />} label="Taxied" labelPlacement="start"/>
          <FormControlLabel control={<Radio value={2} />} label="Docked" labelPlacement="start"/>
          <FormControlLabel control={<Radio value={3} />} label="Engaged" labelPlacement="start"/>
        </RadioGroup>
      </Grid>
      <Grid item xs={2} mt={2}></Grid>
      <Grid item xs={5} mt={2}  textAlign='left'>
        <h3>Engame</h3>
        <RadioGroup
          onChange={e => setDockingState({...dockingState, endgame: +e.target.value})}
        >
          <FormControlLabel control={<Radio value={0} />} label="None" labelPlacement="end"/>
          <FormControlLabel control={<Radio value={1} />} label="Parked" labelPlacement="end"/>
          <FormControlLabel control={<Radio value={2} />} label="Docked" labelPlacement="end"/>
          <FormControlLabel control={<Radio value={3} />} label="Engaged" labelPlacement="end"/>
        </RadioGroup>
      </Grid>
    </Grid>
  )
}
