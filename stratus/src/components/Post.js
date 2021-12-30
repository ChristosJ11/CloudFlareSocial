import React, { useState, useEffect} from 'react';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import SendIcon from '@mui/icons-material/Send';
import axios from "axios"
const baseURL='http://127.0.0.1:8787/'
function Post({user, title, img, caption, comments, numLikes, whoLiked, type}) {
    const[myComment, changeMyComment]= useState('')
    const like=()=>{

    }
    const sendComment= async ()=>{
        const data={
            title:title,
            username:user,
            text:myComment
        }
        await axios.post(`${baseURL}comment`, data )
        changeMyComment('')
    }
    useEffect(()=>{
       console.log(caption)
    },[caption])
    return (
        <div className='postBody' >
            <div className='User'><div className='smallFont'> {user}</div></div>
            <div className='Title'> <div className='smallerFont'>{title}</div></div>
            {type=='img'?<img src={img} className='postImg'/>:<div className='txtBox'>{caption}</div>}
            {type=='img'?  <div className='caption'>{caption}</div>: <div></div>}
            <div className='like'>
             <IconButton  aria-label="Like" onClick={like} >
               <FavoriteBorderIcon   sx={{color:"red", fontSize:"2vw"}} />
             </IconButton>
            </div>
           <div className='commentBody'>
               <div className='commentFlow'>
           {comments?comments.map(comment=><div className='actualComment'>
               <div className='commentUserName'> <div className='commentUserFont'>{comment.username}</div></div>
               <div className='commentText'> {comment.text}</div>
               </div>):<div></div>}
               </div>

               <div className='toComment'> 
               <div className='enterComm'>
               <TextField id="standard-basic" multiline label="Comment" variant="filled" value={myComment}
            onChange={(e)=>changeMyComment(e.target.value)}  inputProps={{style: {fontSize:15, lineHeight:1.35 }}}
            sx={{width:'100%', height:'100%'}} maxRows='2' minRows='2'/> 
               </div>
               <div className='commentButton'>
               <IconButton  aria-label="Like" onClick={like} >
                   <SendIcon   sx={{color:"blue", fontSize:"2vw"}} onClick={sendComment}/>
               </IconButton>
               </div>
               </div>
           </div>
        </div>
    )
}

export default Post
