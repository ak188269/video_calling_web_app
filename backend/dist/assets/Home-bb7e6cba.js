import{r as n,u as j,j as c}from"./index-aa54810e.js";const T=()=>{const[m,g]=n.useState(!1),[v,p]=n.useState(!1),[h,i]=n.useState(!1),t=j();n.useEffect(()=>(R(),t.on("connected",u),t.on("incoming-call",s),t.on("received-call",d),t.on("got-candidate",f),o.ontrack=C,o.onicecandidate=e=>{e.candidate&&t.emit("ice-candidate",e.candidate)},fetch("https://video-calling-web-app.vercel.app/post",{method:"POST"},{name:"avinash"}).then(e=>e.text()).then(e=>{console.log(e)}).catch(e=>{console.log("error ",e)}),()=>{t.off("connected",u),t.off("incoming-call",s),t.off("received-call",d),t.off("got-candidate",f)}),[]);const C=async e=>{console.log("getting peers stream"),l.current.srcObject=e.streams[0]},o=n.useMemo(()=>new RTCPeerConnection,[]),r=n.useRef(),l=n.useRef(),R=async()=>{const e=await navigator.mediaDevices.getUserMedia({video:!0,audio:!0});r.current.srcObject=e,e.getTracks().forEach(a=>{o.addTrack(a,e)}),console.log(o)},x=async()=>{g(!0),i(!0);const e=await o.createOffer({offerToReceiveAudio:1,offerToReceiveVideo:1});o.setLocalDescription(e),t.emit("calling",e)},s=async e=>{p(!0),i(!1),o.setRemoteDescription(e),console.log("incoming call ",e);const a=await o.createAnswer({offerToReceiveAudio:1,offerToReceiveVideo:1});o.setLocalDescription(a),t.emit("call_received",a)},d=async e=>{o.setRemoteDescription(e),console.log(o),console.log("call received ",e)},f=e=>{o.addIceCandidate(new RTCIceCandidate(e))},u=e=>{console.log(e,"connected")};return c.jsx(c.Fragment,{children:c.jsxs("div",{id:"home-wrapper",children:[c.jsx("h1",{children:"Video Calling App"}),c.jsx("video",{ref:r,autoPlay:!0,width:"60%",className:"video"}),c.jsx("video",{ref:l,autoPlay:!0,width:"60%",className:"video"}),!m&&!v?c.jsx("button",{onClick:x,children:"Call"}):h?c.jsx("div",{children:"calling ..."}):c.jsx("button",{onClick:s,children:"Receive"})]})})};export{T as default};