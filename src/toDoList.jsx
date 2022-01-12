import React from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { withRouter } from './utils/navigator';
import './toDoList.css';

class toDoList extends React.Component {
  constructor(props) {
    super();
    this.state = {
      title: "MyToDo",
      task: [],
      addedTask: "",
      isReady: false,
      search: ""
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
      .finally(() => {
        this.setState({ isReady: true });
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
      .finally(() => {
        this.setState({ isReady: true });
        this.setState({ addedTask: "" });
      })
  }


  handleSearch() {
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
        const searchValue = this.state.addedTask.toString();
        const contents = this.state.task.map((e) =>
          e.content
        );
        const filteredTask = contents.filter((e) =>
          e.includes(searchValue) === true
        );
        const searchResult = this.state.task.filter((e) => 
          filteredTask.includes(e.content) === true 
        );
        this.setState({ task: searchResult });
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        this.setState({ isReady: true });
      })
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
      .finally(() => {
        this.setState({ isReady: true });
        this.setState({ addedTask: "" });
      })
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
      .finally(() => {
        this.setState({ isReady: true });
      })
  }

  render () {
    if(this.state.isReady) {
      return (
        <div className='page-grid-container'>
          <div className='input-container'>
              <input 
                className='input-bar'
                type="text"
                placeholder="Your task here .."
                value={this.state.addedTask}
                onChange={(e) => this.setState({ addedTask: e.target.value })}
              />
              <button
                className='add-button'
                type="submit" 
                onClick={() => this.handleAdd()}>Add
              </button>
              <button
                className='search-button'
                type="submit" 
                onClick={() => this.handleSearch()}>Search
              </button>
          </div>
          <div className='task-container'>
            {this.state.task.map((item) => (
              <div key={item.id}>
                <div
                  onClick={() => this.props.navigate(`/toDoList/${item.id}`)}>{item.content}
                </div>
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
          <div className='button-container'>
              <button
                className='reset-button'
                onClick={() => this.fetchData()}>Reset Search
              </button>
              <button
                className='contact-button'
                onClick={() => this.props.navigate("/error")}>Contact Us
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
}

export default withRouter(toDoList);