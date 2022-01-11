import React from 'react';
import axios from 'axios';
import './toDoList.css';

export default class toDoList extends React.Component {
  constructor(props) {
    super();
    this.state = {
      title: "MyToDo",
      task: [],
      addedTask: "",
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  async fetchData() {
    const config = {
      headers: {
        Authorization: `Bearer 7c6d3833897c6fad479421ad81c095dd1c355b88`
      },
    };
    axios
      .get("https://api.todoist.com/rest/v1/tasks", config)
      .then((res) => {
        const { data } = res;
        this.setState({ task: data });
        console.log( this.state.task );
      })
      .catch((err) => {
        console.log(err);
      })
  }
  
  handleAdd() {
    const config = {
      headers: {
        Authorization: `Bearer 7c6d3833897c6fad479421ad81c095dd1c355b88`
      },
    };
    axios
      .post("https://api.todoist.com/rest/v1/tasks", { "content": this.state.addedTask }, config)
      .then(() => {
        // const { data } = res;
        this.fetchData();
      })
      .catch((err) => {
        console.log(err);
      })
    this.setState({ addedTask: "" });
  }

  handleComplete(item) {
    const config = {
      headers: {
        Authorization: `Bearer 7c6d3833897c6fad479421ad81c095dd1c355b88`
      },
    };
    axios
      .post(`https://api.todoist.com/rest/v1/tasks/${item.id}`, { "content": this.state.addedTask }, config)
      .then(() => {
        // const { data } = res;
        this.fetchData();
      })
      .catch((err) => {
        console.log(err);
      })
      this.setState({ addedTask: "" });
  }

  handleDelete(item) {
    const config = {
      headers: {
        Authorization: `Bearer 7c6d3833897c6fad479421ad81c095dd1c355b88`
      },
    };
    axios
      .delete(`https://api.todoist.com/rest/v1/tasks/${item.id}`, config)
      .then(() => {
        // const { data } = res;
        this.fetchData();
      })
      .catch((err) => {
        console.log(err);
      })
  }

  render () {
    return (
      <div className='page-grid-container'>
        <div className='title-container title-styling'>
          {this.state.title}
        </div>
        <div className='input-container'>
            <input 
              type="text"
              placeholder="Your task here .."
              value={this.state.addedTask}
              onChange={(e) => this.setState({ addedTask: e.target.value })}
            />
            <button
              type="submit" 
              onClick={() => this.handleAdd()}>Add
            </button>
        </div>
        <div className='task-container'>
          {this.state.task.map((item) => (
            <div key={item.id}>
              <div>{item.content}</div>
              <div>
                <button
                  onClick={() => this.handleComplete(item)}>Edit
                </button>
              </div>
              <div>
                <button
                  onClick={() => this.handleDelete(item)}>Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }
}