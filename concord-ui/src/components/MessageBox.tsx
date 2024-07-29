import classNames from "classnames";
import { useEffect, useRef, useState } from "react";
import useSocket from "../hooks/useSocket";
import { getUserFromStore } from "../utils";
import { useSearchParams } from "react-router-dom";

const MessageBox = () => {
  const [message,setMessage] = useState(''); 
  const messageContainerRef = useRef<any>(); 
  const [messages,setMessages] = useState([]);
  const { socket } = useSocket();
  const [ searchParams ] = useSearchParams();
  
  useEffect(() => {
   const type = searchParams.get('type');

   socket.on("connect",()=>{
     console.log("connected",socket.id)
   })

   if(type === "join"){
    socket.emit("join_room", {
      room_id: searchParams.get('room_id'),
      user: getUserFromStore().name,
    });
   }
   if(type === "create"){
    const body = {
      topic: searchParams.get('topic'),
      description:searchParams.get('desc'),
      room_id: searchParams.get('room_id'),
      user: getUserFromStore().name,
    };
    socket.emit("room_create", body);
   }
   
    socket.on("recieve_message",(payload:any)=>{
      console.log("recived payload")
      setMessages((prev:any):any => {
        return [
          ...prev,
          payload
        ]
     })
    });
  },[socket,searchParams]);

  useEffect(() => {
    if(messageContainerRef.current){
        messageContainerRef.current!.scrollTo(0, messageContainerRef.current.scrollHeight);
    }
  },[messages]);

  const sendMessage = () => {
    if(message){
      setMessages((prev:any):any => {
        return [
          ...prev,
          {
            room_id : searchParams.get('room_id'),
             text:message,
             author:'self',
             name:'You'
          }
        ]
        })
        socket.emit("send_message",{
          room_id : searchParams.get('room_id'),
          text : message,
          author:"group",
          name:getUserFromStore().name
       });
    }
    setMessage('');
  }
  
  return (
     <div className="w-full h-full bg-[#f0e7e78e] relative px-10">
       <div ref={messageContainerRef} id="box" className="w-full h-full flex flex-col gap-2 pt-4 pb-[70px] overflow-y-scroll scrollbar-hide relative">
         {
           messages.map((message:any,index:any)=>(
            <div key={index} className={classNames("px-3 py-2 min-w-20 max-w-80 w-auto text-white rounded-lg cursor-pointer select-none",{
                "bg-[#3959e9] self-end": message.author === "self",
                "bg-[#667a81] self-start":message.author !== "self"
            })}>
               <div className="font-bold inline-block text-[#ecd09a]">{message.name}</div>
              <div>{message.text}</div>
            </div>
           ))
         }
       </div>
       <form onSubmit={(e)=>{
          e.preventDefault();
          sendMessage();
       }} className="w-[90%] absolute bottom-2 bg-white h-12 flex justify-center rounded-md z-10">
         <input onChange={(e)=>setMessage(e.target.value)} placeholder="Send Message" value={message} className="w-full rounded-md outline-none pl-4" autoFocus/>
         <button type="submit" className="w-12 h-12 flex justify-center items-center rounded-[50%] bg-[#9bcce2]">
            <img src={require("../assets/send-message.png")} alt="send" className="w-4 h-4" width={40} height={40}/>
         </button>
       </form>
     </div>
  )
};

export default MessageBox;