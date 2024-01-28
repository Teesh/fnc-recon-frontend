import * as React from 'react'
import { useEffect, useState } from 'react'
import { getReports } from 'db/Crescendo/connector'
import { Climbing, ScoreData } from 'views/Scout/Crescendo/ScoutForm'
import { Box, Button, Grid } from '@mui/material'
import { FileDownload } from '@mui/icons-material'
import { Link } from "react-router-dom"
import { DataGrid, GridCellParams, GridColDef, GridToolbar } from '@mui/x-data-grid'
import clsx from 'clsx'
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

type ScoreDataWithID = {
  id: string
} & ScoreData

type ReportTableData = {
  id: string,
  scouted_team: string,
  event: string,
  match: string,
  alliance: string,
  total_score: number,
  gp: number,
  speaker: number,
  amp: number,
  amp_speaker: number,
  trap: number,
  auto_score: number,
  tele_score: number,
  endgame_score: number,
  ground_intake: number,
  source_intake: number,
  details: string
}

const columns: GridColDef[] = [
  { field: 'scouted_team', headerName: 'Team', flex: 2 },
  { field: 'event', headerName: 'Event', flex: 4 },
  { field: 'match', headerName: 'Match',  type: 'number', flex: 2 },
  { field: 'alliance', headerName: 'Alliance', flex: 2, cellClassName: (params: GridCellParams<String>) =>
    clsx('super-app', {
      red: params.value === "Red",
      blue: params.value === "Blue",
    }),
  },
  { field: 'total_score',headerName: 'Score', type: 'number',flex: 2 },
  { field: 'gp',headerName: 'Pieces', type: 'number', flex: 2 },
  { field: 'speaker',headerName: 'Speaker',type: 'number', flex: 2 },
  { field: 'amp',headerName: 'Amp',type: 'number', flex: 2 },
  { field: 'amp_speaker',headerName: 'Amplified Speaker',type: 'number', flex: 2 },
  { field: 'trap',headerName: 'Traps',type: 'number', flex: 2 },
  { field: 'auto_score',headerName: 'Auto', type: 'number',flex: 2 },
  { field: 'tele_score',headerName: 'Teleop', type: 'number',flex: 2 },
  { field: 'endgame_score',headerName: 'Endgame', type: 'number',flex: 2 },
  { field: 'ground_intake',headerName: 'Ground Intakes', type: 'number',flex: 2 },
  { field: 'source_intake',headerName: 'Source Intakes', type: 'number',flex: 2 },
  { field: 'details',headerName: 'Notes', flex: 6 },
]

export default function GraphDashboard() {
  const [rawData, setRawData] = useState<ScoreDataWithID[]>([])
  const [reports, setReports] = useState<ReportTableData[]>([])
  const [data, setData] = useState<any[]>([])
  
  useEffect(() => {
    const getAllReports = async () => {
      let dbReports = await getReports()
      let docs: ScoreDataWithID[] = []
      dbReports?.forEach(doc => {
        docs.push({...doc.data(), id: doc.id} as ScoreDataWithID)
      })
      setRawData(docs)
    }
    getAllReports()
  }, [])

  useEffect(() => {
    const calculateAggregateData = async () => {
      let dbReports = await getReports()
      let docs: any[] = []
      dbReports?.forEach(doc => {
        docs.push({...doc.data(), id: doc.id})
      })

      let rows: ReportTableData[] = []
      let datas: any[] = []
      rawData.forEach(e => {
        console.log(e)
        let row: ReportTableData
        let datum: any
        let endgame = 0
        endgame += e.score.trap*5
        if (e.score.climb === Climbing.Single) endgame += 3
        else if (e.score.climb === Climbing.Double || e.score.climb === Climbing.Triple) endgame += 5
        if (e.score.high_note && (e.score.climb === Climbing.Single || e.score.climb === Climbing.Double || e.score.climb === Climbing.Triple)) endgame += 1

        row = {
          id: e.id,
          scouted_team: e.scouted_team,
          event: e.event,
          match: e.match,
          alliance: e.alliance.charAt(0) === "r" ? "Red" : "Blue",
          total_score: e.total_score,
          gp: e.score.amp + e.score.speaker + e.score.amped_speaker + e.score.auto_amp + e.score.auto_speaker,
          speaker: e.score.speaker,
          amp: e.score.amp,
          amp_speaker: e.score.amped_speaker,
          trap: e.score.trap,
          auto_score: (e.score.leave ? 2 : 0) + e.score.auto_amp*2 + e.score.auto_speaker*5,
          tele_score: e.score.amp + e.score.speaker*2 + e.score.amped_speaker*5,
          endgame_score: endgame,
          ground_intake: e.score.ground_intake,
          source_intake: e.score.source_intake,
          details: e.details
        }

        datum = {
          name: e.match,
          auto: (e.score.leave ? 2 : 0) + e.score.auto_amp*2 + e.score.auto_speaker*5,
          tele: e.score.amp + e.score.speaker*2 + e.score.amped_speaker*5,
          endgame: endgame
        }

        rows.push(row)
        datas.push(datum)
      })

      setReports(rows)

      datas.sort((a,b) => {
        return a.name - b.name;
      })
      setData(datas)
    }

    calculateAggregateData()
  }, [rawData])
  
  return (
    <React.Fragment>
      <Grid container>
        <Grid item xs={12} lg={4} display="flex" alignItems="center" justifyContent="left">
          <Link to="/scout" ><Button variant="contained" color="secondary">Add Report</Button></Link>
        </Grid>
        <Grid item xs={12} lg={4} textAlign="center">
          <h1>Graph</h1>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Box
          sx={{
            width: '100%',
            '& .super-app.red': {
              backgroundColor: 'red',
              color: 'white',
              fontWeight: '600',
            },
            '& .super-app.blue': {
              backgroundColor: 'blue',
              color: 'white',
              fontWeight: '600',
            },
          }}
        >
          <BarChart
            width={500}
            height={300}
            data={data}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="auto" stackId="a" fill="#0000ff" />
            <Bar dataKey="tele" stackId="a" fill="#00dd00" />
            <Bar dataKey="endgame" stackId="a" fill="#ff0000" />
          </BarChart>
        </Box>
      </Grid>
    </React.Fragment>
  )
}