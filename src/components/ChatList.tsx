
import React, { useEffect, useRef } from 'react'
import { useStore } from '../store/UseStore';
import { useObserver } from 'mobx-react-lite'

import ChatPreview from './ChatPreview';
import SocketService from '../services/socketService';
import ChatMsg from '../interfaces/ChatMsg';

interface Props {
    userName: string
}

export default function ChatTopicsList({ userName }: Props) {

    const rootStore = useStore();
    const { chatList } = rootStore
    const chatBottom = useRef<HTMLDivElement>(null)

    async function scroll(msg: ChatMsg) {
        await chatList.currChat.getMsg(msg)
        chatBottom.current?.scrollIntoView({ behavior: "smooth" })
    }

    useEffect(() => {
        chatList.currChat.getMsgs()
        chatList.currChat.openSockets()
        SocketService.on('chat newMsg', scroll)
        return () => {
            chatList.currChat.closeSockets()
            SocketService.off('chat newMsg', undefined)
        }
    }, [chatList.currChat])

    return useObserver(() => (
        <div className='msg-container'>
            {chatList.currChat.msgs.map((chat, idx) => {
                return <ChatPreview currUserName={userName} key={idx} chat={chat} />
            })}
            <div ref={chatBottom} />
        </div>
    )
    )
}