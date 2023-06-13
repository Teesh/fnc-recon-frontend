import * as React from 'react'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import { Button } from '@mui/material'
import TablePlusMinus from './TablePlusMinus'
import TableSlider from './TableSlider'
import TableYN from './TableYN'
import TableMultipleChoice from './TableMultipleChoice'
import TitleTitle from './TitleTitle'
import RedOBlue from './RedOBlue'
import TeamNSelect from './TeamNSelect'

function TeamsContent() {
  return (
    <React.Fragment>
      
      <TitleTitle></TitleTitle>
      
      <TeamNSelect></TeamNSelect>
      <RedOBlue></RedOBlue>
      <TablePlusMinus></TablePlusMinus>
      <TableSlider></TableSlider>
      <TableYN></TableYN>
      <TableMultipleChoice></TableMultipleChoice>
    </React.Fragment>
  )
}

export default function Teams() {
  return <TeamsContent />
}
