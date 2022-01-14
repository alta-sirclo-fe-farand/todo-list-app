import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom'
import './style.css'

const ToDoListDetails = (item) => {
  const navigate = useNavigate();
  const [isReady, setIsReady] = useState(false);
  const [selectedTask, setSelectedTask] = useState([]);

  useEffect(() => {
    fetchData();
  }, [])

  const { id } = useParams();
  const fetchData = () => {
    const config = {
      headers: {
        Authorization: `Bearer 7c6d3833897c6fad479421ad81c095dd1c355b88`
      },
    };
    axios
      (`https://api.todoist.com/rest/v1/tasks/${ id }`, config)
      .then((res) => {
        const { data } = res;
        console.log(res);
        setSelectedTask(data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsReady(true);
      })
  }

  if (isReady) {
    return (
      <div className='detail-container'>
        <table>
          <tbody>
            <tr>
              <td>Task</td>
              <td>: { selectedTask.content }</td>
            </tr>
            <tr>
              <td>ID</td>
              <td>: { selectedTask.id }</td>
            </tr>
            <tr>
              <td>Completed</td>
              <td>: { selectedTask.completed.toString() }</td>
          </tr>
          </tbody>
        </table>
        <p 
          onClick={() => navigate("/toDoList")}>Back to Home
        </p>
      </div>
    )
  } else {
    return (
      <p className='detail-container'>loading ...</p>
    )
  }
}

export default ToDoListDetails;