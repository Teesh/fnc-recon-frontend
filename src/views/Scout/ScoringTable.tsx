import {Card, CardActionArea, Divider, FilledInput, Grid, Icon, IconButton, InputAdornment, Paper, Table, TableBody, TableCell, TableContainer, TableRow, ToggleButton, ToggleButtonGroup } from "@mui/material"
import { styled } from '@mui/material/styles'
import { Add, Remove } from '@mui/icons-material';
import { ScoreSheet, ScoringGrid } from "./ScoutForm";

const CobeCard = styled(Card)({
  borderRadius: 0,
  height: '100%'
})

const CobeGrid = styled(Grid)({
  width: 'calc(100% / 9)',
})

type ScoringTableProps = {
  score: ScoreSheet
  autoScore?: ScoreSheet
  setScore: React.Dispatch<React.SetStateAction<ScoreSheet>>
  teleop?: boolean
}

export default function  ScoringTable(props: ScoringTableProps) {
  return (
    <Grid container>
      <Grid container spacing={0} mb={2}>
      { 
        Object.values(props.score.grid).map((value: boolean, index: number) => {
          let disabled = false
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
          if (props.autoScore?.grid[key as keyof ScoringGrid]) {
            color = 'green'
            disabled = true
          }
          return (
            <CobeGrid item key={key}>
              <CobeCard variant="outlined" style={{ backgroundColor: props.score.grid[key as keyof ScoringGrid] || disabled ? color : 'inherit'}}>
                <CardActionArea onClick={e => props.setScore({...props.score, grid: { ...props.score.grid, [key]: !props.score.grid[key as keyof ScoringGrid]}})} sx={{ padding: '36%', position: 'relative' }} disabled={disabled}>
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
            exclusive
            size="large"
            onChange={(e,v) => props.setScore({...props.score, charging: v})}
            fullWidth
          >
            <ToggleButton color="warning" value="none">None</ToggleButton>
            <ToggleButton color="error" value="attempted">Attempted</ToggleButton>
            <ToggleButton color="secondary" value="parked">Parked</ToggleButton>
            <ToggleButton color="info" value="docked">Docked</ToggleButton>
            <ToggleButton color="success" value="engaged">Engaged</ToggleButton>
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