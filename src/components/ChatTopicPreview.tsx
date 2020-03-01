import React from 'react'
import ChatItem from '../store/ChatItem'
import { Avatar } from 'antd'




interface Props {
    chat: ChatItem
    setCurrTopic: Function
    currTopicId: number
}

export default function ChatTopicPreview(props: Props) {
    const { chat: { topic, _id, imgUrl }, setCurrTopic, currTopicId } = props
    return (
        <div onClick={() => setCurrTopic(_id)} className={`flex pointer topic-container ${currTopicId === _id ? 'active-topic' : ''}`}>
            <Avatar size='large' src={imgUrl} />
            <h4 className='center-self'>{topic}</h4>
        </div>
    )

}