import React, { useEffect, useState, useContext } from 'react'
import './TodoList.css'
import TodoItem from '../TodoItem/TodoItem'
import TodoContext from '../ContextAPI/Context'

// const local_item = () => {
//     let list = localStorage.getItem('myTasks')
//     if (list) {
//         return 
//     }
//     else {
//         return []
//     }
// }
function Todolist() {
    const { todoItems, todoCount, clearCompleted } = useContext(TodoContext);
    const [TodoList, setTodoList] = useState([])
    const [filter, setFilter] = useState('all')

    useEffect(() => {
        setTodoList(JSON.parse(localStorage.getItem('myTasks')))
        if (filter === 'all') {
            setTodoList(todoItems);
        } else if (filter === 'active') {
            setTodoList(todoItems.filter((item) => item.isActive));
        } else if (filter === 'completed') {
            setTodoList(todoItems.filter((item) => !item.isActive));
        }
    }, [filter, todoItems ,TodoList, todoCount, clearCompleted]);
  
    return (
        <div className='list-container'>
            {
               TodoList.map((item) => {
                    return (<TodoItem key={item.id} todoItem={item} />)
                
               })
            }

            <div className='list-footer'>
                <div className='footer-1'> {todoCount} items Left</div>
                <div className='footer-2'>
                    <div
                        id="all"
                        className={filter === 'all' ? 'selected' : ''}
                        onClick={() => setFilter('all')}
                    >
                        All
                    </div>
                    <div
                        id="active"
                        className={filter === 'active' ? 'selected' : ''}
                        onClick={() => setFilter('active')}
                    >
                        Active
                    </div>
                    <div
                        id="completed"
                        className={filter === 'completed' ? 'selected' : ''}
                        onClick={() => setFilter('completed')}
                    >
                        Completed
                    </div>
                </div>
                <div className='footer-3' onClick={clearCompleted}> Clear completed</div>
            </div>
        </div>
    );
}

export default Todolist;