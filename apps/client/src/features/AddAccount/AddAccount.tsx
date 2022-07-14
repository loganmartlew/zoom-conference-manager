import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import MuiLink from '@mui/material/Link';
import Container from '@material-ui/core/Container';
import { AppBar } from '@mui/material';
import Toolbar from "@material-ui/core/Toolbar";

export default function addAccount() {

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      fname: data.get('name'),
      email: data.get('email')
    });
  };
  
  return (
    
      <Container component='main' maxWidth='xs'>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
<AppBar position="static">
          <Toolbar>
            <Typography variant="h6">Link New Zoom Account</Typography>
          </Toolbar>
         
</AppBar>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete='given-name'
                  name='name'
                  required
                  fullWidth
                  id='name'
                  label='Name'
                  autoFocus
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id='email'
                  label='Email Address'
                  name='email'
                  autoComplete='email'
                />
              </Grid>
              </Grid>

            <Button
              type='submit'
              fullWidth
              variant='contained'
              sx={{ mt: 3, mb: 2 }}
            >
              Add Zoom Account
              
            </Button>
            <Grid container justifyContent='flex-end'>
              <Grid item>
              <Link to='/'>
              <MuiLink variant='body2'>Return to Dashboard</MuiLink>
                </Link>
                
              </Grid>     
            </Grid>
          </Box>
        </Box>
      </Container>
 

  )

  
}