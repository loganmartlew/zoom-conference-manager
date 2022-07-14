// import React, { Component } from 'react';
// import Dialog from '@material-ui/core/Dialog';
// import AppBar from '@material-ui/core/AppBar';
// import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
// import { List, ListItem, ListItemText } from '@material-ui/core/';
// import Button from '@material-ui/core/Button';


// export class Confirm extends Component {
//   continue = e => {
//     e.preventDefault();
//     // PROCESS FORM //
//     console.log("Saved");
//   };

//   back = e => {
//     e.preventDefault();
//     console.log("Back");
//   };

//   override render() {
//     const {
//       values: { name, description, startDate, endDate}
//     } 
//     return (
//       <MuiThemeProvider>
//         <>
//           <Dialog
//             open
//             fullWidth
//             maxWidth='sm'
//           >
//             <AppBar title="Confirm Meeting information" />
//             <List>
//               <ListItem>
//                 <ListItemText primary="Name" secondary={name} />
//               </ListItem>
//               <ListItem>
//                 <ListItemText primary="Description" secondary={description} />
//               </ListItem>
//               <ListItem>
//                 <ListItemText primary="Start Date" secondary={startDate} />
//               </ListItem>
//               <ListItem>
//                 <ListItemText primary="End Date" secondary={endDate} />
//               </ListItem>
//             </List>
//             <br />

//             <Button
//               color="secondary"
//               variant="contained"
//               onClick={this.back}
//             >Back</Button>

//             <Button
//               color="primary"
//               variant="contained"
//               onClick={this.continue}
//             >Confirm</Button>
//           </Dialog>
//         </>
//       </MuiThemeProvider>
//     );
//   }
// }

// export default Confirm;