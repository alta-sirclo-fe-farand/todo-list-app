import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from '../App'
import ToDoList from '../toDoList';
import ToDoListDetails from '../toDoListDetails';
import NotFound from '../notFound';
import UrlContext from '../utils/variables'

const Navigation = () => {
  const url = "https://api.todoist.com/rest/v1/tasks";

  return (
    <BrowserRouter>
      <UrlContext.Provider value={ url }>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="toDoList" element={<ToDoList />} />
          <Route path="toDoList/:id" element={<ToDoListDetails />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
      </UrlContext.Provider>
    </BrowserRouter>
  )
}

export default Navigation;