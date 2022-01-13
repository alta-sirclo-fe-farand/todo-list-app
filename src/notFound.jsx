import React from 'react';
import { useNavigate } from 'react-router-dom';
import './details_notFound.css'

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div className='detail-container'>
      <p>This page is not available.</p>
      <p 
        onClick={() => navigate("/toDoList")}>Back to Home
      </p>
    </div>
  )
}

export default NotFound;