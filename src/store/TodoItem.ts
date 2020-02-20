import { observable, action } from "mobx"



export default class TodoItem {
   @observable title: string
   @observable isDone: boolean
   @observable _id: number

   constructor(title: string) {
      this.title = title
      this.isDone = false
      this._id = Date.now()
   }

   @action
   toggleTodo = () => {
      this.isDone = !this.isDone
   }
}

