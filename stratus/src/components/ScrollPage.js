import { UserContext } from '../App';
import '../App.css';
import React, { useState, useEffect, useContext } from 'react';
import SideBar from './SideBar';
import { render } from "react-dom";
import SlidingPane from "react-sliding-pane";
import "react-sliding-pane/dist/react-sliding-pane.css";
import axios from "axios"
import PhotoIcon from '@mui/icons-material/Photo';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import IconButton from '@mui/material/IconButton';
const baseURL='http://127.0.0.1:8787/'
function ScrollPage() {
    const[pane, changePane]= useState(false)
    const username= useContext(UserContext)
    const postActivate=(val)=>{
        changePane(!pane)
    }
    return(
        <div className='mainBody'>
        <SideBar user={username} timeToPost={postActivate}/>
        <SlidingPane
        width="50vw"
        className="some-custom-class"
        overlayClassName="some-custom-overlay-class"
        isOpen={pane}
        onRequestClose={() => {
          changePane(!pane);
        }}
      >
          <div className='mediumFontNormal'>What Kind of Post?</div>
        <div className='choosePost'>
            <div className='chooseImage'>
            <div className='smallFont'> Post an Image</div>
            <IconButton  aria-label="Make a post with an Image" >
               <PhotoIcon  sx={{color:"red", fontSize:"5vw"}}/>
             </IconButton>
            </div>
            <div className='chooseText'>
            <div className='smallFont'> Post Just Text</div>
            <IconButton  aria-label="Do a post with just text" >
               <TextSnippetIcon   sx={{color:"black", fontSize:"5vw"}} />
             </IconButton>
            </div>
        </div>
        
      </SlidingPane>
        </div>
    )
}

export default ScrollPage;