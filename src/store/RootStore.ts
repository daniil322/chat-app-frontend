import TodosList from './TodosList'

export class RootStore {
    todosList: TodosList
    constructor() {
        this.todosList = new TodosList(this)
    }
}
new RootStore()
