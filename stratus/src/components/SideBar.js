import '../App.css';
import React, { useState, useEffect, useContext } from 'react';
import AddBoxIcon from '@mui/icons-material/AddBox';
import axios from "axios"
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';



function SideBar({user, timeToPost}) {
    const baseURL='http://127.0.0.1:8787/'
    const[file, changeFile]= useState(null)
    const[sendFile, changeSendFile]= useState(true)
    const[sfile, schangeFile]= useState(null)
    const[imgSrc, changeImg]= useState(null)
    const[edit, changeEdit]= useState(false)
    const[post, changePost]= useState(false)
    const[description, changeDescr]= useState('Click the edit button to change the description')
    const activateSlideOver= ()=> {
         changePost(!post)
         timeToPost(post)
    }

    const editActivate =()=>{
        changeEdit(!edit)
    }
    useEffect(()=>{

    },[edit])
    const updatePage =()=>{
      
        axios.get(`${baseURL}signedUp`,{
            params:{
              username: user
            }
          }).then(function(response){
              schangeFile(response.data.profileImage)
              changeDescr(response.data.profileDescription)
        })
    }
    useEffect(()=>{
     updatePage()
    },[])
    useEffect(()=>{
        changeImg(sfile)
      },[sfile])
    const fileUploadHandler = async () =>{
        const data= {
            username:user,
           image: file,
        }
        const data2= {
            username:user,
            description: description,
        }
        if( file!=null){
            await axios.post(`${baseURL}profilePic`, data )
        }
       await axios.post(`${baseURL}profileDesc`,data2)
       
        updatePage()
    }
  const fileSelectedHandler = (e) => {
      const reader= new FileReader()
      console.log(e.target.files.length)
      if( e.target.files.length>0){
          changeSendFile(true)
      }else{
          changeSendFile(false)
      }
              reader.readAsDataURL(e.target.files[0])
              reader.onloadend=()=>{
                  changeFile(reader.result)
                  console.log(reader.result)
              }
     
  }

  
  
    return(
        <div className="SideBar">
            <img src={imgSrc} className='profileImage' />
            <div className='editButton'>
                <div className='editMove'>
             <IconButton  aria-label="Edit Profile" onClick={editActivate}>
               <EditIcon />
             </IconButton>
             </div>
            </div>
            <div className='profileName'>
                <div className='smallFont'> {user}</div>
            </div>
            <div className='profileDescription'>
                {edit?  <TextField onChange={(e)=>changeDescr(e.target.value)} value={description} id="outlined-basic"  variant="outlined" multiline sx={{width:'100%'}}
               inputProps={{style: {fontSize:12, lineHeight:1.35 }}}/>:  <TextField onChange={(e)=>changeDescr(e.target.value)} value={description} disabled id="outlined-basic"  variant="outlined" multiline sx={{width:'100%'}}
               inputProps={{style: {fontSize:12, lineHeight:1.35 }}} />}
           
            </div>
            { edit ?<div className='profileimgChange'>
            Change Profile Picture
               <input type='file' onChange={fileSelectedHandler}/>
               <button onClick={fileUploadHandler}>Save Changes</button>
            </div> : <div></div>}
            
            <div className="twoButtons">
               
            <IconButton  aria-label="Add Post" >
                <AddBoxIcon onClick={activateSlideOver} sx={{color:"black", fontSize:"5vw"}}/>
            </IconButton>
             
            </div>
        </div>
    )
}

export default SideBar;