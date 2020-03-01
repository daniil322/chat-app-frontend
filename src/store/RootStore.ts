import ChatList from './ChatList'

export class RootStore {
    chatList: ChatList
    constructor() {
        this.chatList = new ChatList(this)
    }
}
new RootStore()
