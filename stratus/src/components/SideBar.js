import '../App.css';
import React, { useState, useEffect, useContext } from 'react';
import AddBoxIcon from '@mui/icons-material/AddBox';

function SideBar() {

    return(
        <div className="SideBar">
            <div className="twoButtons">
            <AddBoxIcon  sx={{color:"white", fontSize:"5vw"}}/>
          
            </div>
        </div>
    )
}

export default SideBar;