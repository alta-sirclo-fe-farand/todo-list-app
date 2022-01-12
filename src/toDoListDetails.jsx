import React from 'react';
import axios from 'axios';
import { readParams } from './utils/navigator';
import './details_notFound.css'

class toDoListDetails extends React.Component {
  constructor(props) {
    super();
    this.state = {
      isReady: false,
      selectedTask: []
    }
  }

  componentDidMount() {
    this.fetchData()
  }

  async fetchData() {
    const config = {
      headers: {
        Authorization: `Bearer 7c6d3833897c6fad479421ad81c095dd1c355b88`
      },
    };
    axios
      (`https://api.todoist.com/rest/v1/tasks/${this.props.params.id}`, config)
      .then((res) => {
        const { data } = res;
        console.log(res);
        this.setState({ selectedTask: data });
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        this.setState({ isReady: true });
      })
  }

  render () {
    const { selectedTask } = this.state;
    if(this.state.isReady) {
      return (
        <div className='detail-container'>
          <p>task: { selectedTask.content }</p>
          <p>id: { selectedTask.id }</p>
          <p>completed: { selectedTask.completed.toString() }</p>
        </div>
      )
    } else {
      return (
        <p className='title-container'>loading ...</p>
      )
    }
  }
}

export default readParams(toDoListDetails);