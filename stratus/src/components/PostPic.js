import '../App.css';
import React, { useState, useEffect, useContext } from 'react';
import axios from "axios"
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
const baseURL='http://127.0.0.1:8787/'
function PostPic({user, closePane}) {
    const[title, changeTitle]= useState('')
    const[file, changeFile]= useState(null)
    const[caption, changeCaption]=useState('write a caption for the image')
    const fileSelectedHandler = (e) => {
        const reader= new FileReader()
                reader.readAsDataURL(e.target.files[0])
                reader.onloadend=()=>{
                    changeFile(reader.result)
                    
                }
    }
    const fileUploadHandler = async () =>{
        const data= {
            type: 'img',
            title: title,
            username:user,
           image: file,
           caption: caption,
           numLikes:0,
           likedUsers:[],
           comments:[]
        }
            await axios.post(`${baseURL}posts`, data )
            closePane()
    }
    return (
        <div className='postPicGrid'>
            <div className='gridTitle'>  <TextField id="standard-basic" label="Title" variant="standard" value={title}
            onChange={(e)=>changeTitle(e.target.value)}/> </div>
            <div className='gridUploadImg'>
                <div className='smallFont'>Upload a picture</div>
               <input className='input'type='file' onChange={fileSelectedHandler}/>
            </div>
            <div className='gridImg'> <img className='postImage' src={file}/></div>
            <div className='gridComment'> <TextField onChange={(e)=>changeCaption(e.target.value)} value={caption} id="outlined-basic"  variant="outlined" multiline sx={{width:'100%'}}
               inputProps={{style: {fontSize:12, lineHeight:1.35 }}}/></div>
            <div className='gridPost'><Button variant="outlined" onClick={fileUploadHandler}>Post</Button></div>
        </div>
    )
}

export default PostPic
