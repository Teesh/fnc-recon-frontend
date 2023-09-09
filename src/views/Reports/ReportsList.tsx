import * as React from 'react'
import Table from '@mui/material/Table'
import Backdrop from '@mui/material/Backdrop';
import Icon from '@mui/material/Icon';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade'
import Typography from '@mui/material/Typography'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Title from 'components/Title'
import { useEffect, useState } from 'react'
import { getReports } from 'db/connector'
import { ChargingMode, GamePiece, ScoreData } from 'views/Scout/ScoutForm'
import { Button, Grid } from '@mui/material'
import { FileDownload } from '@mui/icons-material'

export default function TeamsList() {
  const [reports, setReports] = useState<ScoreData[]>([])
  const [num, setNum] = useState(0);
  
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

  const downloadAggregateData = () => {
    let rows = []
    rows.push("reported_by, team, event, match, alliance, score, game pieces, high, mid, low, cone, cube, auto score, auto charge, tele score, tele charge, notes")
    reports.forEach(e => {
      let row = []
      let auto = 0, auto_charge = 0, tele = 0, tele_charge = 0, high = 0, mid = 0, low = 0, cone = 0, cube = 0, link = 0, gp = 0

      if (Array.isArray(e.auto_score.charging)) {
        if(e.auto_score.charging.includes(ChargingMode.Community)) auto_charge = 3
        if(e.auto_score.charging.includes(ChargingMode.Docked)) auto_charge = 8
        else if(e.auto_score.charging.includes(ChargingMode.Engaged)) auto_charge = 12
      }

      Object.entries(e.auto_score.grid).forEach(([k,v],i) => {
        console.log(v)
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

      row.push(e.scouted_team)
      row.push(e.event)
      row.push(e.match)
      row.push(e.alliance)
      row.push(e.total_score)
      row.push(gp)
      row.push(high)
      row.push(mid)
      row.push(low)
      row.push(cone)
      row.push(cube)
      row.push(auto)
      row.push(auto_charge)
      row.push(tele)
      row.push(tele_charge)
      row.push(e.details)

      rows.push(row.join(','))
    })

    let csvContent = "data:text/csv;charset=utf-8," 
    + rows.join("\n")
    console.log(csvContent)
    let encodedUri = encodeURI(csvContent)
    window.open(encodedUri)
  }

  const downloadFlatData = () => {
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

  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "60vw",
    bgcolor: 'background.paper',
    p: 4,
    borderRadius: "5px"
  };
  
    const [open, setOpen] = React.useState("");
    function handleOpen(id: any){setOpen(id)};
    function handleClose(id: any){setOpen("")};
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
            onClick={downloadFlatData}
            color="success"
          >Download Raw</Button>
          <Button
            variant="contained"
            startIcon={<FileDownload />}
            onClick={downloadAggregateData}
          >Download Aggregate</Button>
        </Grid>
      </Grid>
      <Table size="small">
        <TableHead>
          <TableRow>
            {/*<TableCell>Reported By</TableCell>*/}
            <TableCell style={{fontSize: "1.5vw"}}>Team</TableCell>
            <TableCell style={{fontSize: "1.5vw"}}>Event</TableCell>
            <TableCell style={{fontSize: "1.5vw"}} align="center">Match</TableCell>
            <TableCell style={{fontSize: "1.5vw"}} align="center">Alliance</TableCell>
            <TableCell style={{fontSize: "1.5vw"}} align="center">Score</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {reports.map((row: ScoreData, index: number) => (
            <TableRow key={index}>
              {/*<TableCell>{row.reporting_team}</TableCell>*/}
              <TableCell style={{fontSize: "1.5vw"}}>{row.scouted_team}</TableCell>
              <TableCell style={{fontSize: "1.5vw"}}>{row.event}</TableCell>
              <TableCell style={{fontSize: "1.5vw"}} align="center">{row.match}</TableCell>
              <TableCell style={{fontSize: "1.5vw"}} align="center">{(row.alliance != undefined)?(<span style={{color: row.alliance.substring(0,row.alliance.length -1)}}>{row.alliance.toUpperCase()}</span>):(row.alliance)}</TableCell>
              <TableCell style={{fontSize: "1.5vw"}} align="center">{`${row.total_score}`}</TableCell>
              <TableCell style={{fontSize: "1.5vw"}}>
              <Button onClick={(e)=>{handleOpen(row.alliance + row.match + row.total_score + row.scouted_team + index + "id"); setNum(index)}}>View</Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open == (row.alliance + row.match + row.total_score + row.scouted_team + index + "id")}
        onClose={(e)=>{handleClose(row.alliance + row.match + row.total_score + row.scouted_team + index + "id")}}
        closeAfterTransition
        BackdropComponent={Backdrop} // Use the Backdrop component
        BackdropProps={{
          sx: { backgroundColor: 'rgba(0, 0, 0, 0.1)' }, // Custom backdrop color
        }}
        
      >
        <Fade in={open == (row.alliance + row.match + row.total_score + row.scouted_team + index + "id")}>
          <Box sx={style}>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              <h3 style={{marginTop: "0px", paddingTop: "0px"}}>{reports[num]['scouted_team'] + " (" + reports[num]['alliance'].substring(0,1).toUpperCase() + "" + reports[num]['alliance'].substring(1, reports[num]['alliance'].length -1) + " alliance) - Match " + reports[num]['match']}</h3>
            </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
              <table>
                <tr>
                <td style={{backgroundColor: (reports[num]['auto_score']['grid']['cone_1_1'])?('lightgreen'):((reports[num]['tele_score']['grid']['cone_1_1'])?('lightblue'):(''))}}><Icon>change_history</Icon></td>
                <td style={{backgroundColor: (reports[num]['auto_score']['grid']['cube_1_2'])?('lightgreen'):((reports[num]['tele_score']['grid']['cube_1_2'])?('lightblue'):(''))}}><Icon>crop_square</Icon></td>
                <td style={{backgroundColor: (reports[num]['auto_score']['grid']['cone_1_3'])?('lightgreen'):((reports[num]['tele_score']['grid']['cone_1_3'])?('lightblue'):(''))}}><Icon>change_history</Icon></td>
                <td style={{backgroundColor: (reports[num]['auto_score']['grid']['cone_1_4'])?('lightgreen'):((reports[num]['tele_score']['grid']['cone_1_4'])?('lightblue'):(''))}}><Icon>change_history</Icon></td>
                <td style={{backgroundColor: (reports[num]['auto_score']['grid']['cube_1_5'])?('lightgreen'):((reports[num]['tele_score']['grid']['cube_1_5'])?('lightblue'):(''))}}><Icon>crop_square</Icon></td>
                <td style={{backgroundColor: (reports[num]['auto_score']['grid']['cone_1_6'])?('lightgreen'):((reports[num]['tele_score']['grid']['cone_1_6'])?('lightblue'):(''))}} ><Icon>change_history</Icon></td>
                <td style={{backgroundColor: (reports[num]['auto_score']['grid']['cone_1_7'])?('lightgreen'):((reports[num]['tele_score']['grid']['cone_1_7'])?('lightblue'):(''))}}><Icon>change_history</Icon></td>
                <td style={{backgroundColor: (reports[num]['auto_score']['grid']['cube_1_8'])?('lightgreen'):((reports[num]['tele_score']['grid']['cube_1_8'])?('lightblue'):(''))}}><Icon>crop_square</Icon></td>
                <td style={{backgroundColor: (reports[num]['auto_score']['grid']['cone_1_9'])?('lightgreen'):((reports[num]['tele_score']['grid']['cone_1_9'])?('lightblue'):(''))}}><Icon>change_history</Icon></td>
                </tr>
                <tr>
                <td style={{backgroundColor: (reports[num]['auto_score']['grid']['cone_2_1'])?('lightgreen'):((reports[num]['tele_score']['grid']['cone_2_1'])?('lightblue'):(''))}}><Icon>change_history</Icon></td>
                <td style={{backgroundColor: (reports[num]['auto_score']['grid']['cube_2_2'])?('lightgreen'):((reports[num]['tele_score']['grid']['cube_2_2'])?('lightblue'):(''))}}><Icon>crop_square</Icon></td>
                <td style={{backgroundColor: (reports[num]['auto_score']['grid']['cone_2_3'])?('lightgreen'):((reports[num]['tele_score']['grid']['cone_2_3'])?('lightblue'):(''))}}><Icon>change_history</Icon></td>
                <td style={{backgroundColor: (reports[num]['auto_score']['grid']['cone_2_4'])?('lightgreen'):((reports[num]['tele_score']['grid']['cone_2_4'])?('lightblue'):(''))}}><Icon>change_history</Icon></td>
                <td style={{backgroundColor: (reports[num]['auto_score']['grid']['cube_2_5'])?('lightgreen'):((reports[num]['tele_score']['grid']['cube_2_5'])?('lightblue'):(''))}}><Icon>crop_square</Icon></td>
                <td style={{backgroundColor: (reports[num]['auto_score']['grid']['cone_2_6'])?('lightgreen'):((reports[num]['tele_score']['grid']['cone_2_6'])?('lightblue'):(''))}} ><Icon>change_history</Icon></td>
                <td style={{backgroundColor: (reports[num]['auto_score']['grid']['cone_2_7'])?('lightgreen'):((reports[num]['tele_score']['grid']['cone_2_7'])?('lightblue'):(''))}}><Icon>change_history</Icon></td>
                <td style={{backgroundColor: (reports[num]['auto_score']['grid']['cube_2_8'])?('lightgreen'):((reports[num]['tele_score']['grid']['cube_2_8'])?('lightblue'):(''))}}><Icon>crop_square</Icon></td>
                <td style={{backgroundColor: (reports[num]['auto_score']['grid']['cone_2_9'])?('lightgreen'):((reports[num]['tele_score']['grid']['cone_2_9'])?('lightblue'):(''))}}><Icon>change_history</Icon></td>
                </tr>
                <tr>
                <td style={{backgroundColor: (reports[num]['auto_score']['grid']['cobe_3_1'] != 0)?('lightgreen'):((reports[num]['tele_score']['grid']['cobe_3_2'] != 0)?('lightblue'):(''))}}><Icon>radio_button_unchecked</Icon></td>
                <td style={{backgroundColor: (reports[num]['auto_score']['grid']['cobe_3_2'] != 0)?('lightgreen'):((reports[num]['tele_score']['grid']['cobe_3_2'] != 0)?('lightblue'):(''))}}><Icon>radio_button_unchecked</Icon></td>
                <td style={{backgroundColor: (reports[num]['auto_score']['grid']['cobe_3_3'] != 0)?('lightgreen'):((reports[num]['tele_score']['grid']['cobe_3_3'] != 0)?('lightblue'):(''))}}><Icon>radio_button_unchecked</Icon></td>
                <td style={{backgroundColor: (reports[num]['auto_score']['grid']['cobe_3_4'] != 0)?('lightgreen'):((reports[num]['tele_score']['grid']['cobe_3_4'] != 0)?('lightblue'):(''))}}><Icon>radio_button_unchecked</Icon></td>
                <td style={{backgroundColor: (reports[num]['auto_score']['grid']['cobe_3_5'] != 0)?('lightgreen'):((reports[num]['tele_score']['grid']['cobe_3_5'] != 0)?('lightblue'):(''))}}><Icon>radio_button_unchecked</Icon></td>
                <td style={{backgroundColor: (reports[num]['auto_score']['grid']['cobe_3_6'] != 0)?('lightgreen'):((reports[num]['tele_score']['grid']['cobe_3_6'] != 0)?('lightblue'):(''))}} ><Icon>radio_button_unchecked</Icon></td>
                <td style={{backgroundColor: (reports[num]['auto_score']['grid']['cobe_3_7'] != 0)?('lightgreen'):((reports[num]['tele_score']['grid']['cobe_3_7'] != 0)?('lightblue'):(''))}}><Icon>radio_button_unchecked</Icon></td>
                <td style={{backgroundColor: (reports[num]['auto_score']['grid']['cobe_3_8'] != 0)?('lightgreen'):((reports[num]['tele_score']['grid']['cobe_3_8'] != 0)?('lightblue'):(''))}}><Icon>radio_button_unchecked</Icon></td>
                <td style={{backgroundColor: (reports[num]['auto_score']['grid']['cobe_3_9'] != 0)?('lightgreen'):((reports[num]['tele_score']['grid']['cobe_3_9'] != 0)?('lightblue'):(''))}}><Icon>radio_button_unchecked</Icon></td>
                </tr>
                
              </table>
              <table>
              <tr>
                <td style={{backgroundColor: "lightgreen", width: "25px"}}></td>
                  <td>= auton</td>
                  <td style={{width: "10px"}}></td>
                  <td style={{backgroundColor: "lightblue", width: "25px"}}></td>
                  <td>= teleop</td>
                </tr>
              </table>
              <table><tr><td></td></tr></table>
              <table>
                <tr>
                <td>Auton Charge: </td>
                <td>{reports[num]['auto_score']['charging']}</td>
                </tr>
              </table>
              <table><tr><td></td></tr></table>
              <table>
                <tr>
                <td>Endgame Charge: </td>
                <td>{reports[num]['tele_score']['charging']}</td>
                </tr>
              </table>
              <table><tr><td></td></tr></table>
              <table>
                <tr>
                  <td>
                    <h3>Total Score: </h3>
                  </td>
                  <td>
                    <h3>{reports[num]['total_score']}</h3>
                  </td>
                </tr>
              </table>
            </Typography>
          </Box>
        </Fade>
      </Modal>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  )
}
