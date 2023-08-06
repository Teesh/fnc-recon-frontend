import {Card, CardActionArea, Divider, FilledInput, Grid, Icon, IconButton, InputAdornment, Paper, Table, TableBody, TableCell, TableContainer, TableRow, ToggleButton, ToggleButtonGroup } from "@mui/material"
import { styled } from '@mui/material/styles'
import { Add, Remove } from '@mui/icons-material'
import { ScoreSheet, ScoringGrid } from "./ScoutForm"
import { useEffect, useState } from "react"

const CobeCard = styled(Card)({
  borderRadius: 0,
  height: '100%'
})

type ScoringTableProps = {
  score: ScoreSheet
  autoScore?: ScoreSheet
  teleScore?: ScoreSheet
  setScore: React.Dispatch<React.SetStateAction<ScoreSheet>>
  flip?: boolean
  teleop?: boolean
  sw: number
}


export default function  ScoringTable(props: ScoringTableProps) {
  const CobeGrid = styled(Grid)({
    width: props.sw <= 660 ? 'calc(100% / 3)' : 'calc(100% / 9)',
  })

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

    if (props.teleScore?.grid[key as keyof ScoringGrid]) {
      color = 'grey'
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
        props.sw <= 660 &&
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
        props.sw <= 660 && makeGrid(props.sw <= 660).map(({i, j, key, shape, color, disabled}) => {
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
      {
        props.sw > 660 && makeGrid(props.sw <= 660).map(({i, j, key, shape, color, disabled}) => {
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
            orientation={props.sw < 660 ? 'vertical' : 'horizontal'}
          >
            <ToggleButton color="warning" value="none">None</ToggleButton>
            <ToggleButton color="error" value="attempted">Attempted</ToggleButton>
            <ToggleButton color="secondary" value="parked">{props.teleop ? 'Parked' : 'Left Community'}</ToggleButton>
            <ToggleButton color="info" value="docked">Docked</ToggleButton>
            <ToggleButton color="success" value="engaged">Engaged</ToggleButton>
          </ToggleButtonGroup>
      </Grid>
      <Grid item xs={12} mb={2}>
        <Divider />
      </Grid>
    </Grid>
  )
}