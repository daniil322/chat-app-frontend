import React from 'react'
import ChatMsg from '../interfaces/ChatMsg'
import { Comment } from 'antd'


interface Props {
    chat: ChatMsg
    userName: string
}

export default function ChatPreview(props: Props) {
    const { userName, txt } = props.chat

    return (
        <div className={`flex coulmn comment-container ${props.userName === userName && props.userName ? 'rtl my-message' : ''} `}>
            <Comment
                author={<p>{userName}</p>}
                content={
                    <p className={`${props.userName === userName && props.userName ? 'rtl my-message' : 'others-msg'} `}>
                        {txt}
                    </p>
                } />
        </div>

    )

}