import React from 'react'
import TodoPreview from "./TodoPreview";
import TodoItem from '../store/TodoItem';

interface Props {
    todos: TodoItem[]
}

export default function TodoList(props: Props) {
    return (
        <div>
            {props.todos.map((todo: TodoItem) => {
                return <TodoPreview key={todo.title + todo.isDone} todo={todo} />
            })}
        </div>
    )

}