import React, { useState } from 'react'

import { Button, Input } from 'antd';
import send_img from '../assets/imgs/send.png'

interface Props {
    sendMsg: Function
    topicAddMode?: boolean
    userName?: string
}

export default function ChatForm(props: Props) {

    const [form, seForm] = useState({ txt: '', imgUrl: '' })


    function sendMessage() {
        if (!form.txt) return
        if (props.topicAddMode) {
            props.sendMsg(form)
        } else {
            props.sendMsg({ userName: props.userName, txt: form.txt, _id: Date.now() })
        }
        return seForm({ txt: '', imgUrl: '' })
    }

    function changeInput(ev: React.FormEvent<HTMLInputElement>) {
        seForm({ ...form, [ev.currentTarget.name]: ev.currentTarget.value })
    }

    return (
        <div>
            <div className='flex form-container'>
                <Input size='small' name='txt'
                    placeholder={props.topicAddMode ?
                        'Add a Topic' : props.userName ?
                            'Send A Message' : 'Write Your Name'}
                    value={form.txt} onChange={changeInput} />

                {props.topicAddMode ?
                    <Input size='small' name='imgUrl'
                        placeholder='Img Url'
                        value={form.imgUrl} onChange={changeInput} />
                    : ''}

                <Button size='small' className='btn' type='link' onClick={sendMessage} >
                    <img src={send_img} alt='send' />
                </Button>
            </div>
        </div>
    )

}