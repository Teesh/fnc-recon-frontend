import { Button, ButtonGroup, Card, CardActionArea, Checkbox, Divider, FormControlLabel, FormGroup, Grid, TextField } from "@mui/material"
import { ChangeHistory, CropSquare, RadioButtonUnchecked } from '@mui/icons-material'
import { styled } from '@mui/material/styles'
import { useEffect, useState } from "react"

const CountText = styled(TextField)({
  minWidth: 280, 
  borderRadius: 0, 
  textAlign: 'center'
})

const CobeCard = styled(Card)({
  borderRadius: 0,
  minWidth: 48,
  minHeight: 48,
  maxWidth: 48,
  maxHeight: 48,
  display: 'flex'
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

type DockingState = {
  autoDock: boolean,
  autoEngage: boolean,
  endgameDock: boolean,
  endgameEngage: boolean
}

export default function ScoringTable() {
  const [totalScore, setTotalScore] = useState(0)
  const [autonomousGamePieces, setAutonomousGamePiece] = useState(0)
  const [dockingState, setDockingState] = useState<DockingState>({
    autoDock: false,
    autoEngage: false,
    endgameDock: false,
    endgameEngage: false
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

    if(dockingState.autoDock) tempScore += 8
    if(dockingState.autoEngage) tempScore += 4
    if(dockingState.endgameDock) tempScore += 6
    if(dockingState.endgameEngage) tempScore += 4

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
      <Grid container direction="row">
      {/* Row 1 */}
        {/* Row 1 Grid 1 */}
        <Grid item>
          <CobeCard variant="outlined" style={{ backgroundColor: score.cone_1_1 ? 'orange' : 'inherit'}}>
            <CardActionArea onClick={e => setScore({...score, cone_1_1: !score.cone_1_1})}>
              <ChangeHistory />
            </CardActionArea>
          </CobeCard>
        </Grid>
        <Grid item>
          <CobeCard variant="outlined" style={{ backgroundColor: score.cube_1_2 ? 'purple' : 'inherit'}}>
            <CardActionArea onClick={e => setScore({...score, cube_1_2: !score.cube_1_2})}>
              <CropSquare />
            </CardActionArea>
          </CobeCard>
        </Grid>
        <Grid item>
          <CobeCard variant="outlined" style={{ backgroundColor: score.cone_1_3 ? 'orange' : 'inherit'}}>
            <CardActionArea onClick={e => setScore({...score, cone_1_3: !score.cone_1_3})}>
              <ChangeHistory />
            </CardActionArea>
          </CobeCard>
        </Grid>
        {/* Row 1 Grid 2 */}
        <Grid item>
          <CobeCard variant="outlined" style={{ backgroundColor: score.cone_1_4 ? 'orange' : 'inherit'}}>
            <CardActionArea onClick={e => setScore({...score, cone_1_4: !score.cone_1_4})}>
              <ChangeHistory />
            </CardActionArea>
          </CobeCard>
        </Grid>
        <Grid item>
          <CobeCard variant="outlined" style={{ backgroundColor: score.cube_1_5 ? 'purple' : 'inherit'}}>
            <CardActionArea onClick={e => setScore({...score, cube_1_5: !score.cube_1_5})}>
              <CropSquare />
            </CardActionArea>
          </CobeCard>
        </Grid>
        <Grid item>
          <CobeCard variant="outlined" style={{ backgroundColor: score.cone_1_6 ? 'orange' : 'inherit'}}>
            <CardActionArea onClick={e => setScore({...score, cone_1_6: !score.cone_1_6})}>
              <ChangeHistory />
            </CardActionArea>
          </CobeCard>
        </Grid>
        {/* Row 1 Grid 3 */}
        <Grid item>
          <CobeCard variant="outlined" style={{ backgroundColor: score.cone_1_7 ? 'orange' : 'inherit'}}>
            <CardActionArea onClick={e => setScore({...score, cone_1_7: !score.cone_1_7})}>
              <ChangeHistory />
            </CardActionArea>
          </CobeCard>
        </Grid>
        <Grid item>
          <CobeCard variant="outlined" style={{ backgroundColor: score.cube_1_8 ? 'purple' : 'inherit'}}>
            <CardActionArea onClick={e => setScore({...score, cube_1_8: !score.cube_1_8})}>
              <CropSquare />
            </CardActionArea>
          </CobeCard>
        </Grid>
        <Grid item>
          <CobeCard variant="outlined" style={{ backgroundColor: score.cone_1_9 ? 'orange' : 'inherit'}}>
            <CardActionArea onClick={e => setScore({...score, cone_1_9: !score.cone_1_9})}>
              <ChangeHistory />
            </CardActionArea>
          </CobeCard>
        </Grid>
      </Grid>
      <Grid container direction="row">
      {/* Row 2 */}
        {/* Row 2 Grid 1 */}
        <Grid item>
          <CobeCard variant="outlined" style={{ backgroundColor: score.cone_2_1 ? 'orange' : 'inherit'}}>
            <CardActionArea onClick={e => setScore({...score, cone_2_1: !score.cone_2_1})}>
              <ChangeHistory />
            </CardActionArea>
          </CobeCard>
        </Grid>
        <Grid item>
          <CobeCard variant="outlined" style={{ backgroundColor: score.cube_2_2 ? 'purple' : 'inherit'}}>
            <CardActionArea onClick={e => setScore({...score, cube_2_2: !score.cube_2_2})}>
              <CropSquare />
            </CardActionArea>
          </CobeCard>
        </Grid>
        <Grid item>
          <CobeCard variant="outlined" style={{ backgroundColor: score.cone_2_3 ? 'orange' : 'inherit'}}>
            <CardActionArea onClick={e => setScore({...score, cone_2_3: !score.cone_2_3})}>
              <ChangeHistory />
            </CardActionArea>
          </CobeCard>
        </Grid>
        {/* Row 2 Grid 2 */}
        <Grid item>
          <CobeCard variant="outlined" style={{ backgroundColor: score.cone_2_4 ? 'orange' : 'inherit'}}>
            <CardActionArea onClick={e => setScore({...score, cone_2_4: !score.cone_2_4})}>
              <ChangeHistory />
            </CardActionArea>
          </CobeCard>
        </Grid>
        <Grid item>
          <CobeCard variant="outlined" style={{ backgroundColor: score.cube_2_5 ? 'purple' : 'inherit'}}>
            <CardActionArea onClick={e => setScore({...score, cube_2_5: !score.cube_2_5})}>
              <CropSquare />
            </CardActionArea>
          </CobeCard>
        </Grid>
        <Grid item>
          <CobeCard variant="outlined" style={{ backgroundColor: score.cone_2_6 ? 'orange' : 'inherit'}}>
            <CardActionArea onClick={e => setScore({...score, cone_2_6: !score.cone_2_6})}>
              <ChangeHistory />
            </CardActionArea>
          </CobeCard>
        </Grid>
        {/* Row 2 Grid 3 */}
        <Grid item>
          <CobeCard variant="outlined" style={{ backgroundColor: score.cone_2_7 ? 'orange' : 'inherit'}}>
            <CardActionArea onClick={e => setScore({...score, cone_2_7: !score.cone_2_7})}>
              <ChangeHistory />
            </CardActionArea>
          </CobeCard>
        </Grid>
        <Grid item>
          <CobeCard variant="outlined" style={{ backgroundColor: score.cube_2_8 ? 'purple' : 'inherit'}}>
            <CardActionArea onClick={e => setScore({...score, cube_2_8: !score.cube_2_8})}>
              <CropSquare />
            </CardActionArea>
          </CobeCard>
        </Grid>
        <Grid item>
          <CobeCard variant="outlined" style={{ backgroundColor: score.cone_2_9 ? 'orange' : 'inherit'}}>
            <CardActionArea onClick={e => setScore({...score, cone_2_9: !score.cone_2_9})}>
              <ChangeHistory />
            </CardActionArea>
          </CobeCard>
        </Grid>
      </Grid>
      <Grid container direction="row">
      {/* Row 3 */}
        {/* Row 3 Grid 1 */}
        <Grid item>
          <CobeCard variant="outlined" style={{ backgroundColor: score.cobe_3_1 ? 'pink' : 'inherit'}}>
            <CardActionArea onClick={e => setScore({...score, cobe_3_1: !score.cobe_3_1})}>
              <RadioButtonUnchecked />
            </CardActionArea>
          </CobeCard>
        </Grid>
        <Grid item>
          <CobeCard variant="outlined" style={{ backgroundColor: score.cobe_3_2 ? 'pink' : 'inherit'}}>
            <CardActionArea onClick={e => setScore({...score, cobe_3_2: !score.cobe_3_2})}>
              <RadioButtonUnchecked />
            </CardActionArea>
          </CobeCard>
        </Grid>
        <Grid item>
          <CobeCard variant="outlined" style={{ backgroundColor: score.cobe_3_3 ? 'pink' : 'inherit'}}>
            <CardActionArea onClick={e => setScore({...score, cobe_3_3: !score.cobe_3_3})}>
              <RadioButtonUnchecked />
            </CardActionArea>
          </CobeCard>
        </Grid>
        {/* Row 3 Grid 2 */}
        <Grid item>
          <CobeCard variant="outlined" style={{ backgroundColor: score.cobe_3_4 ? 'pink' : 'inherit'}}>
            <CardActionArea onClick={e => setScore({...score, cobe_3_4: !score.cobe_3_4})}>
              <RadioButtonUnchecked />
            </CardActionArea>
          </CobeCard>
        </Grid>
        <Grid item>
          <CobeCard variant="outlined" style={{ backgroundColor: score.cobe_3_5 ? 'pink' : 'inherit'}}>
            <CardActionArea onClick={e => setScore({...score, cobe_3_5: !score.cobe_3_5})}>
              <RadioButtonUnchecked />
            </CardActionArea>
          </CobeCard>
        </Grid>
        <Grid item>
          <CobeCard variant="outlined" style={{ backgroundColor: score.cobe_3_6 ? 'pink' : 'inherit'}}>
            <CardActionArea onClick={e => setScore({...score, cobe_3_6: !score.cobe_3_6})}>
              <RadioButtonUnchecked />
            </CardActionArea>
          </CobeCard>
        </Grid>
        {/* Row 3 Grid 3 */}
        <Grid item>
          <CobeCard variant="outlined" style={{ backgroundColor: score.cobe_3_7 ? 'pink' : 'inherit'}}>
            <CardActionArea onClick={e => setScore({...score, cobe_3_7: !score.cobe_3_7})}>
              <RadioButtonUnchecked />
            </CardActionArea>
          </CobeCard>
        </Grid>
        <Grid item>
          <CobeCard variant="outlined" style={{ backgroundColor: score.cobe_3_8 ? 'pink' : 'inherit'}}>
            <CardActionArea onClick={e => setScore({...score, cobe_3_8: !score.cobe_3_8})}>
              <RadioButtonUnchecked />
            </CardActionArea>
          </CobeCard>
        </Grid>
        <Grid item>
          <CobeCard variant="outlined" sx={{ backgroundColor: score.cobe_3_9 ? 'pink' : 'inherit'}}>
            <CardActionArea onClick={e => setScore({...score, cobe_3_9: !score.cobe_3_9})}>
              <RadioButtonUnchecked />
            </CardActionArea>
          </CobeCard>
        </Grid>
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
      <Grid item xs={6} mt={2}>
        <FormGroup>
          <FormControlLabel control={<Checkbox checked={dockingState.autoDock} onChange={e => setDockingState({...dockingState, autoDock: !dockingState.autoDock})} />} label="Autonomous Docking" labelPlacement="start"/>
          <FormControlLabel control={<Checkbox checked={dockingState.autoEngage} onChange={e => setDockingState({...dockingState, autoEngage: !dockingState.autoEngage})} />} label="Endgame Docking" labelPlacement="start"/>
        </FormGroup>
      </Grid>
      <Grid item xs={1} mt={2}></Grid>
      <Grid item xs={5} mt={2}>
        <FormGroup>
          <FormControlLabel control={<Checkbox checked={dockingState.endgameDock} onChange={e => setDockingState({...dockingState, endgameDock: !dockingState.endgameDock})} />} label="Engaged?"/>
          <FormControlLabel control={<Checkbox checked={dockingState.endgameEngage} onChange={e => setDockingState({...dockingState, endgameEngage: !dockingState.endgameEngage})} />} label="Engaged?"/>
        </FormGroup>
      </Grid>
    </Grid>
  )
}
