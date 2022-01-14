import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../style.css'

const Header = () => {
  const navigate = useNavigate();
  return (
    <div className='title-container title-styling'>
      <div className='title-alignment'>
        MyToDo
      </div>
      <div className='main-alignment'>
        <button
          onClick={() => navigate("/toDoList")}>Your to-do-list
        </button>
      </div>
    </div>
  )
}

export default Header;