import { createContext, useContext, useMemo } from "react";
import {io} from "socket.io-client";
const SocketContext = createContext(null)

export const  useSocket = () =>{

    const socket = useContext(SocketContext);
    return socket;

}

 const SocketProvider = (props) => {
    const socket = useMemo(() => io(import.meta.env.VITE_SERVER_URL,{
        auth:{
            name : "someone"
        }
    }),[]);
  return (
    <SocketContext.Provider value={socket} >
        {props.children}
    </SocketContext.Provider>
  )
}

export default SocketProvider;