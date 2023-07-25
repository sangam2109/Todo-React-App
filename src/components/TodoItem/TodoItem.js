import './TodoItem.css';
import React, { useContext, useState, useRef } from 'react';
import { ReactComponent as Cross } from '../../images/icon-cross.svg';
import { ReactComponent as Check } from '../../images/icon-check.svg';
import { ReactComponent as EditButton } from '../../images/editB.svg';
import TodoContext from '../ContextAPI/Context';

function TodoItem({ todoItem }) {
    const { removeTodoItem, handleTodoCount, EditTodoItem } = useContext(TodoContext);
    const [checked, setChecked] = useState(todoItem.checked);
    const [isEditing, setIsEditing] = useState(false);
    const [editedTitle, setEditedTitle] = useState(todoItem.title);
    const inputRef = useRef();

    const handleToggleCheck = () => {
        setChecked(!checked);
        todoItem.checked = !checked;
        handleTodoCount();
    };

    const handleDelete = () => {
        removeTodoItem(todoItem);
    };

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleSave = () => {
        if (editedTitle.trim() !== '') {
            EditTodoItem({ ...todoItem, title: editedTitle });
            setIsEditing(false);
        }
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleSave();
        }
    };

    return (
        <div className="todo-item-container">
            <div className={`todo-items ${checked ? 'checked' : ''}`} onClick={handleToggleCheck}>
                <div className={`todo-icon ${checked ? 'checked' : ''}`} id={`todo-icon-${todoItem.id}`}>
                    <Check id={`check-${todoItem.id}`} className={`${checked ? '' : 'hidden'}`} />
                </div>
                {isEditing ? (
                    <input
                        ref={inputRef}
                        type="text"
                        value={editedTitle}
                        onChange={(e) => setEditedTitle(e.target.value)}
                        onKeyDown={handleKeyDown}
                        onBlur={handleSave}
                        autoFocus
                    />
                ) : (
                    <div
                        className={`todo-item ${checked ? 'checked' : ''}`}
                        id={`todo-item-${todoItem.id}`}
                        onDoubleClick={handleEdit}
                    >
                        {todoItem.title}
                    </div>
                )}
            </div>
            <div className="cross-area">
                {isEditing ? (
                    <EditButton className="edit-button" onClick={handleSave} />
                ) : (
                    <EditButton className="edit-button" onClick={handleEdit} />
                )}
                <Cross className="cross" onClick={handleDelete} />
            </div>
        </div>
    );
}

export default TodoItem;
