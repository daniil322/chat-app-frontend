import { RootStore } from './RootStore'

import { observable, action } from "mobx"
import todoService from '../services/todoService'
import TodoItem from './TodoItem'


export default class TodoList {

    @observable.shallow todos: TodoItem[] = []

    rootStore: RootStore
    constructor(rootStore: RootStore) {
        this.rootStore = rootStore
    }

    @action
    addTodo = (title: string) => {
        const todo = new TodoItem(title)
        console.log(todo)
        this.todos.push(todo)
    }

    @action
    getTodos =  () => {
        const todo =  todoService.getTodos()
        this.todos.push(new TodoItem(todo))
    }


}

