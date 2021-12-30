import { UserContext } from '../App';
import '../App.css';
import React, { useState, useEffect, useContext } from 'react';
import SideBar from './SideBar';
import PostPic from './PostPic';
import PostText from './PostText';
import Post from './Post'
import { render } from "react-dom";
import SlidingPane from "react-sliding-pane";
import "react-sliding-pane/dist/react-sliding-pane.css";
import axios from "axios"
import PhotoIcon from '@mui/icons-material/Photo';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import IconButton from '@mui/material/IconButton';
import RefreshIcon from '@mui/icons-material/Refresh';
const baseURL='http://127.0.0.1:8787/'
function ScrollPage() {
    const[pane, changePane]= useState(false)
    const[postType, changePostType]=useState('')
    const username= useContext(UserContext)
    const[allData, changeAllData]=useState()
    const postActivate=  (val)=>{
        changePane(!pane)
        changePostType('')
    }
    const refreshPosts= ()=>{
      axios.get(`${baseURL}posts`).then(function (response){
        changeAllData(response.data)
        console.log(allData)
      })
    }
    useEffect(()=>{
       refreshPosts()
    },[])
    const closePane=()=>{
      changePane(!pane)
      changePostType('')
    }
    return(
        <div className='mainBody'>
        <SideBar user={username} timeToPost={postActivate}/>
        <div className='postScrollBody'>
          <div className='refreshButton'>
          <IconButton  aria-label="Refresh Posts" onClick={refreshPosts}>
               <RefreshIcon  sx={{color:"grey", fontSize:"2vw"}}/>
             </IconButton>
          </div>
        {allData?allData.map(data=><Post user={data.username} title={data.title} img={data.image} type={data.type} caption={data.caption}
            comments={data.comments} numLikes={data.numLikes} whoLiked={data.likedUsers}/>): <div></div>}
        </div>


        <SlidingPane
        width="40vw"
        className="some-custom-class"
        overlayClassName="some-custom-overlay-class"
        isOpen={pane}
        onRequestClose={() => {
          changePane(!pane);
          changePostType('')
        }}
      >
          {postType=='' ? <div>
          <div className='mediumFontNormal'>What Kind of Post?</div>
        <div className='choosePost'>
            <div className='chooseImage'>
            <div className='smallFont'> Post an Image</div>
            <IconButton  aria-label="Make a post with an Image" onClick={()=>changePostType('img')}>
               <PhotoIcon  sx={{color:"red", fontSize:"5vw"}}/>
             </IconButton>
            </div>
            <div className='chooseText'>
            <div className='smallFont'> Post Just Text</div>
            <IconButton  aria-label="Do a post with just text" onClick={()=>changePostType('txt')} >
               <TextSnippetIcon   sx={{color:"black", fontSize:"5vw"}} />
             </IconButton>
            </div>
        </div>
        </div>
        : <div>{postType=='img' ? <PostPic user={username} closePane={closePane}/>:
         <PostText user={username} closePane={closePane}/>}</div>}
      </SlidingPane>
        </div>
    )
}

export default ScrollPage;