import * as React from 'react'
import Link from '@mui/material/Link'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Title from './Title'
import { useEffect, useState } from 'react'
import teamsList from 'tests/teamList.json'

type Team = {
  key: string,
  team_number: number,
  nickname: string,
  name: string,
  city: string | null,
  state_prov: string | null,
  country: string | null
}

export default function TeamsList() {
  const [teams, setTeams] = useState<Team[]>([])

  useEffect(() => {
    const getTeams = async () => {
      let headers: HeadersInit = new Headers()
      if(process.env.REACT_APP_ENVIRONMENT === 'local') {
        setTeams(teamsList)
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
        let response = await fetch('https://www.thebluealliance.com/api/v3/teams/0/simple', {
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
      <Title>Teams</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Team Numer</TableCell>
            <TableCell>Team Name</TableCell>
            <TableCell>City</TableCell>
            <TableCell align="right">State</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {teams.map((row: Team) => (
            <TableRow key={row.key}>
              <TableCell>{row.team_number}</TableCell>
              <TableCell>{row.nickname}</TableCell>
              <TableCell>{row.city}</TableCell>
              <TableCell align="right">{`${row.state_prov}`}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  )
}