import React from 'react';

export default class toDoList extends React.Component {
  constructor(props) {
    super();
    this.state = {
      title: "Welcome to your to-do-list app",
      task: [],
      addedTask: "",
    };
  }
  
  handleAdd() {
    const temp = {
      id: Math.random()*1000,
      todo: this.state.addedTask,
      status: "Not Completed"
    };
    this.state.task.push(temp);
    this.setState( this.state.task );
    this.setState( this.state.addedTask= "" );
  }

  handleComplete(item) {
    const temp = this.state.task.filter((x) => x.id == item.id);
  }

  handleDelete(item) {
    const temp = this.state.task.filter((x) => x.id !== item.id);
    this.setState({ task: temp });
  }

  render () {
    return (
      <div>
        <div>{this.state.title}</div>
        <div>
          <input 
            type="text"
            placeholder="your task here .."
            value={this.state.addedTask}
            onChange={(e) => this.setState({ addedTask: e.target.value })}
          />
        </div>
        <div>
          <button
            type="submit" 
            onClick={() => this.handleAdd()}>Add
          </button>
        </div>
        <div>
          {this.state.task.map((item) => (
            <div key={item.id}>
              <div>{item.todo}</div>
              <div>{item.status}</div>
              <div>
                <button>Mark as Completed
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