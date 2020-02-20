import React, { useState } from 'react'

interface Props {
    addTodo: Function
}

export default function TodoForm(props: Props) {

    const [todoTitle, setTodoTitle] = useState('')

    function changeInput(ev: React.FormEvent<HTMLInputElement>) {
        setTodoTitle(ev.currentTarget.value)
    }

    function onAddTodo() {
        props.addTodo( todoTitle)
        setTodoTitle('')
    }

    return (
        <div>
            <input type="text" placeholder='Add Todo' value={todoTitle} onChange={changeInput} />
            <button onClick={onAddTodo}>Add Todo</button>
        </div>
    )

}