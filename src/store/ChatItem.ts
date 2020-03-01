
import { observable, action } from "mobx"
import chatService from '../services/chatService'
import ChatMsg from '../interfaces/ChatMsg'
import SocketService from "../services/socketService"


export default class ChatItem {

    topic: string
    @observable msgs: ChatMsg[]
    _id: number
    imgUrl: string

    constructor(topic: string, msgs: ChatMsg[], _id: number = Date.now(), imgUrl: string) {
        this.topic = topic
        this.msgs = msgs
        this._id = _id
        this.imgUrl = imgUrl
    }

    @action
    addMsg = async (newMsg: ChatMsg) => {
        chatService.update(this._id, newMsg)
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

    @action
    getMsgs = async () => {
        const newChat = await chatService.getById(this._id)
        if (!newChat.msgs) {
            return
        }
        this.msgs = newChat.msgs
    }

}



