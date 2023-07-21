import './TodoItem.css'
import React, { useContext,useEffect } from 'react'
import { ReactComponent as Cross } from '../../images/icon-cross.svg'
import { ReactComponent as Check } from '../../images/icon-check.svg'
import TodoContext from '../ContextAPI/Context'

function TodoItem({ todoItem }) {
    
    const { removeTodoItem, handleTodoCount } = useContext(TodoContext);

    const checkList = (todoItemSelected) => {
        let todoCircle = document.querySelector(`#todo-icon-${todoItemSelected.id}`);
        let check = document.querySelector(`#check-${todoItemSelected.id}`);
        let todoItemTitle = document.querySelector(`#todo-item-${todoItemSelected.id}`);
        todoCircle.classList.toggle("checked");
        check.classList.toggle("hidden");
        todoItemTitle.classList.toggle("checked");

        if (todoItemTitle.classList.contains('checked')) {
            todoItemSelected.isActive = false;
        }
        else {
            todoItemSelected.isActive = true;
        }
        handleTodoCount();
    }
    const handleDelete = (todoItemToRemove) => {
        removeTodoItem(todoItemToRemove);
    };
    return (
        <div className="todo-item-container">
            <div className="todo-items" onClick={() => checkList(todoItem)}>
                <div className="todo-icon" id={`todo-icon-${todoItem.id}`}>
                    <Check id={`check-${todoItem.id}`} className="hidden" />
                </div>
                <div className="todo-item" id={`todo-item-${todoItem.id}`}>
                    {todoItem.title}
                </div>
            </div>
            <Cross className="cross" onClick={() => handleDelete(todoItem)} />
        </div>
    );
};

export default TodoItem;