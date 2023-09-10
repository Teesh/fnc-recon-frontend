import * as React from 'react'
import { useEffect, useState } from 'react'
import { getReports } from 'db/connector'
import { ChargingMode, GamePiece, ScoreData } from 'views/Scout/ScoutForm'
import { Button, Grid } from '@mui/material'
import { FileDownload } from '@mui/icons-material'
import { Link } from "react-router-dom"
import { DataGrid, GridColDef, GridToolbar } from '@mui/x-data-grid'

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
  high: number,
  mid: number,
  low: number,
  cone: number,
  cube: number,
  auto_score: number,
  auto_charge: number,
  tele_score: number,
  tele_charge: number,
  details: string
}

const columns: GridColDef[] = [
  { field: 'scouted_team', headerName: 'Team', flex: 2 },
  { field: 'event', headerName: 'Event', flex: 4 },
  { field: 'match', headerName: 'Match', flex: 2 },
  { field: 'alliance', headerName: 'Alliance', flex: 2 },
  { field: 'total_score',headerName: 'Score', type: 'number',flex: 2 },
  { field: 'gp',headerName: 'Pieces',type: 'number', flex: 2 },
  { field: 'high',headerName: 'High',type: 'number', flex: 2 },
  { field: 'mid',headerName: 'Mid',type: 'number', flex: 2 },
  { field: 'low',headerName: 'Low',type: 'number', flex: 2 },
  { field: 'cone',headerName: 'Cones',type: 'number', flex: 2 },
  { field: 'cube',headerName: 'Cubes',type: 'number', flex: 2 },
  { field: 'auto_score',headerName: 'Auto Score', type: 'number',flex: 2 },
  { field: 'auto_charge',headerName: 'Auto Charge', type: 'number',flex: 2 },
  { field: 'tele_score',headerName: 'Tele Score', type: 'number',flex: 2 },
  { field: 'tele_charge',headerName: 'Tele Scharge', type: 'number',flex: 2 },
  { field: 'details',headerName: 'Notes', flex: 6 },
]

export default function TeamsList() {
  const [rawData, setRawData] = useState<ScoreDataWithID[]>([])
  const [reports, setReports] = useState<ReportTableData[]>([])
  const [num, setNum] = useState(0);
  
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
      rawData.forEach(e => {
        let row: ReportTableData
        let auto = 0, auto_charge = 0, tele = 0, tele_charge = 0, high = 0, mid = 0, low = 0, cone = 0, cube = 0, link = 0, gp = 0

        if (Array.isArray(e.auto_score.charging)) {
          if(e.auto_score.charging.includes(ChargingMode.Community)) auto_charge = 3
          if(e.auto_score.charging.includes(ChargingMode.Docked)) auto_charge = 8
          else if(e.auto_score.charging.includes(ChargingMode.Engaged)) auto_charge = 12
        }

        Object.entries(e.auto_score.grid).forEach(([k,v],i) => {
          if (v) {
            if (i < 9) {
              high++
              auto+=6
            } else if (i >= 9 && i < 18) {
              mid++
              auto+=4
            } else {
              low++
              auto+=3
            }

            gp++
            if (i < 18 && (i % 9 === 1 || i % 9 === 4 || i % 9 === 7)) cube++
            else if (i < 18) cone++
            else {
              // @ts-ignore
              if (v === GamePiece.Cone) cone++
              else cube++
            }

            if (link === 3) {
              auto += 5
              link = 0
            }
            if (i === 8 || i === 17 || i === 26) link = 0
          }
        })

        if(e.tele_score.charging === ChargingMode.Community) tele_charge = 3
        else if(e.tele_score.charging === ChargingMode.Docked) tele_charge = 8
        else if(e.tele_score.charging === ChargingMode.Engaged) tele_charge = 12

        Object.entries(e.tele_score.grid).forEach(([k,v],i) => {
          if (v) {
            if (i < 9) {
              high++
              tele+=6
            } else if (i >= 9 && i < 18) {
              mid++
              tele+=4
            } else {
              low++
              tele+=3
            }

            gp++
            if (i < 18 && (i % 9 === 1 || i % 9 === 4 || i % 9 === 7)) cube++
            else if (i < 18) cone++
            else {
              // @ts-ignore
              if (v === GamePiece.Cone) cone++
              else cube++
            }

            if (link === 3) {
              tele += 5
              link = 0
            }
            if (i === 8 || i === 17 || i === 26) link = 0
          }
        })

        row = {
          id: e.id,
          scouted_team: e.scouted_team,
          event: e.event,
          match: e.match,
          alliance: e.alliance.charAt(0) === "r" ? "Red" : "Blue",
          total_score: e.total_score,
          gp,
          high,
          mid,
          low,
          cone,
          cube,
          auto_score: auto,
          auto_charge,
          tele_score: tele,
          tele_charge,
          details: e.details
        }

        rows.push(row)
      })

      setReports(rows)
    }

    calculateAggregateData()
  }, [rawData])

  const downloadFlatData = () => {
    let rows = []
    rows.push("reported_by, team, event, match, alliance, score, notes, auto, charging, 1_1, 1_2, 1_3, 1_4, 1_5, 1_6, 1_7, 1_8, 1_9, 2_1, 2_2, 2_3, 2_4, 2_5, 2_6, 2_7, 2_8, 2_9, 3_1, 3_2, 3_3, 3_4, 3_5, 3_6, 3_7, 3_8, 3_9, tele, charging, 1_1, 1_2, 1_3, 1_4, 1_5, 1_6, 1_7, 1_8, 1_9, 2_1, 2_2, 2_3, 2_4, 2_5, 2_6, 2_7, 2_8, 2_9, 3_1, 3_2, 3_3, 3_4, 3_5, 3_6, 3_7, 3_8, 3_9")
    rawData.forEach(e => {
      let row = []
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
        <Grid item xs={4} display="flex" alignItems="center" justifyContent="left">
          <Link to="/scout" ><Button variant="contained" color="secondary">Add Report</Button></Link>
        </Grid>
        <Grid item xs={4} textAlign="center">
          <h1>Reports</h1>
        </Grid>
        <Grid item xs={4} display="flex" justifyContent="right" alignItems="center">
          <Button
            variant="contained"
            startIcon={<FileDownload />}
            onClick={downloadFlatData}
            color="success"
          >Download Raw</Button>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <DataGrid rows={reports} columns={columns} slots={{ toolbar: GridToolbar }} checkboxSelection/>
      </Grid>
    </React.Fragment>
  )
}
