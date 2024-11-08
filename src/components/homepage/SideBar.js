import React from 'react';
import "../../styles/SideBar.css"
import Usr from "../../images/User.png"
function SideBar(){
    return(
        <div className="side-bar">
            <div className="username-section">
                <div className="name">UserName</div>
                <div className="image"><img src={Usr} alt=""/></div>
            </div>
            <div className="selected option my-list">My List</div>
            <div className="option calender">Calender</div>
            <div className="option dark-mode">DarkMode</div>
        </div>
    )
}
export default SideBar