import '../App.css';
import React, { useState, useEffect, useContext } from 'react';
import axios from "axios"
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
const baseURL='https://myapp.christosjoseph111643.workers.dev/'
function PostText({user, closePane}) {
    const[title, changeTitle]= useState('')
    const[caption, changeCaption]=useState('" "')
    const fileUploadHandler = async () =>{
        const data= {
            type: 'txt',
            title: title,
            username:user,
           image: null,
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
                <div className='smallFont'>Type a Tweet or something</div>
                <TextField onChange={(e)=>changeCaption(e.target.value)} value={caption} id="outlined-basic"  variant="outlined" minRows='20' maxRows='20' multiline sx={{width:'100%', height:'100%'}}
               inputProps={{style: {fontSize:15, lineHeight:1.35 }}}/>
            </div>
            <div className='gridImg'></div>
            <div className='gridComment'> </div>
            <div className='gridPost'><Button variant="outlined" onClick={fileUploadHandler}>Post</Button></div>
        </div>
    )
}

export default PostText
