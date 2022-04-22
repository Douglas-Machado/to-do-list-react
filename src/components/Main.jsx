import React, { Component } from 'react'

//form
import { FaPlus, FaEdit, FaWindowClose } from 'react-icons/fa'


import './main.css'

export default class Main extends Component {
  state = {
    newTask: '',
    tasks: [],
    index: -1
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { tasks, index } = this.state;
    let { newTask } = this.state;
    newTask = newTask.trim()

    if(tasks.indexOf(newTask) !== -1) return;

    const newTasks = [...tasks];

    if(index === -1) {
      this.setState({
        tasks: [...newTasks, newTask],
        newTask: ''
      });
    } else {
      newTasks[index] = newTask;

      this.setState({
        tasks: [...newTasks],
        index: -1
      });
    }
  }
  
  handleChange = (e) => {
    this.setState({
      newTask: e.target.value
    })
  };

  handleEdit(e, index) {
    const { tasks } = this.state;
    this.setState({
      index,
      newTask: tasks[index]
    })
  };

  handleDelete(e, index) {
    const { tasks } = this.state;
    const newTasks = [...tasks];
    newTasks.splice(index, 1)

    this.setState({
      tasks: [...newTasks]
    })
  }

  render() {
    const {newTask, tasks} = this.state
    return(
      <div className='main'>
        <h1>Lista de Tarefas</h1>

        <form onSubmit={this.handleSubmit} action="#" className='form'>
          <input 
          onChange={this.handleChange} 
          type="text" 
          value={newTask}
          />
            <button type='submit'><FaPlus/></button>
        </form>

        <ul className='tasks'>
          {tasks.map((task, index) => (
            <li key={task}>
              {task}
              <div>
                <FaEdit 
                  className='edit'
                  onClick={(e) => this.handleEdit(e, index)}
                />
                <FaWindowClose 
                  className='window-close'
                  onClick={(e) => this.handleDelete(e, index)}
                />
              </div>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}
