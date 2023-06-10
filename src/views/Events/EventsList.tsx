import * as React from 'react'
import Link from '@mui/material/Link'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Title from './Title'
import { useEffect, useState } from 'react'
import eventsList from 'tests/eventsList.json'

type Event = {
  key: string,
    name: string,
    event_code: string,
    event_type: number,
    district: {
      abbreviation: string,
      display_name: string,
      key: string,
      year: number
    } | null,
    city: string,
    state_prov: string,
    country: string,
    start_date: string,
    end_date: string,
    year: number
}

export default function TeamsList() {
  const [teams, setTeams] = useState<Event[]>([])

  useEffect(() => {
    const getTeams = async () => {
      let headers: HeadersInit = new Headers()
      if(process.env.REACT_APP_ENVIRONMENT === 'local') {
        setTeams(eventsList)
      } else {
        if(process.env.REACT_APP_TBA_READ_API_KEY) {
          headers.set('X-TBA-Auth-Key', process.env.REACT_APP_TBA_READ_API_KEY)
          headers.set('Access-Control-Allow-Origin', '*')
          headers.set('Access-Control-Allow-Credentials', 'true')
          headers.set('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers')
          headers.set('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT')
        } else {
          console.log('Missing API Key')
          return
        }
        let response = await fetch('https://www.thebluealliance.com/api/v3/events/2023/simple', {
          headers: headers,
          method: 'GET'
        })
        setTeams(await response.json())
      }
    }

    getTeams()
  }, [teams])

  return (
    <React.Fragment>
      <Title>Events</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Event Name</TableCell>
            <TableCell>District</TableCell>
            <TableCell>State</TableCell>
            <TableCell align="right">Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {teams.map((row: Event) => (
            <TableRow key={row.key}>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.district ? `${row.district.display_name} District` : row.city}</TableCell>
              <TableCell>{row.state_prov}</TableCell>
              <TableCell align="right">{`${new Date(row.start_date).toLocaleDateString("en-US", { month: "numeric", day: "numeric"})}`}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  )
}