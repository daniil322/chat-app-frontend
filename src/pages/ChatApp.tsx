import React, { useState, useEffect } from 'react'
import { useStore } from '../store/UseStore';
import { useObserver } from 'mobx-react-lite'

import ChatForm from '../components/ChatForm'
import ChatMsg from '../interfaces/ChatMsg';
import ChatTopicsList from '../components/ChatTopicList';
import ChatList from '../components/ChatList';
import addPng from '../assets/imgs/addPng.png'
import { Avatar, Modal } from 'antd';

export default function TodosPage() {
    const rootStore = useStore();
    const { chatList } = rootStore
    const [topicAddMode, setTopicAddMode] = useState(false)
    const [isModalShown, setIsModalShown] = useState(true)
    const [userName, setUserName] = useState('')

    useEffect(() => {
        chatList.openSockets()
    }, [chatList])

    function toggleTopicAddMode() {
        setTopicAddMode(!topicAddMode)
    }

    async function addTopic(newTopic: { txt: string, imgUrl: string }) {
        chatList.addTopic(newTopic)
        toggleTopicAddMode()
    }

    function sendMsg(msg: ChatMsg) {
        chatList.currChat.addMsg(msg)
    }

    function onOk() {
        if (userName) {
            setIsModalShown(false)
        }
    }

    function topicForm() {
        return (<div className='flex coulmn space-between container chat-container'>
            <div className='flex header chat-header-container'>
                <h3 >Add Topic</h3>
            </div>
            <ChatForm topicAddMode={topicAddMode} sendMsg={addTopic} />
        </div>)
    }

    function addUserName() {
        return (<Modal title="Choose a name" visible={isModalShown} onOk={onOk} onCancel={onOk}>
            <input value={userName} onChange={(ev) => setUserName(ev.currentTarget.value)} />
        </Modal>)
    }

    return useObserver(() => {
        const { currChat } = chatList
        return (
            <div className='app-container flex coulmn justify-center'>
                {isModalShown ?
                    addUserName()
                    : ''
                }
                <div className='flex'>
                    <div className='flex coulmn container topics-container'>
                        <div className='flex header chat-header-container'>
                            <h3 >Topics</h3>
                        </div>
                        <h3 className='pointer add-btn' onClick={toggleTopicAddMode}><img src={addPng} alt='+' /></h3>
                        <ChatTopicsList topicAddMode={topicAddMode} toggleTopicAddMode={toggleTopicAddMode} />
                    </div>

                    {topicAddMode ?
                        topicForm() :
                        currChat._id ?
                            <div className='flex coulmn container chat-container'>
                                <div className='flex header chat-header-container'>
                                    <Avatar src={currChat.imgUrl} />
                                    <h3 className='center-self'> {currChat.topic}</h3>
                                </div>
                                <ChatList userName={userName} />
                                <ChatForm userName={userName} topicAddMode={topicAddMode} sendMsg={sendMsg} />
                            </div>
                            : ''}
                </div>
            </div>
        )
    }
    )

}