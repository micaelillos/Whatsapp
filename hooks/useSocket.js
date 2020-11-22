import { useEffect } from 'react'
import openSocket from 'socket.io-client';
const ENDPOINT = "http://localhost:7890";

export default function useSocket() {
    return new Promise(resolve => {
        const connect = () => {
            var connectionOptions = {
                "force new connection": true,
                "reconnectionAttempts": "Infinity", //avoid having user reconnect manually in order to prevent dead clients after a server restart
                "timeout": 10000,                  //before connect_error and connect_timeout are emitted.
                "transports": ["websocket"]
            };
            resolve(openSocket(ENDPOINT, connectionOptions))
        }

        
            connect();
    
    })
}
