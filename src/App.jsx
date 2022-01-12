import React from "react";
import { Outlet, Link } from "react-router-dom";
import MyToDoHeader from './comp/header'
import './details_notFound.css'

function App(props) {
  return (
    <div>
      <MyToDoHeader />
      <Outlet />
      <Link 
        className="title-container"
        to="/toDoList">Back to Home</Link>
    </div>
  );
}

export default App;
