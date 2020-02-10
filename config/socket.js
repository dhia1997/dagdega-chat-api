import socketio from 'socket.io';
export default (server) => {
    const io  = socketio(server);
    io.on('connection', () => {
        console.log('new web socket connection');
    });
}