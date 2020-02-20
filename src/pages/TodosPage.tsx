import React from 'react'
import TodoList from '../components/TodoList'

import { useObserver } from 'mobx-react-lite'
import { useStore } from '../store/useStore'
import TodoForm from '../components/TodoForm'


export default function TodosPage() {
    const rootStore = useStore();
    const { todosList } = rootStore


     function addTodo(title: string) {
        todosList.addTodo(title)
    }


    return useObserver(() => {
        const { todos } = todosList

        return <>
            <TodoList todos={todos} />
            <TodoForm addTodo={addTodo} />
        </>
    }
    )

}