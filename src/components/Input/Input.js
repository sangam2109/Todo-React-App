import './Input.css'
import { useState , useContext } from 'react';
import TodoContext from '../ContextAPI/Context';

function Input() {
    const { addTodoItem } = useContext(TodoContext)
    const [inputValue, setInputValue] = useState('');

    const handleChange = (event) => {
        setInputValue(event.target.value);
    }
    const handleSubmit = (event) => {
        event.preventDefault()
        if (inputValue !== "") {
            addTodoItem(inputValue)
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