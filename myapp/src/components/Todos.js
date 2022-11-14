import React, {useState, useContext, useEffect} from "react";
import { CredentialsContext } from "../App";
import {v4 as uuidv4} from "uuid"
import {MdDeleteOutline} from 'react-icons/md'

import './todos.css'

const Todos = () => {
    const [todos, setTodos] = useState([]);
    const [todoText, setTodoText] = useState("");
    const [credentials] = useContext(CredentialsContext);
    const [filter, setFilter] = useState("uncompleted");

    const persist = (newTodos) => {
        fetch(`http://localhost:4000/todos`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Basic ${credentials.username}`,
            },
            body: JSON.stringify(newTodos),
        }).then(() => {});
    };

    useEffect(() => {
        fetch(`http://localhost:4000/todos`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Basic ${credentials.username}`,
          },
        })
          .then((response) => response.json())
          .then((todos) => setTodos(todos));
      }, [todos, credentials]);

    const addTodo = event => {
        event.preventDefault()
        if (!todoText) return;
        const newTodo = {id: uuidv4(), checked: false, text: todoText};
        const newTodos = [...todos, newTodo];
        setTodos(newTodos);
        setTodoText("");
        persist(newTodos);
    };

    const toggleTodo = (id) => {
        const newTodoList = [...todos];
        const todoItem = newTodoList.find((todo) => todo.id === id);
        todoItem.checked = !todoItem.checked;
        setTodos(newTodoList);
        persist(newTodoList);
    };

    const getTodos = () => {
            if (filter === "all"){
                return todos
            }
            return todos.filter((todo) => 
            filter === "completed" ? todo.checked : !todo.checked
        );
    };

    const changeFilter = (newFilter) => {
        setFilter(newFilter);
    };

    const onDeleteTodo = ({id}) => {
        setTodos(todos.filter((todo) => todo.id !== id))
    }

    return (
        <div>
            <select value={filter} onChange={(e) => changeFilter(e.target.value)}>
                <option value="completed">Completed</option>
                <option value="uncompleted">Uncompleted</option>
                <option value="all">All</option>
            </select>
            <div className="todos-container">
                {getTodos().map((todo) => (
                    <div className="todo-item" key={todo.id}>
                        <input
                        className="checkbox"
                        checked={todo.checked}
                        onChange={() => toggleTodo(todo.id)}
                        type="checkbox" />
                        <label>{todo.text}</label>
                        <MdDeleteOutline className="del-icon" onClick={() => onDeleteTodo(todo)} />
                    </div>
                ))}
                <br />
                <form onSubmit={addTodo}>
                    <input
                    className="todo-input"
                    value={todoText}
                    onChange={(e) => setTodoText(e.target.value)}
                    type="text" />
                </form>
            </div>
        </div>
    );

}

export default Todos