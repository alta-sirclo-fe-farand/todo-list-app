import React from "react";
import { Outlet } from "react-router-dom";
import MyToDoHeader from './comp/header';

function App(props) {
  return (
    <div>
      <MyToDoHeader />
      <Outlet />
    </div>
  );
}

export default App;
