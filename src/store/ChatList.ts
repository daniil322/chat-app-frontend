import { RootStore } from './RootStore'

import { observable, action } from "mobx"
import chatService from '../services/chatService'
import ChatItem from './ChatItem'
import SocketService from '../services/socketService'


export default class ChatList {

    @observable.shallow chats: ChatItem[] = []
    @observable currChat: ChatItem = new ChatItem('', [], 0, '')
    rootStore: RootStore
    constructor(rootStore: RootStore) {
        this.rootStore = rootStore
    }

    @action
    addTopic = async (topic: { txt: string, imgUrl: string }) => {
        const newTopic = new ChatItem(topic.txt, [], Date.now(), topic.imgUrl)
        console.log(newTopic)
        console.log(topic)
        const chat = await chatService.addTopic(newTopic)
        SocketService.emit('new topic', chat)
        this.currChat = newTopic
    }

    openSockets = () => {
        SocketService.setup()
        SocketService.on('new topic', this.getTopic)
    }

    getTopic = (newTopic: ChatItem) => {
        this.chats.push(new ChatItem(newTopic.topic, newTopic.msgs, newTopic._id, newTopic.imgUrl))
    }

    @action
    setCurrChat = async (_id: number) => {
        const currChat = this.chats.find((chat) => {
            return _id === chat._id
        })
        if (currChat) {
            this.currChat = currChat
        }
    }

    @action
    getChats = async () => {
        const chats: ChatItem[] = await chatService.get()
        chats.forEach(chat => {
            this.chats.push(new ChatItem(chat.topic, chat.msgs, chat._id, chat.imgUrl))
        });
    }
}

