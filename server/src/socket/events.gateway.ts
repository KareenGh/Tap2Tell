import { OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server, Socket } from "socket.io";

require('dotenv').config();

@WebSocketGateway() // is Injectable
export class SocketGatway implements OnGatewayDisconnect, OnGatewayConnection {
    @WebSocketServer() wss: Server
    handleConnection() {
        console.log('connect');
        this.wss.emit('connect')
    }
    handleDisconnect() {
        console.log('handleDisconnect');
        this.wss.emit('disconnect')
    }

    @SubscribeMessage('join-child')
    async handleJoin(client: Socket, userId: string) {
        console.log('join');
        try {
            client.join(`${userId}`)
        } catch (err) {
            console.log('cant join', err);
        }
    }
    async newMessage(newImageDetails, responseAudioPath) {
        console.log('newMassage');
        this.wss.to(`${newImageDetails.userId}`).emit('new-message', { ...newImageDetails, responseAudioPath });

    }
}