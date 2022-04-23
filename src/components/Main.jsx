import React, { Component } from 'react'
import Form from './Form'
// import Tasks from './Tasks'

import {FaEdit, FaWindowClose } from 'react-icons/fa' //reacts icons

import './main.css'

export default class Main extends Component {
  state = {
    newTask: '',
    tasks: [],
    index: -1
  };

  componentDidMount() {
    const tasks = JSON.parse(localStorage.getItem('tasks'));

    if(!tasks) return;

    this.setState({ tasks })
  }

  componentDidUpdate(prevProps, prevState) {
    const { tasks } = this.state;

    if(tasks === prevState.tasks) return;

    localStorage.setItem('tasks', JSON.stringify(tasks))
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { tasks, index } = this.state;
    let { newTask } = this.state;
    newTask = newTask.trim()

    if(tasks.indexOf(newTask) !== -1) return; // se a task ja existir na lista, ela não será adicionada

    const newTasks = [...tasks];

    if(index === -1) { //se o index da tarefa for -1 então ela seá adicionada, caso contrário será editada na lista de tarefas
      this.setState({
        tasks: [...newTasks, newTask],
        newTask: ''
      });
    } else {
      newTasks[index] = newTask;

      this.setState({
        tasks: [...newTasks],
        index: -1,
        newTask: ''
      });
    }
  }
  
  /* O método abaixo captura alguma alteração no input e altera o estado da newTask para o valor atual do input */
  handleChange = (e) => {
    this.setState({
      newTask: e.target.value
    })
  };

  /* o método abaixo desestrutura tasks do estado e altera o estado de index para seu índex no array
  e então newTask reebe o valor do índex correspondente 
  
  quando o botão submit for clicado o index será verificado para validar se o usuário esta atualizando ou inserindo um novo valor*/
  handleEdit(index) {
    const { tasks } = this.state;
    this.setState({
      index,
      newTask: tasks[index]
    })
  };

  /* o método abaixo desestrutura tasks e cria um novo array de tasks com a lista atual
  então tira a posição atual do array, assim deletando a tarefa selecionada
  
  por último altera o estado de tasks para o novo array sem o valor excluído*/
  handleDelete(index) {
    console.log(index)
    const { tasks } = this.state;
    const newTasks = [...tasks];
    newTasks.splice(index, 1)

    this.setState({
      tasks: [...newTasks]
    })
  }

  render() { //renderizando o componente
    const {newTask, tasks} = this.state // desestruturando newTask e tasks
    return(
      <div className='main'>
        <h1>Lista de Tarefas</h1>
        <Form 
        handleSubmit={this.handleSubmit}
        handleChange={this.handleChange}
        newTask={newTask}
        />
       
        <ul className='tasks'>
        {/* listando as tasks do array tasks utilizando 'map' e criando seus botões de alterar e deletar */}
        {tasks.map((task, index) => (
          <li key={task}>
            {task}
            <div>
              <FaEdit 
                className='edit'
                onClick={() => this.handleEdit(index)}
              />
              <FaWindowClose 
                className='window-close'
                onClick={() => this.handleDelete(index)}
              />
            </div>
          </li>
        ))}
        </ul>
      </div>
    )
  }
}
