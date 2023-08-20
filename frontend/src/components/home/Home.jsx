import React, { useEffect, useMemo, useRef, useState } from 'react'
import "./Home.css";
import { useSocket } from '../../provider/SocketProvider';

const Home = () => {
  const [isOutGoingCall , setIsOutGoingCall] = useState(false);
  const [isIncomingCall , setIsIncomingCall] = useState(false);
  const [host,setHost] = useState(false);
  const socket  = useSocket();
  useEffect(()=>{

    getStream();
    socket.on("connected",onConnection)
    socket.on("incoming-call",onIncomingCall);
    socket.on("received-call",receivedCall);
    socket.on("got-candidate",addIceCandidate);
    peer.ontrack = onTrack;
    peer.onicecandidate = (e)=>{
      if(e.candidate){
      socket.emit("ice-candidate",e.candidate);
      }
    }

    return () => {
      socket.off("connected",onConnection)
      socket.off("incoming-call",onIncomingCall)
      socket.off("received-call",receivedCall);
      // peer.removeEventListener("track",onTrack)
      socket.off("got-candidate",addIceCandidate)
    }
  },
  []);

  const onTrack = async (event) =>{
    console.log("getting peers stream");
    remoteStreamRef.current.srcObject = event.streams[0];
  }
  const peer = useMemo(()=>{
   return new RTCPeerConnection();
  },[])
  const localStreamRef = useRef();
  const remoteStreamRef = useRef();

  const getStream = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({video:true,audio: true})
    // setStream(stream);
    localStreamRef.current.srcObject = stream;
    stream.getTracks().forEach(track=>{
      peer.addTrack(track,stream)
    })
    console.log(peer);
  }

  const calling = async () => {
    setIsOutGoingCall(true);
    setHost(true);
    const offer = await peer.createOffer({
      offerToReceiveAudio : 1,
      offerToReceiveVideo : 1
    });
    peer.setLocalDescription(offer);
   

    socket.emit("calling",offer);
    // getStream();
    // console.log("peer ",Object.keys(offer));
  }

  const onIncomingCall = async (caller_details) => {
    setIsIncomingCall(true);
    setHost(false);
    peer.setRemoteDescription(caller_details)
    console.log("incoming call ",caller_details);

    const answer = await peer.createAnswer({
      offerToReceiveAudio : 1,
      offerToReceiveVideo : 1
    });

    peer.setLocalDescription(answer);
    socket.emit("call_received",answer);
  
  }

  const receivedCall = async (receiver_details) => {
    peer.setRemoteDescription(receiver_details);
    console.log(peer);
    console.log("call received ",receiver_details);
  }
  const addIceCandidate = (candidate) =>{
    // console.log("adding ice candidate ",candidate);
    peer.addIceCandidate(new RTCIceCandidate(candidate));
  }
  const onConnection = (user)=>{
    console.log(user,"connected");

  }
 
  return (
    <>
    <div id="home-wrapper">
      <h1>Video Calling App</h1>
      <video ref={localStreamRef}  autoPlay width={"60%"} className='video'></video>
      <video ref={remoteStreamRef}  autoPlay width={"60%"} className='video'></video>
     
     {(!isOutGoingCall && !isIncomingCall) ? <button onClick={calling}>Call</button> : host ? <div>calling ...</div> : <button onClick={onIncomingCall}>Receive</button>
     }
    </div>
   
    </>
    )
}

export default Home