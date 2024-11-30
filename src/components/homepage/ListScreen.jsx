import React from 'react';
import SideBar from "./SideBar"
import MiddleBar from "./middlebar"
import "../../styles/listScreen.css"
import TaskEdit from './TaskEdit';
function ListScreen(){
    return(
        <div className="list-screen w-full">
            <SideBar className = "w-1/5"/>
            <MiddleBar className = "w-2/5"/>
            <TaskEdit className ="w-2/5"/>
        </div>
    )
}
export default ListScreen