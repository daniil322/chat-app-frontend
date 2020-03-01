import Axios from 'axios'
import ChatMsg from '../interfaces/ChatMsg';
import ChatItem from '../store/ChatItem';

const BASE_URL = process.env.NODE_ENV === 'production'
    ? '/api/chat'
    : '//localhost:3030/api/chat'


let axios = Axios.create({
    withCredentials: true
});


async function get() {
    const todos = await axios.get(BASE_URL)
    return todos.data
}

async function getById(id: number) {
    const todos = await axios.get(`${BASE_URL}/${id}`)
    return todos.data
}

async function addTopic(topic: ChatItem) {
    const todos = await axios.post(BASE_URL, topic)
    return todos.data
}

async function update(id: number, chatList: ChatMsg) {
    const todos = await axios.put(`${BASE_URL}/${id}`, chatList)
    return todos.data
}




export default {
    get,
    addTopic,
    update,
    getById
}