import './Input.css'
import { useState, useContext } from 'react';
import TodoContext from '../ContextAPI/Context';

function Input() {
    const id=Math.floor(Math.random()*100000000)
    const { addTodoItem } = useContext(TodoContext)
    const [inputValue, setInputValue] = useState('');

    const handleChange = (event) => {
        setInputValue(event.target.value);
    }
    const handleSubmit = (event) => {
        event.preventDefault()
        if (inputValue !== "") {
            addTodoItem(inputValue)
            const data = JSON.parse(localStorage.getItem("todoList"))
            localStorage.setItem('todoList', JSON.stringify([...data,
            {
                id: `${id}`,
                title: `${inputValue}`,
                show: true,
                checked:false,
            }]))

        }
        setInputValue("");
    }

    return (
        <div className="input-container ">
            <div className="input-icon"></div>
            <form onSubmit={handleSubmit}>

                <input
                    type='text'
                    className="input"
                    placeholder="Create a new todo..."
                    value={inputValue}
                    onChange={handleChange}
                />

            </form>
        </div>
    );
}

export default Input