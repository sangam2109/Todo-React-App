import React, { useState, useEffect } from "react";

const TodoContext = React.createContext();

export const TodoProvider = ({ children }) => {
    const [todoItems, settodoItems] = useState(JSON.parse(localStorage.getItem('todoList')) ?? []);
    const [Edit,SetEdit]=useState('false')
    const [todoCount, settodoCount] = useState(0);
    const handleTodoCount = () => {
        let newcount = todoItems.filter((item) =>
            (!item.checked === true))
        settodoCount(newcount.length);
    };

    const addTodoItem = (newTodoItems) => {
        settodoItems([...todoItems, {
            id: `${Math.floor(Math.random() * 100000000)}`,
            title: `${newTodoItems}`,
            show: true,
            checked:false,
        },
        ]);
    };
    const EditTodoItem = (todoItemToEdit) => {
        const updatedItems = todoItems.map((item) =>
            item.id === todoItemToEdit.id ? { ...item, title: todoItemToEdit.title } : item
        );
        settodoItems(updatedItems);
        localStorage.setItem('todoList', JSON.stringify(updatedItems));
    };


    const removeTodoItem = (todoitemToremove) => {
        const existingItems = todoItems.find((item) => item.id === todoitemToremove.id);
        if (existingItems){
            const newTodoItems = todoItems.filter((item) => item.id !== todoitemToremove.id);
            settodoItems(newTodoItems);
            localStorage.setItem('todoList',JSON.stringify(newTodoItems))
        }
    }
    const clearCompleted = () => {
        let newTodoItems = todoItems.filter((item) => !item.checked === true);
        settodoItems(newTodoItems);
    }
    useEffect(() => {
        handleTodoCount();
    }, [todoItems,todoCount]);

    return (
        <TodoContext.Provider value={{
            addTodoItem: addTodoItem,
            removeTodoItem: removeTodoItem,
            clearCompleted: clearCompleted,
            handleTodoCount: handleTodoCount,
            EditTodoItem:EditTodoItem,
            todoCount: todoCount,
            todoItems: todoItems,
        }}>
            {children}
        </TodoContext.Provider>
    );
};

export default TodoContext;