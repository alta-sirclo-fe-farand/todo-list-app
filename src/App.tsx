import React from "react";
import { Outlet } from "react-router-dom";
import MyToDoHeader from './comp/header';

function App() {
  return (
    <div>
      <MyToDoHeader />
      <Outlet />
    </div>
  );
}

export default App;
