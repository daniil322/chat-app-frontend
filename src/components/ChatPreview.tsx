import React from 'react'
import ChatMsg from '../interfaces/ChatMsg'
import { Comment } from 'antd'

interface Props {
    chat: ChatMsg
    currUserName: string
}

export default function ChatPreview({ currUserName, chat: { userName, txt } }: Props) {

    return (
        <div className={`flex coulmn comment-container ${currUserName === userName && currUserName ? 'rtl my-message' : ''} `}>
            <Comment
                author={<p>{userName}</p>}
                content={
                    <p className={`${currUserName === userName && currUserName ? 'rtl my-message' : 'others-msg'} `}>
                        {txt}
                    </p>
                } />
        </div>

    )

}