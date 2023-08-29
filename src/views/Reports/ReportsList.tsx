import * as React from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Title from 'components/Title'
import { useEffect, useState } from 'react'
import { getReports } from 'db/connector'
import { ScoreData } from 'views/Scout/ScoutForm'
import { Button, Grid } from '@mui/material'
import { FileDownload } from '@mui/icons-material'

export default function TeamsList() {
  const [reports, setReports] = useState<ScoreData[]>([])

  useEffect(() => {
    const getAllReports = async () => {
      let dbReports = await getReports()
      let docs: ScoreData[] = []
      dbReports?.forEach(doc => {
        docs.push(doc.data() as ScoreData)
      })
      setReports(docs)
    }
    getAllReports()
  }, [])

  const downloadData = () => {
    let rows = []
    rows.push("reported_by, team, event, match, alliance, score, notes, auto, charging, 1_1, 1_2, 1_3, 1_4, 1_5, 1_6, 1_7, 1_8, 1_9, 2_1, 2_2, 2_3, 2_4, 2_5, 2_6, 2_7, 2_8, 2_9, 3_1, 3_2, 3_3, 3_4, 3_5, 3_6, 3_7, 3_8, 3_9, tele, charging, 1_1, 1_2, 1_3, 1_4, 1_5, 1_6, 1_7, 1_8, 1_9, 2_1, 2_2, 2_3, 2_4, 2_5, 2_6, 2_7, 2_8, 2_9, 3_1, 3_2, 3_3, 3_4, 3_5, 3_6, 3_7, 3_8, 3_9")
    reports.forEach(e => {
      let row = []
      row.push(e.reporting_team)
      row.push(e.scouted_team)
      row.push(e.event)
      row.push(e.match)
      row.push(e.alliance)
      row.push(e.total_score)
      row.push(e.details)
      row.push(' ')
      row.push(e.auto_score.charging)
      row.push(e.auto_score.grid.cone_1_1)
      row.push(e.auto_score.grid.cube_1_2)
      row.push(e.auto_score.grid.cone_1_3)
      row.push(e.auto_score.grid.cone_1_4)
      row.push(e.auto_score.grid.cube_1_5)
      row.push(e.auto_score.grid.cone_1_6)
      row.push(e.auto_score.grid.cone_1_7)
      row.push(e.auto_score.grid.cube_1_8)
      row.push(e.auto_score.grid.cone_1_9)
      row.push(e.auto_score.grid.cone_2_1)
      row.push(e.auto_score.grid.cube_2_2)
      row.push(e.auto_score.grid.cone_2_3)
      row.push(e.auto_score.grid.cone_2_4)
      row.push(e.auto_score.grid.cube_2_5)
      row.push(e.auto_score.grid.cone_2_6)
      row.push(e.auto_score.grid.cone_2_7)
      row.push(e.auto_score.grid.cube_2_8)
      row.push(e.auto_score.grid.cone_2_9)
      row.push(e.auto_score.grid.cobe_3_1)
      row.push(e.auto_score.grid.cobe_3_2)
      row.push(e.auto_score.grid.cobe_3_3)
      row.push(e.auto_score.grid.cobe_3_4)
      row.push(e.auto_score.grid.cobe_3_5)
      row.push(e.auto_score.grid.cobe_3_6)
      row.push(e.auto_score.grid.cobe_3_7)
      row.push(e.auto_score.grid.cobe_3_8)
      row.push(e.auto_score.grid.cobe_3_9)
      row.push(' ')
      row.push(e.tele_score.charging)
      row.push(e.tele_score.grid.cone_1_1)
      row.push(e.tele_score.grid.cube_1_2)
      row.push(e.tele_score.grid.cone_1_3)
      row.push(e.tele_score.grid.cone_1_4)
      row.push(e.tele_score.grid.cube_1_5)
      row.push(e.tele_score.grid.cone_1_6)
      row.push(e.tele_score.grid.cone_1_7)
      row.push(e.tele_score.grid.cube_1_8)
      row.push(e.tele_score.grid.cone_1_9)
      row.push(e.tele_score.grid.cone_2_1)
      row.push(e.tele_score.grid.cube_2_2)
      row.push(e.tele_score.grid.cone_2_3)
      row.push(e.tele_score.grid.cone_2_4)
      row.push(e.tele_score.grid.cube_2_5)
      row.push(e.tele_score.grid.cone_2_6)
      row.push(e.tele_score.grid.cone_2_7)
      row.push(e.tele_score.grid.cube_2_8)
      row.push(e.tele_score.grid.cone_2_9)
      row.push(e.tele_score.grid.cobe_3_1)
      row.push(e.tele_score.grid.cobe_3_2)
      row.push(e.tele_score.grid.cobe_3_3)
      row.push(e.tele_score.grid.cobe_3_4)
      row.push(e.tele_score.grid.cobe_3_5)
      row.push(e.tele_score.grid.cobe_3_6)
      row.push(e.tele_score.grid.cobe_3_7)
      row.push(e.tele_score.grid.cobe_3_8)
      row.push(e.tele_score.grid.cobe_3_9)
      rows.push(row.join(','))
    })
    let csvContent = "data:text/csv;charset=utf-8," 
    + rows.join("\n")
    console.log(csvContent)
    let encodedUri = encodeURI(csvContent)
    window.open(encodedUri)
  }

  return (
    <React.Fragment>
      <Grid container>
        <Grid item xs={4}></Grid>
        <Grid item xs={4}>
          <Title>Reports</Title>
        </Grid>
        <Grid item xs={4} textAlign="right">
          <Button
            variant="contained"
            startIcon={<FileDownload />}
            onClick={downloadData}
          >Download</Button>
        </Grid>
      </Grid>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Reported By</TableCell>
            <TableCell>Team</TableCell>
            <TableCell>Event</TableCell>
            <TableCell>Match</TableCell>
            <TableCell>Alliance</TableCell>
            <TableCell align="right">Score</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {reports.map((row: ScoreData, index: number) => (
            <TableRow key={index}>
              <TableCell>{row.reporting_team}</TableCell>
              <TableCell>{row.scouted_team}</TableCell>
              <TableCell>{row.event}</TableCell>
              <TableCell>{row.match}</TableCell>
              <TableCell>{row.alliance}</TableCell>
              <TableCell align="right">{`${row.total_score}`}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  )
}
