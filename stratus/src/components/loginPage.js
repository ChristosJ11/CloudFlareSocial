import '../App.css';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
function loginPage() {
  return (
    <div >
        <div className='loginParent' >
        <Stack
        direction="row"
        divider={<Divider orientation="vertical" flexItem />}
        spacing={2}
      >
        <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '35vw' },
        '& button': { m: 1 ,width:'35vw'},
        justifyContent:'center',
        width:'50vw',
        height:'100vh',
        display: 'flex',
      flexDirection: 'column',
      }}
      noValidate
      autoComplete="off"
    >
        <div className='largeFont'>Sign Up</div>
        <TextField
         
          id="filled-password-input"
          label="Username"
          autoComplete="current-password"
          variant="filled"
        />
         <TextField
          
          id="filled-password-input"
          label="Password"
          type="password"
          autoComplete="current-password"
          variant="filled"
        />
         <Button variant="outlined" size="large">
          Sign Up
        </Button>
        </Box>

        <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '35vw' },
        '& button': { m: 1 ,width:'35vw'},
        justifyContent:'center',
        
        width:'50vw',
        height:'100vh',
        display: 'flex',
      flexDirection: 'column',
      }}
      noValidate
      autoComplete="off"
    >
         <Button variant="outlined" size="large">
          Sign In
        </Button>
        <TextField
        
          id="filled-password-input"
          label="Username"
          autoComplete="current-password"
          variant="filled"
        />
         <TextField
          
          id="filled-password-input"
          label="Password"
          type="password"
          autoComplete="current-password"
          variant="filled"
        />
        <div className='largeFont'>Sign In</div>
        </Box>
        </Stack>
        </div>
     
    </div>
  );
}

export default loginPage;