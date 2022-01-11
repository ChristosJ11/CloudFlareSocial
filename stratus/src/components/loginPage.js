import '../App.css';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import TextField from '@mui/material/TextField';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { useState, useEffect } from 'react';
import axios from "axios"
import {useNavigate} from "react-router-dom"
const baseURL='https://myapp.christosjoseph111643.workers.dev/'
function LoginPage({changeuser}) {
  const[user, changeUser]= useState('');
  const[pass, changePass] = useState('');
  const[suser, schangeUser]= useState('');
  const[spass, schangePass] = useState('');
  const[postProg, changePostProg]= useState(0);
  const navigate= useNavigate()
  useEffect( ()=>{
   console.log(postProg)
   if(postProg>=100){
  
      
   }
   
  },[postProg])
  //signIn function
  const Send=(e)=>{
    e.preventDefault()
    if( !user||!pass){
      alert("no username or password entered")
    }
    const userInformation={
      username:user,
      password: pass,
      userId: '',
      posts: [],
      followers:[],
      profileDescription:'',
      profileImage: null
    }
    //Post the user to the database only if it's not already in the database
    axios.get(`${baseURL}signedUp`,{
      params:{
        username: user
      }
    }
      ). then ( function (response){
      if( response.data==''){
        const config = {
          onUploadProgress: function(progressEvent) {
            var percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
            console.log(percentCompleted)
            changePostProg(percentCompleted)
          }
      }
         axios.post(`${baseURL}signedUp`,userInformation, config)
       
      }
      else{
        alert("This user already exists, choose a new username")
        //reset User and Pass
    changeUser('')
    changePass('')
      }
    })
    
  }
  //Sign In function
  const signIn =(e)=>{
      e.preventDefault()
      if( !suser||!spass){
        alert("no username or password entered")
      }
      axios.get(`${baseURL}signedUp`,{
        params:{
          username: suser
        }
      }
        ). then (function (response){
        if( response.data.password== spass){
          console.log(response)
          changeuser(suser)
          navigate("/scrollPage")
        }
        else{
          console.log(response)
          alert("Incorrect username or password")
        }
      })
      
      schangeUser('')
      schangePass('')
  }
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
          value={user}
          onChange={(e)=> changeUser(e.target.value)}
          id="filled-password-input"
          label="Username"
          autoComplete="current-password"
          variant="filled"
        />
         <TextField
          value={pass}
          onChange={(e)=> changePass(e.target.value)}
          id="filled-password-input"
          label="Password"
          type="password"
          autoComplete="current-password"
          variant="filled"
        />
         <Button variant="outlined" size="large" onClick={Send}>
          Sign Up
        </Button>
        <Box sx={{ width: '100%' }}>
      <LinearProgress variant="determinate" value={postProg} />
    </Box>
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
         <Button variant="outlined" size="large" onClick= {signIn}>
          Sign In
        </Button>
        <TextField
          value={suser}
          onChange={(e)=> schangeUser(e.target.value)}
          id="filled-password-input"
          label="Username"
          autoComplete="current-password"
          variant="filled"
        />
         <TextField
          value={spass}
          onChange={(e)=> schangePass(e.target.value)}
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

export default LoginPage;