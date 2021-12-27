import { UserContext } from '../App';
import '../App.css';
import React, { useState, useEffect, useContext } from 'react';
import SideBar from './SideBar';
import axios from "axios"
const baseURL='http://127.0.0.1:8787/'
function ScrollPage() {
const username= useContext(UserContext)
    return(
        <div>
       
        <SideBar/>
        
        </div>
    )
}

export default ScrollPage;