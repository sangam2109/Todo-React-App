import './TodoItem.css'
import React, { useContext, useState } from 'react'
import { ReactComponent as Cross } from '../../images/icon-cross.svg'
import { ReactComponent as Check } from '../../images/icon-check.svg'
import TodoContext from '../ContextAPI/Context'

function TodoItem({ todoItem }) {
    const { removeTodoItem, handleTodoCount } = useContext(TodoContext);
    const [checked, setChecked] = useState(todoItem.checked);
   

    const handleToggleCheck = () => {
        setChecked(!checked); // Toggle the local state
        todoItem.checked = !checked; // Update the todoItem.checked value directly
        handleTodoCount(); // Call handleTodoCount to update todoCount
    };

    const handleDelete = (todoItemToRemove) => {
        removeTodoItem(todoItemToRemove);
    };

    return (
        <div className="todo-item-container">
            <div className={`todo-items ${checked ? 'checked' : ''}`} onClick={handleToggleCheck}>
                <div className={`todo-icon ${checked ? 'checked' : ''}`} id={`todo-icon-${todoItem.id}`}>
                    <Check id={`check-${todoItem.id}`} className={`${checked ? '' : 'hidden'}`} />
                </div>
                <div className={`todo-item ${checked ? 'checked' : ''}`} id={`todo-item-${todoItem.id}`}>
                    {todoItem.title}
                </div>
            </div>
            <div className='cross-area'>
            <Cross className="cross" onClick={() => handleDelete(todoItem)} />
            </div>
        </div>
    );
}

export default TodoItem;
