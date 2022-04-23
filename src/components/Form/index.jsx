import React from 'react'
import PropTypes from 'prop-types'
import { FaPlus } from 'react-icons/fa'
import './form.css'
export default function Form({ handleChange, handleSubmit, newTask}) {
  return(
    <form onSubmit={handleSubmit} action="#" className='form'>
          {/* chamando o método handleSubmit quando o formulário for enviado */}
          <input 
          onChange={handleChange} 
          type="text" 
          value={newTask}
          />
          {/* toda vez o que o input é alterado, a função handleChange é chamada */}
            <button type='submit'><FaPlus/></button> 
            {/* o ícone do botão é um componente do react-icons */}
        </form>
  )
}

Form.propTypes = {
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  newTask: PropTypes.string.isRequired
}