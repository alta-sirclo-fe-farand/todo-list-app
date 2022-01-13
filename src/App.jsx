import React from "react";
import { Outlet, Link } from "react-router-dom";
import MyToDoHeader from './comp/header'
import './details_notFound.css'

function App(props) {
  return (
    <div>
      <MyToDoHeader />
      <Outlet />
    </div>
  );
}

export default App;
