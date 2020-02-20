import React from 'react'
import Todo from "../interfaces/Todo";

interface props {
    todo: Todo
}


export default function TodoPreview(props: props) {
    const { todo: { title, isDone } } = props



console.log(props)


    return (
        <div>
            <div>{title}</div>
        </div>
    )
}