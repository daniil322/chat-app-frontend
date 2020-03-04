import React, { useState, KeyboardEvent } from 'react'

import { Button, Input } from 'antd';
import send_img from '../assets/imgs/send.png'

interface Props {
    sendMsg: Function
    topicAddMode?: boolean
    userName?: string
}

export default function ChatForm({ sendMsg, topicAddMode, userName }: Props) {
    const [form, setForm] = useState({ txt: '', imgUrl: '' })

    function sendMessage() {
        if (!form.txt) return
        if (topicAddMode) {
            sendMsg(form)
        } else {
            sendMsg({ userName: userName, txt: form.txt, _id: Date.now() })
        }
        return setForm({ txt: '', imgUrl: '' })
    }
    function keyPressed(ev: KeyboardEvent) {
        if (ev.key === "Enter") {
            sendMessage()
        }
    }

    function changeInput(ev: React.FormEvent<HTMLInputElement>) {
        setForm({ ...form, [ev.currentTarget.name]: ev.currentTarget.value })
    }

    return (
        <div>
            <div className='flex form-container'>
                <Input size='small' name='txt'
                    placeholder={topicAddMode ?
                        'Add a Topic' : userName ?
                            'Send A Message' : 'Write Your Name'}
                    onKeyDown={keyPressed}
                    value={form.txt} onChange={changeInput} />

                {topicAddMode ?
                    <Input size='small' name='imgUrl'
                        placeholder='Img Url'
                        value={form.imgUrl} onChange={changeInput} onKeyDown={keyPressed} />

                    : ''}

                <Button size='small' className='btn' type='link' onClick={sendMessage} >
                    <img src={send_img} alt='send' />
                </Button>
            </div>
        </div>
    )

}