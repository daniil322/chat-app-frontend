
import React, { useEffect } from 'react'
import ChatTopicPreview from './ChatTopicPreview'
import { useStore } from '../store/UseStore';
import { useObserver } from 'mobx-react-lite'

interface Props {
    toggleTopicAddMode: Function
    topicAddMode: Boolean
}

export default function ChatTopicsList(props: Props) {

    const rootStore = useStore();
    const { chatList } = rootStore

    function setCurrTopic(_id: number) {
        if (props.topicAddMode) {
            props.toggleTopicAddMode()
        }
        chatList.setCurrChat(_id)
    }

    useEffect(() => {
        chatList.getChats()
    }, [chatList])

    return useObserver(() => (
        <div className='overflow-y'>
            {chatList.chats.map((chat) => {
                return <ChatTopicPreview setCurrTopic={setCurrTopic} key={chat._id + chat.topic} chat={chat} currTopicId={chatList.currChat._id} />
            })}
        </div>

    )
    )

}