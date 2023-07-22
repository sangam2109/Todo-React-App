import React, { useEffect, useState, useContext } from 'react';
import './TodoList.css';
import TodoItem from '../TodoItem/TodoItem';
import TodoContext from '../ContextAPI/Context';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

function Todolist() {
    const { todoItems, todoCount, clearCompleted } = useContext(TodoContext);
    const [TodoList, setTodoList] = useState([]);
    const [filter, setFilter] = useState('all');

    useEffect(() => {
        applyFilter(filter);
    }, [filter, todoItems , TodoList]);

    const applyFilter = (selectedFilter) => {
        if (selectedFilter === 'all') {
            setTodoList(todoItems);
        } else if (selectedFilter === 'active') {
            setTodoList(todoItems.filter((item) => !item.checked));
        } else if (selectedFilter === 'completed') {
            setTodoList(todoItems.filter((item) => item.checked));
        }
    };

    const handleDrop = (result) => {
        if (!result.destination) return;
        const reorderedList = Array.from(TodoList);
        const [reorderedItem] = reorderedList.splice(result.source.index, 1);
        reorderedList.splice(result.destination.index, 0, reorderedItem);
        setTodoList(reorderedList);
    };

    return (
        <div className='list-container-mine'>
            <DragDropContext onDragEnd={handleDrop}>
                <Droppable droppableId='list-container'>
                    {(provided) => (
                        <div
                            className='list-container'
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                        >
                            {TodoList.map((item, index) => (
                                <Draggable key={item.id} draggableId={item.id} index={index}>
                                    {(provided) => (
                                        <div
                                            className='item-container'
                                            ref={provided.innerRef}
                                            {...provided.dragHandleProps}
                                            {...provided.draggableProps}
                                        >
                                            
                                            <TodoItem todoItem={item} />
                                        </div>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
            <div className='list-footer'>
                <div className='footer-1'> {todoCount} items Left</div>
                <div className='footer-2'>
                    <div
                        id='all'
                        className={filter === 'all' ? 'selected' : ''}
                        onClick={() => {
                            setFilter('all');
                            applyFilter('all');
                        }}
                    >
                        All
                    </div>
                    <div
                        id='active'
                        className={filter === 'active' ? 'selected' : ''}
                        onClick={() => {
                            setFilter('active');
                            applyFilter('active');
                        }}
                    >
                        Active
                    </div>
                    <div
                        id='completed'
                        className={filter === 'completed' ? 'selected' : ''}
                        onClick={() => {
                            setFilter('completed');
                            applyFilter('completed');
                        }}
                    >
                        Completed
                    </div>
                </div>
                <div className='footer-3' onClick={clearCompleted}>
                    Clear completed
                </div>
            </div>
        </div>
    );
}

export default Todolist;
