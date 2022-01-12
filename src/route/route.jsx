import React, { Component } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from '../App'
import ToDoList from '../toDoList';
import ToDoListDetails from '../toDoListDetails';
import NotFound from '../notFound';

export default class route extends Component {
    render() {
        return (
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<App />}>
                        <Route path="toDoList" element={<ToDoList />} />
                        <Route path="toDoList/:id" element={<ToDoListDetails />} />
                        <Route path="*" element={<NotFound />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        )
    }
}