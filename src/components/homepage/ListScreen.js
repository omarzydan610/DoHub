import React from 'react';
import SideBar from "./SideBar"
import MiddleBar from "./middlebar"
import "../../styles/listScreen.css"
function ListScreen(){
    return(
        <div className="list-screen">
            <SideBar/>
            <MiddleBar/>
        </div>
    )
}
export default ListScreen