import * as React from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Title from 'components/Title'
import { useEffect, useState } from 'react'

type Report = {
  id: number,
  reporting_team: number,
  year: number,
  event: string,
  match: string,
  scouted_team: number,
  alliance: number
}

export default function TeamsList() {
  const [reports, setReports] = useState<Report[]>([])

  useEffect(() => {
    if(process.env.REACT_APP_ENVIRONMENT === 'local') {
      // setReports()
    } else {
      const getReports = async () => {
        let headers: HeadersInit = new Headers()
        let response = await fetch('https://fnc-recon-api-avxirbvnfa-ue.a.run.app/reports', {
          method: 'GET'
        })
        setReports(await response.json())
      }

      getReports()
    }
  }, [reports])

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
            <TableCell align="right">Alliance</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {reports.map((row: Report) => (
            <TableRow key={row.id}>
              <TableCell>{row.reporting_team}</TableCell>
              <TableCell>{row.scouted_team}</TableCell>
              <TableCell>{row.event}</TableCell>
              <TableCell>{row.match}</TableCell>
              <TableCell align="right">{`${row.alliance}`}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  )
}