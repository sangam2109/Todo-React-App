import React,{ useState,useEffect } from "react";

const TodoContext=React.createContext();

export const TodoProvider=({children})=>{
    const [todoItems, settodoItems] = useState([]);

    const [todoCount, settodoCount] = useState(0);
    const handleTodoCount=()=>{
        let newcount=todoItems.filter((item)=>
            (item.isActive===true))
        settodoCount(newcount.length);
    };

    const addTodoItem=(newTodoItems)=>{
        settodoItems([ ...todoItems,{
            id:`${todoItems.length+1}`,
            title:`${newTodoItems}`,
            isActive:true,
            show:true,
        },
    ]);
    };

const removeTodoItem=(todoitemToremove)=>{
    const existingItems=todoItems.find((item)=>item.id===todoitemToremove.id);
    if(existingItems){
        const newTodoItems=todoItems.filter((item)=> item.id!==todoitemToremove.id);
        settodoItems(newTodoItems);
    }
}
const clearCompleted=()=>{
    let newTodoItems=todoItems.filter((item)=>item.isActive===true);
    settodoItems(newTodoItems);
}
useEffect(() => {
 handleTodoCount();
}, [todoItems]);

return(
    <TodoContext.Provider value={{
        addTodoItem:addTodoItem,
        removeTodoItem:removeTodoItem,
        clearCompleted:clearCompleted,
        handleTodoCount:handleTodoCount,
        todoCount:todoCount,
        todoItems:todoItems,
    }}>
    {children}
    </TodoContext.Provider>
);
};
export default TodoContext;