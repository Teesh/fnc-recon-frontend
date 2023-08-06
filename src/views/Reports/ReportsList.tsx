import * as React from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Title from 'components/Title'
import { useEffect, useState } from 'react'
import { getReports } from 'db/connector'
import { NewReport } from 'db/connector'

export default function TeamsList() {
  const [reports, setReports] = useState<NewReport[]>([])

  useEffect(() => {
    const getAllReports = async () => {
      let dbReports = await getReports()
      if (dbReports) setReports(dbReports.data())
    }
    getAllReports()
  }, [])

  return (
    <React.Fragment>
      <Title>Reports</Title>
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
          {reports.map((row: Report) => (
            <TableRow key={row.id}>
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
