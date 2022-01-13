import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './toDoList.css';

const ToDoList = () => {
  const navigate = useNavigate();
  const [task, setTask] = useState([]);
  const [addedTask, setAddedTask] = useState("");
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    fetchData();
  }, [])

  const fetchData = () => {
    const config = {
      headers: {
        Authorization: `Bearer 7c6d3833897c6fad479421ad81c095dd1c355b88`
      },
    };
    axios
      .get("https://api.todoist.com/rest/v1/tasks", config)
      .then((res) => {
        const { data } = res;
        setTask(data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsReady(true);
      });
  }
  
  const handleAdd = () => {
    const config = {
      headers: {
        Authorization: `Bearer 7c6d3833897c6fad479421ad81c095dd1c355b88`
      },
    };
    axios
      .post("https://api.todoist.com/rest/v1/tasks", { "content": addedTask }, config)
      .then(() => {
        // const { data } = res;
        fetchData();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsReady(true);
        setAddedTask("");
      })
  }


  const handleSearch = () => {
    const config = {
      headers: {
        Authorization: `Bearer 7c6d3833897c6fad479421ad81c095dd1c355b88`
      },
    };
    axios
      .get("https://api.todoist.com/rest/v1/tasks", config)
      .then((res) => {
        const { data } = res;
        setTask(data);
        const searchValue = addedTask.toString();
        const contents = task.map((e) =>
          e.content
        );
        const filteredTask = contents.filter((e) =>
          e.includes(searchValue) === true
        );
        const searchResult = task.filter((e) => 
          filteredTask.includes(e.content) === true 
        );
        setTask(searchResult);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsReady(true);
      })
  }

  const handleComplete = (item) => {
    const config = {
      headers: {
        Authorization: `Bearer 7c6d3833897c6fad479421ad81c095dd1c355b88`
      },
    };
    axios
      .post(`https://api.todoist.com/rest/v1/tasks/${item.id}`, { "content": addedTask }, config)
      .then(() => {
        // const { data } = res;
        fetchData();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsReady(true);
        setAddedTask("");
      })
  }

  const handleDelete = (item) => {
    const config = {
      headers: {
        Authorization: `Bearer 7c6d3833897c6fad479421ad81c095dd1c355b88`
      },
    };
    axios
      .delete(`https://api.todoist.com/rest/v1/tasks/${item.id}`, config)
      .then(() => {
        // const { data } = res;
        fetchData();
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
      <div className='page-grid-container'>
        <div className='input-container'>
          <input 
            className='input-bar'
            type="text"
            placeholder="Your task here .."
            value={addedTask}
            onChange={(e) => setAddedTask(e.target.value)}
          />
          <button
            className='add-button'
            type="submit" 
            onClick={() => handleAdd()}>Add
          </button>
          <button
            className='search-button'
            type="submit" 
            onClick={() => handleSearch()}>Search
          </button>
        </div>
        <div className='task-container'>
          {task.map((item) => (
            <div key={item.id}>
              <div
                onClick={() => navigate(`/toDoList/${item.id}`)}>{item.content}
              </div>
              <div>
                <button
                  onClick={() => handleComplete(item)}>Edit
                </button>
              </div>
              <div>
                <button
                  onClick={() => handleDelete(item)}>Delete
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className='button-container'>
          <button
            className='reset-button'
            onClick={() => fetchData()}>Reset Search
          </button>
          <button
            className='contact-button'
            onClick={() => navigate("/error")}>Contact Us
          </button>
        </div>
      </div>
    )
  } else {
    return (
      <p className='title-container'>loading ...</p>
    )
  }
}

export default ToDoList;