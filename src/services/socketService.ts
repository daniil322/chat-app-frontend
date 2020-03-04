import io from 'socket.io-client';

const BASE_URL: string =
  process.env.NODE_ENV === 'production' ? '/' : '//localhost:3030';

let socket: SocketIOClient.Socket | null

function setup() {
  socket = io(BASE_URL);
}

function terminate() {
  socket = null;
}

function on(eventName: string, cb: Function) {
  if (!socket) {
    return
  }
  return socket.on(eventName, cb)
}

function off(eventName: string, cb: Function | undefined) {
  if (!socket) {
    return
  }
  else return socket.off(eventName, cb);
}

function emit(eventName: string, data: object) {
  if (!socket) {
    return
  }
  else return socket.emit(eventName, data);
}

export default {
  setup,
  terminate,
  on,
  off,
  emit
};