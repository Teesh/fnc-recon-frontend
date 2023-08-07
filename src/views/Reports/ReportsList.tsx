import * as React from 'react'
import Table from '@mui/material/Table'
import Backdrop from '@mui/material/Backdrop';
import Icon from '@mui/material/Icon';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Title from 'components/Title'
import { useEffect, useState } from 'react'
import { getReports } from 'db/connector'
import { ScoreData } from 'views/Scout/ScoutForm'

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
     //setReports(docs)
      setReports(docs);
      //console.log(docs)
    }
    getAllReports()
  }, [])

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
  
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
  return (
    <React.Fragment>
      <h1>Reports</h1>
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
              <Button onClick={(e)=>{handleOpen(); setNum(index)}}>View</Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop} // Use the Backdrop component
        BackdropProps={{
          sx: { backgroundColor: 'rgba(0, 0, 0, 0.15)' }, // Custom backdrop color
        }}
        
      >
        <Fade in={open}>
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
