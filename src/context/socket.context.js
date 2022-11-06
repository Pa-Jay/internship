import io from 'socket.io-client'
import React, { createContext, useContext } from 'react'
import { SOCKET_URL } from '../config/default'

const socket = io(SOCKET_URL);

const SocketContext = createContext({socket});


function SocketsProvider(props) {
  return <SocketContext.Provider value={{socket}} {...props} /> 
}

export const useSockets = () => useContext(SocketContext);

export default SocketsProvider;