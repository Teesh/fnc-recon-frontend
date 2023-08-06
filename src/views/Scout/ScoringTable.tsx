import {Card, CardActionArea, Divider, FilledInput, Grid, Icon, IconButton, InputAdornment, Paper, Table, TableBody, TableCell, TableContainer, TableRow, ToggleButton, ToggleButtonGroup } from "@mui/material"
import { styled } from '@mui/material/styles'
import { Add, Remove } from '@mui/icons-material'
import { ChargingMode, ScoreSheet, ScoringGrid, GamePiece } from "./ScoutForm"
import { type } from "os"
import e from "express"

const CobeCard = styled(Card)({
  borderRadius: 0,
  height: '100%'
})

const CobeGrid = styled(Grid)({
  width: window.innerWidth <= 768 ? 'calc(100% / 3)' : 'calc(100% / 9)',
})

type ScoringTableProps = {
  score: ScoreSheet
  autoScore?: ScoreSheet
  setScore: React.Dispatch<React.SetStateAction<ScoreSheet>>
  flip?: boolean
  teleop?: boolean
}


export default function  ScoringTable(props: ScoringTableProps) {
  const makeGridItem = (i: number, j: number, grid: any[]) => {
    let gamePiece, color, shape, disabled = false
    if (j > 2) {
      gamePiece = 'cobe'
    } else if (i === 2 || i === 5 || i === 8) {
      gamePiece = 'cube'
      color = 'purple'
      shape = 'crop_square'
    } else {
      gamePiece = 'cone'
      color = 'orange'
      shape = 'change_history'
    }

    let key = `${gamePiece}_${j}_${i}`

    if (j > 2) {
      switch(props.score.grid[key as keyof ScoringGrid]) {
        case 0: shape = 'radio_button_unchecked'
          break
        case 1: color = 'orange'
          shape = 'change_history'
          break
        case 2: color = 'purple'
          shape = 'crop_square'
          break
        default: shape = 'radio_button_unchecked'
          break
      }
    }

    if (props.autoScore?.grid[key as keyof ScoringGrid]) {
      color = 'green'
      disabled = true
    }

    grid.push({
      i,
      j,
      key,
      shape,
      color,
      disabled
    })
  }

  const makeGrid = (mobile: boolean) => {
    let grid: any[] = []
    if (mobile) {
      for (let i = 1; i <= 9; i++) {
        if (props.flip) {
          for (let j = 3; j >= 1; j--) {
            makeGridItem(i, j, grid)
          }
        } else {
          for (let j = 1; j <= 3; j++) {
            makeGridItem(i, j, grid)
          }
        }
      }
    } else {
      for (let j = 1; j <= 3; j++) {
        for (let i = 1; i <= 9; i++) {
          makeGridItem(i, j, grid)
        }
      }
    }
    return grid
  }

  return (
    <Grid container>
      <Grid container spacing={0} mb={2}>
      {
        window.innerWidth <= 768 &&
          <Grid container>
            <CobeGrid>
              <CobeCard>{props.flip ? 'Hybrid' : 'High'}</CobeCard>
            </CobeGrid>
            <CobeGrid>
              <CobeCard>Mid</CobeCard>
            </CobeGrid>
            <CobeGrid>
              <CobeCard>{props.flip ? 'High' : 'Hybrid'}</CobeCard>
            </CobeGrid>
          </Grid>
      }
      {
        makeGrid(window.innerWidth <= 768).map(({i, j, key, shape, color, disabled}) => {
          return (
            <CobeGrid item key={key}>
              <CobeCard variant="outlined" style={{ backgroundColor: props.score.grid[key as keyof ScoringGrid] || disabled ? color : 'inherit'}}>
                <CardActionArea onClick={e => {
                    console.log(key)
                    props.setScore({...props.score, grid: { ...props.score.grid, [key]: j < 3 ? !props.score.grid[key as keyof ScoringGrid] : ++props.score.grid[key as keyof ScoringGrid] % 3}})}
                  } sx={{ padding: '36%', position: 'relative' }} disabled={disabled}>
                  <Icon>{ shape }</Icon>
                </CardActionArea>
              </CobeCard>
            </CobeGrid>
          )
        })
      }
      </Grid>
      
      <Grid item xs={12} mb={2}>
        <Divider />
      </Grid>
      <Grid item xs={12} mb={2}>
        <ToggleButtonGroup
            value={props.score.charging}
            size="large"
            onChange={(e,v) => props.setScore({...props.score, charging: v})}
            exclusive={props.teleop}
            fullWidth
            style={{flexDirection: (screenWidth < 660)?("column"):("row"), justifyContent: "space-between",}}
          >
            <ToggleButton color="warning" value="none" style={{border: (screenWidth < 660)?("1px solid grey"):(""), borderRadius: (screenWidth < 660)?("5px"):("")}}>None</ToggleButton>
            <ToggleButton color="error" value="attempted" style={{border: (screenWidth < 660)?("1px solid grey"):(""), borderRadius: (screenWidth < 660)?("5px"):("")}}>Attempted</ToggleButton>
            <ToggleButton color="secondary" value="parked" style={{border: (screenWidth < 660)?("1px solid grey"):(""), borderRadius: (screenWidth < 660)?("5px"):("")}}>{props.teleop ? 'Parked' : 'Left Community'}</ToggleButton>
            <ToggleButton color="info" value="docked" style={{border: (screenWidth < 660)?("1px solid grey"):(""), borderRadius: (screenWidth < 660)?("5px"):("")}}>Docked</ToggleButton>
            <ToggleButton color="success" value="engaged" style={{border: (screenWidth < 660)?("1px solid grey"):(""), borderRadius: (screenWidth < 660)?("5px"):("")}}>Engaged</ToggleButton>
          </ToggleButtonGroup>
      </Grid>
      <Grid item xs={12} mb={2}>
        <Divider />
      </Grid>
      
      <Grid item xs={12} mb={2}>
        <TableContainer component={Paper}>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell>Misses</TableCell>
                <TableCell align="center">Cones</TableCell>
                <TableCell align="center">Cubes</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>High</TableCell>
                <TableCell align="center">
                 <FilledInput
                    inputProps={{min: 0, style: { textAlign: 'center' }}}
                    value={props.score.misses.cone_high}
                    startAdornment={
                      <InputAdornment position="start">
                        <IconButton edge="start"
                          onClick={e => {props.setScore({...props.score, misses: { ...props.score.misses, cone_high: props.score.misses.cone_high+1}})}}
                        ><Add /></IconButton>
                      </InputAdornment>
                    }
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton edge="end"
                          onClick={e => {props.setScore({...props.score, misses: { ...props.score.misses, cone_high: Math.max(props.score.misses.cone_high-1, 0)}})}}
                        ><Remove /></IconButton>
                      </InputAdornment>
                    }
                  />
                </TableCell>
                <TableCell align="center">
                  <FilledInput
                    inputProps={{min: 0, style: { textAlign: 'center' }}}
                    value={props.score.misses.cube_high}
                    startAdornment={
                      <InputAdornment position="start">
                        <IconButton edge="start"
                          onClick={e => {props.setScore({...props.score, misses: { ...props.score.misses, cube_high: props.score.misses.cube_high+1}})}}
                        ><Add /></IconButton>
                      </InputAdornment>
                    }
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton edge="end"
                          onClick={e => {props.setScore({...props.score, misses: { ...props.score.misses, cube_high: Math.max(props.score.misses.cube_high-1, 0)}})}}
                        ><Remove /></IconButton>
                      </InputAdornment>
                    }
                  />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Mid</TableCell>
                <TableCell align="center">
                  <FilledInput
                    inputProps={{min: 0, style: { textAlign: 'center' }}}
                    value={props.score.misses.cone_mid}
                    startAdornment={
                      <InputAdornment position="start">
                        <IconButton edge="start"
                          onClick={e => {props.setScore({...props.score, misses: { ...props.score.misses, cone_mid: props.score.misses.cone_mid+1}})}}
                        ><Add /></IconButton>
                      </InputAdornment>
                    }
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton edge="end"
                          onClick={e => {props.setScore({...props.score, misses: { ...props.score.misses, cone_mid: Math.max(props.score.misses.cone_mid-1, 0)}})}}
                        ><Remove /></IconButton>
                      </InputAdornment>
                    }
                  />
                </TableCell>
                <TableCell align="center">
                  <FilledInput
                    inputProps={{min: 0, style: { textAlign: 'center' }}}
                    value={props.score.misses.cube_mid}
                    startAdornment={
                      <InputAdornment position="start">
                        <IconButton edge="start"
                          onClick={e => {props.setScore({...props.score, misses: { ...props.score.misses, cube_mid: props.score.misses.cube_mid+1}})}}
                        ><Add /></IconButton>
                      </InputAdornment>
                    }
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton edge="end"
                          onClick={e => {props.setScore({...props.score, misses: { ...props.score.misses, cube_mid: Math.max(props.score.misses.cube_mid-1, 0)}})}}
                        ><Remove /></IconButton>
                      </InputAdornment>
                    }
                  />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Low</TableCell>
                <TableCell align="center">
                  <FilledInput
                    inputProps={{min: 0, style: { textAlign: 'center' }}}
                    value={props.score.misses.cone_low}
                    startAdornment={
                      <InputAdornment position="start">
                        <IconButton edge="start"
                          onClick={e => {props.setScore({...props.score, misses: { ...props.score.misses, cone_low: props.score.misses.cone_low+1}})}}
                        ><Add /></IconButton>
                      </InputAdornment>
                    }
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton edge="end"
                          onClick={e => {props.setScore({...props.score, misses: { ...props.score.misses, cone_low: Math.max(props.score.misses.cone_low-1, 0)}})}}
                        ><Remove /></IconButton>
                      </InputAdornment>
                    }
                  />
                </TableCell>
                <TableCell align="center">
                  <FilledInput
                    inputProps={{min: 0, style: { textAlign: 'center' }}}
                    value={props.score.misses.cube_low}
                    startAdornment={
                      <InputAdornment position="start">
                        <IconButton edge="start"
                          onClick={e => {props.setScore({...props.score, misses: { ...props.score.misses, cube_low: props.score.misses.cube_low+1}})}}
                        ><Add /></IconButton>
                      </InputAdornment>
                    }
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton edge="end"
                          onClick={e => {props.setScore({...props.score, misses: { ...props.score.misses, cube_low: Math.max(props.score.misses.cube_low-1, 0)}})}}
                        ><Remove /></IconButton>
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
                <TableCell align="center">Grabbed</TableCell>
                <TableCell align="center">Missed</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Single</TableCell>
                <TableCell align="center">
                  <FilledInput
                    inputProps={{min: 0, style: { textAlign: 'center' }}}
                    value={props.score.intakes.single_grabbed}
                    startAdornment={
                      <InputAdornment position="start">
                        <IconButton edge="start"
                          onClick={e => {props.setScore({...props.score, intakes: { ...props.score.intakes, single_grabbed: props.score.intakes.single_grabbed+1}})}}
                        ><Add /></IconButton>
                      </InputAdornment>
                    }
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton edge="end"
                          onClick={e => {props.setScore({...props.score, intakes: { ...props.score.intakes, single_grabbed: Math.max(props.score.intakes.single_grabbed-1, 0)}})}}
                        ><Remove /></IconButton>
                      </InputAdornment>
                    }
                  />
                </TableCell>
                <TableCell align="center">
                  <FilledInput
                    inputProps={{min: 0, style: { textAlign: 'center' }}}
                    value={props.score.intakes.single_missed}
                    startAdornment={
                      <InputAdornment position="start">
                        <IconButton edge="start"
                          onClick={e => {props.setScore({...props.score, intakes: { ...props.score.intakes, single_missed: props.score.intakes.single_missed+1}})}}
                        ><Add /></IconButton>
                      </InputAdornment>
                    }
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton edge="end"
                          onClick={e => {props.setScore({...props.score, intakes: { ...props.score.intakes, single_missed: Math.max(props.score.intakes.single_missed-1, 0)}})}}
                        ><Remove /></IconButton>
                      </InputAdornment>
                    }
                  />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Double</TableCell>
                <TableCell align="center">
                  <FilledInput
                    inputProps={{min: 0, style: { textAlign: 'center' }}}
                    value={props.score.intakes.double_grabbed}
                    startAdornment={
                      <InputAdornment position="start">
                        <IconButton edge="start"
                          onClick={e => {props.setScore({...props.score, intakes: { ...props.score.intakes, double_grabbed: props.score.intakes.double_grabbed+1}})}}
                        ><Add /></IconButton>
                      </InputAdornment>
                    }
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton edge="end"
                          onClick={e => {props.setScore({...props.score, intakes: { ...props.score.intakes, double_grabbed: Math.max(props.score.intakes.double_grabbed-1, 0)}})}}
                        ><Remove /></IconButton>
                      </InputAdornment>
                    }
                  />
                </TableCell>
                <TableCell align="center">
                  <FilledInput
                    inputProps={{min: 0, style: { textAlign: 'center' }}}
                    value={props.score.intakes.double_missed}
                    startAdornment={
                      <InputAdornment position="start">
                        <IconButton edge="start"
                          onClick={e => {props.setScore({...props.score, intakes: { ...props.score.intakes, double_missed: props.score.intakes.double_missed+1}})}}
                        ><Add /></IconButton>
                      </InputAdornment>
                    }
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton edge="end"
                          onClick={e => {props.setScore({...props.score, intakes: { ...props.score.intakes, double_missed: Math.max(props.score.intakes.double_missed-1, 0)}})}}
                        ><Remove /></IconButton>
                      </InputAdornment>
                    }
                  />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Floor</TableCell>
                <TableCell align="center">
                  <FilledInput
                    inputProps={{min: 0, style: { textAlign: 'center' }}}
                    value={props.score.intakes.floor_grabbed}
                    startAdornment={
                      <InputAdornment position="start">
                        <IconButton edge="start"
                          onClick={e => {props.setScore({...props.score, intakes: { ...props.score.intakes, floor_grabbed: props.score.intakes.floor_grabbed+1}})}}
                        ><Add /></IconButton>
                      </InputAdornment>
                    }
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton edge="end"
                          onClick={e => {props.setScore({...props.score, intakes: { ...props.score.intakes, floor_grabbed: Math.max(props.score.intakes.floor_grabbed-1, 0)}})}}
                        ><Remove /></IconButton>
                      </InputAdornment>
                    }
                  />
                </TableCell>
                <TableCell align="center">
                  <FilledInput
                    inputProps={{min: 0, style: { textAlign: 'center' }}}
                    value={props.score.intakes.floor_missed}
                    startAdornment={
                      <InputAdornment position="start">
                        <IconButton edge="start"
                          onClick={e => {props.setScore({...props.score, intakes: { ...props.score.intakes, floor_missed: props.score.intakes.floor_missed+1}})}}
                        ><Add /></IconButton>
                      </InputAdornment>
                    }
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton edge="end"
                          onClick={e => {props.setScore({...props.score, intakes: { ...props.score.intakes, floor_missed: Math.max(props.score.intakes.floor_missed-1, 0)}})}}
                        ><Remove /></IconButton>
                      </InputAdornment>
                    }
                  />
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  )
}