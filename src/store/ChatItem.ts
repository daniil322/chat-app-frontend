
import { observable, action } from "mobx"
import chatService from '../services/chatService'
import ChatMsg from '../interfaces/ChatMsg'
import SocketService from "../services/socketService"

interface ChatData {
    topic: string,
    msgs: ChatMsg[],
    _id: number,
    imgUrl: string
}

export default class ChatItem {
    topic: string = ''
    @observable msgs: ChatMsg[] = []
    _id = Date.now()
    imgUrl = ''

    constructor(chatData: ChatData) {
        Object.assign(this, chatData)
    }

    @action
    addMsg = async (newMsg: ChatMsg) => {
        await chatService.update(this._id, newMsg)
        SocketService.emit('chat newMsg', { topic: this.topic, msg: newMsg })
    }

    openSockets = async () => {
        SocketService.emit('join room', { topic: this.topic })
    }

    closeSockets = async () => {
        SocketService.emit('leave room', { topic: this.topic })
    }

    @action
    getMsg = async (newMsg: ChatMsg) => {
        this.msgs.push(newMsg)
    }

    getMsgs = async () => {
        const newChat = await chatService.getById(this._id)
        if (!newChat.msgs) {
            return
        }
        this.msgs.forEach((msg) => {
            this.getMsg(msg)
        })
    }

}



