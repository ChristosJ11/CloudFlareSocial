import React, { useState, useEffect} from 'react';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import SendIcon from '@mui/icons-material/Send';
import axios from "axios"
const baseURL='https://myapp.christosjoseph111643.workers.dev/'
function Post({user, postuser, title, img, caption, comments, numLikes, whoLiked, type}) {
    const[myComment, changeMyComment]= useState('')
    const[likeState, changeLikeState]= useState(false)
    const[likeCount, changeLikeCount]=useState(numLikes)
    const like= async ()=>{
        const data={
            title:title,
            username:user,
        }
        await axios.post(`${baseURL}like`,data)
        
      if(whoLiked.includes(user)){
          changeLikeCount(likeCount-1)
          const x= whoLiked.indexOf(user)
          whoLiked.splice(x,1)  
      }else{
          changeLikeCount(likeCount+1)
          whoLiked.push(user)
      }
      changeLikeState(!likeState)
    }
    const sendComment= async ()=>{
        const data={
            title:title,
            username:user,
            text:myComment
        }
        await axios.post(`${baseURL}comment`, data )
        comments.push(data)
        changeMyComment('')
        
    }
    
    return (
        <div className='postBody' >
            <div className='User'><div className='smallFont'> {postuser}</div></div>
            <div className='Title'> <div className='smallerFont'>{title}</div></div>
            {type=='img'?<img src={img} className='postImg'/>:<div className='txtBox'>{caption}</div>}
            {type=='img'?  <div className='caption'>{caption}</div>: <div></div>}
            <div className='like'>
                {whoLiked ? 
             <IconButton  aria-label="Like" onClick={like} >
                  {whoLiked.includes(user) ?  <FavoriteIcon   sx={{color:"red", fontSize:"2vw"}} />
                  :<FavoriteBorderIcon   sx={{color:"red", fontSize:"2vw"}} /> }
              
                 
             </IconButton>
               : <div></div>}
            {numLikes} Likes
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
            sx={{width:'100%', height:'100%'}} maxRows='1' minRows='1'/> 
               </div>
               <div className='commentButton' >
               <IconButton  aria-label="Comment" onClick={sendComment} >
                   <SendIcon   sx={{color:"blue", fontSize:"2vw"}} />
               </IconButton>
               </div>
               </div>
           </div>
        </div>
    )
}

export default Post
