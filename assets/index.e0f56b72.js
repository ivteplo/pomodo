import{o as a,c as n,a as I,b as d,u as y,p as v,d as g,e as i,l as N,w as b,f as p,t as E,F as D,r as x,g as O,h as f,i as w,T as W,j as B}from"./vendor.6c99e673.js";const Y=function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))r(s);new MutationObserver(s=>{for(const o of s)if(o.type==="childList")for(const l of o.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&r(l)}).observe(document,{childList:!0,subtree:!0});function q(s){const o={};return s.integrity&&(o.integrity=s.integrity),s.referrerpolicy&&(o.referrerPolicy=s.referrerpolicy),s.crossorigin==="use-credentials"?o.credentials="include":s.crossorigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function r(s){if(s.ep)return;s.ep=!0;const o=q(s);fetch(s.href,o)}};Y();const H={viewBox:"0 0 3271 1024",fill:"none",xmlns:"http://www.w3.org/2000/svg"},K=I('<path d="M0 0h3271v1024H0z"></path><path d="M276.5 1022V510" stroke="currentColor" stroke-width="54"></path><circle cx="543" cy="510.5" r="266.5" stroke="currentColor" stroke-width="54"></circle><path d="m460.5 509 55.299 54.806a1 1 0 0 0 1.405.003L626 457" stroke="currentColor" stroke-opacity=".5" stroke-width="22" stroke-linecap="round"></path><circle cx="1077.5" cy="608" r="169" stroke="currentColor" stroke-width="54"></circle><path d="M1345.5 804V607.666M1514.83 804V433.37M1683.5 804V607.666" stroke="currentColor" stroke-width="54"></path><mask fill="#fff" id="a"><path d="M1710.5 608a196 196 0 0 0-392 0h54.22c0-18.619 3.66-37.056 10.79-54.258a141.925 141.925 0 0 1 30.73-45.997 141.788 141.788 0 0 1 200.52 0 141.925 141.925 0 0 1 30.73 45.997A141.693 141.693 0 0 1 1656.28 608h54.22Z"></path></mask><path d="M1710.5 608a196 196 0 0 0-392 0h54.22c0-18.619 3.66-37.056 10.79-54.258a141.925 141.925 0 0 1 30.73-45.997 141.788 141.788 0 0 1 200.52 0 141.925 141.925 0 0 1 30.73 45.997A141.693 141.693 0 0 1 1656.28 608h54.22Z" stroke="currentColor" stroke-width="108" mask="url(#a)"></path><circle cx="1951.5" cy="608" r="169" stroke="currentColor" stroke-width="54"></circle><path d="M2557.5 266.597v341.802M2219.5 608.065c0-93.292 75.66-168.936 169-168.936s169 75.644 169 168.936S2481.84 777 2388.5 777s-169-75.643-169-168.935Z" stroke="currentColor" stroke-width="54"></path><circle cx="2825.5" cy="608" r="169" stroke="currentColor" stroke-width="54"></circle>',11),U=[K];function R(e,t){return a(),n("svg",H,U)}var V={render:R};var c=(e,t)=>{const q=e.__vccOpts||e;for(const[r,s]of t)q[r]=s;return q};const P=e=>(v("data-v-2817e5a4"),e=e(),g(),e),F={class:"column"},G=P(()=>i("h1",null,"Pomodo",-1)),Z={name:"Header"},J=Object.assign(Z,{setup(e){return(t,q)=>(a(),n("header",F,[G,d(y(V),{class:"logo","aria-hidden":"true",title:"Pomodo"})]))}});var j=c(J,[["__scopeId","data-v-2817e5a4"]]);const Q={name:"Footer"},$=i("a",{href:"https://github.com/ivteplo/pomodo",target:"_blank",rel:"noreferrer"}," Source Code ",-1),z=[$];function X(e,t,q,r,s,o){return a(),n("footer",null,z)}var ee=c(Q,[["render",X]]);function te(){return new Worker("/pomodo/assets/timerWorker.cb7cf1da.js",{type:"module"})}const M=e=>(e.charAt(0)==="/"&&(e=e.substring(1)),e.charAt(e.length-1)==="/"&&(e=e.slice(0,-1)),e),C=(...e)=>{var t;return(((t=e[0])==null?void 0:t.charAt(0))==="/"?"/":"")+M(e.reduce((q,r)=>(r=M(r),q+(r?"/"+r:"")),""))},qe=async()=>{Notification.permission==="default"&&await Notification.requestPermission()},re=({title:e,description:t,tag:q=void 0,onClick:r})=>{if(Notification.permission==="granted"){const s=new Notification(e,{body:t,icon:C("/pomodo/","icons/ios/256.png"),sound:"default",tag:q});return s.addEventListener("click",r),s}},se=({isRunning:e,timeLeft:t})=>N.setItem("timer",{isRunning:e,timeLeft:t,timeStamp:Date.now()}),oe=()=>N.getItem("timer"),k=e=>(e>=10?"":"0")+e,_=(e,t)=>e.map((q,r)=>q+t[r]),ie=(e,t)=>e.map((q,r)=>q-t[r]),ae=(e,t,q,r,s)=>(e-t)/(q-t)*(s-r)+r;let A=()=>{};const ne={name:"CircularArc",expose:["isBeingChanged"],emits:["change"],props:{min:Number,max:Number,step:Number,value:{type:Number},inputLabel:String,showCircleOnEnd:{type:Boolean,default:!1}},data(){return{radius:45,center:[50,50],isBeingChanged:!1,_value:this.value}},beforeUnmount(){A()},computed:{normal(){return[this.radius,-this.radius]},start(){return _(this.center,[0,-this.radius])},angle(){return this._value/this.max*2*Math.PI},end(){return _(this.center,[this.normal[0]*Math.sin(this.angle),this.normal[1]*Math.cos(this.angle)])},pathD(){const e=Math.min(this.angle,Math.PI),t=_(this.center,[this.normal[0]*Math.sin(e),this.normal[1]*Math.cos(e)]);return["M",...this.start,"A",this.radius,this.radius,0,0,1,...t,"M",...t,"A",this.radius,this.radius,0,0,1,...this.end].join(" ")}},methods:{startChange(){this.isBeingChanged=!0;const e=q=>this.onChange(q),t=()=>this.endChange();window.addEventListener("mousemove",e),window.addEventListener("touchmove",e),window.addEventListener("mouseup",t),window.addEventListener("touchend",t),A=()=>{window.removeEventListener("mousemove",t),window.removeEventListener("touchmove",t),window.removeEventListener("mouseup",t),window.removeEventListener("touchend",t)}},endChange(){this.isBeingChanged=!1,this._value=this.value,A(),A=()=>{}},onChange(e){if(!this.isBeingChanged)return;const t=e.touches?e.touches[0]:e,q=this.$refs.svg,r=[t.pageX,t.pageY],s=q.getBoundingClientRect(),o=[s.left+s.width/2,s.top+s.height/2],l=ie(r,o);let h=Math.atan2(-l[1],-l[0]);h>Math.PI/2&&h<=Math.PI?h-=Math.PI/2:h+=1.5*Math.PI;let u=Math.round(ae(h,0,2*Math.PI,0,this.max));u=Math.max(this.min,u),u!==this._value&&Math.abs(u-this._value)<=this.max/2&&(this._value=u,this.$emit("change",{value:u}))},onInputChange(e){const t=Math.round(Math.max(0,Math.min(this.max,e.target.value)));e.target.value=t,this._value=t,this.$emit("change",{value:t})}},watch:{"$props.value"(){this._value=this.value}}},le=e=>(v("data-v-314df09b"),e=e(),g(),e),de={class:"CircularArc"},ce={"aria-hidden":"true",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 100 100",ref:"svg"},ue=le(()=>i("circle",{class:"background",cx:"50",cy:"50",r:"45"},null,-1)),he=["d"],me=["cx","cy"],pe={key:0,class:"ScreenReaderOnly"},fe={for:"input"},Ae=["min","max","step","value"];function ve(e,t,q,r,s,o){return a(),n("div",de,[(a(),n("svg",ce,[ue,i("path",{d:o.pathD,fill:"transparent",stroke:"currentColor","stroke-width":"4","stroke-linecap":"round"},null,8,he),q.showCircleOnEnd?(a(),n("circle",{key:0,cx:o.end[0],cy:o.end[1],r:"5",onMousedown:t[0]||(t[0]=(...l)=>o.startChange&&o.startChange(...l)),onTouchstart:t[1]||(t[1]=b((...l)=>o.startChange&&o.startChange(...l),["prevent"]))},null,40,me)):p("",!0)],512)),q.showCircleOnEnd?(a(),n("div",pe,[i("label",fe,E(this.inputLabel),1),i("input",{id:"input",class:"ScreenReaderOnly",type:"range",min:q.min,max:q.max,step:q.step,value:q.value,onChange:t[2]||(t[2]=(...l)=>o.onInputChange&&o.onInputChange(...l))},null,40,Ae)])):p("",!0)])}var ge=c(ne,[["render",ve],["__scopeId","data-v-314df09b"]]);const _e={class:"TimerDisplay"},we=["title"],Me={name:"TimerDisplay",expose:["timerDuration","timeLeft","start","stop","onTick"],emits:["timerEnd"],props:{min:{type:Number,default:10},max:{type:Number,default:120},step:{type:Number,default:5},initialDuration:{type:Number,default:25*60}},data(){return{timerDuration:this.initialDuration,timeLeft:null,hasStarted:!1}},methods:{timeString(e){const t=Math.floor(e/60),q=Math.floor(e%60);return[...k(t),":",...k(q)].join("")},onTick(e){!this.hasStarted||(this.timeLeft=Math.max(0,this.timeLeft-e/1e3),this.timeLeft===0&&(this.stop(),this.$emit("timerEnd")))},start(){this.hasStarted||(this.timeLeft=this.timerDuration,this.hasStarted=!0)},stop(){!this.hasStarted||(this.hasStarted=!1,this.timeLeft=null)},onTimerDurationChange({value:e}){this.timerDuration=Math.round(e/this.step)*this.step*60}},computed:{shownTime(){return this.hasStarted?this.timeLeft:this.timerDuration},timerValueTitle(){return this.hasStarted?"Time left":"Timer duration in minutes"}}},ke=Object.assign(Me,{setup(e){return(t,q)=>(a(),n("div",_e,[d(ge,{class:"CircularArc",min:e.min,max:e.max,step:e.step,value:+t.shownTime/60,showCircleOnEnd:!t.hasStarted,inputLabel:"Timer duration in minutes",onChange:t.onTimerDurationChange},null,8,["min","max","step","value","showCircleOnEnd","onChange"]),i("p",{class:"TimerValue row",title:t.timerValueTitle},[(a(!0),n(D,null,x(Object.entries(t.timeString(t.shownTime)),([r,s])=>(a(),n("span",{key:r},E(s),1))),128))],8,we)]))}});var ye=c(ke,[["__scopeId","data-v-0d546b4b"]]);const Ne={name:"Alert",emits:["hide"],props:{isOpen:Boolean,role:{type:String,default:"alert"}},methods:{hide(){this.$emit("hide")}}},Ee={key:0,class:"Alert"},Ce=["role"],Te={class:"AlertContentsInformation column"},Se={class:"AlertActionButtons column"};function Le(e,t,q,r,s,o){return a(),O(W,{name:"fade"},{default:f(()=>[q.isOpen?(a(),n("div",Ee,[i("div",{class:"AlertOverlay",onClick:t[0]||(t[0]=(...l)=>o.hide&&o.hide(...l))}),i("div",{class:"AlertContents column",role:q.role},[i("div",Te,[w(e.$slots,"body",{},void 0,!0)]),i("div",Se,[w(e.$slots,"actions",{},void 0,!0)])],8,Ce)])):p("",!0)]),_:3})}var T=c(Ne,[["render",Le],["__scopeId","data-v-1ba570c5"]]),Ie="data:audio/mpeg;base64,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";const S=e=>(v("data-v-289cbfb7"),e=e(),g(),e),be={class:"Timer column"},De=["src"],xe=S(()=>i("h2",null,"Yoo!",-1)),Oe=S(()=>i("p",null,"You've finished your pomodoro! Now it's time to relax for a bit.",-1));let m;const We="timer",Be={name:"Timer",expose:["startTimer","stopTimer"],data(){return{timerHasStarted:!1,timerWorker:null,elapsedFromLastSave:0,showYooModal:!1,lastNotification:null}},beforeMount(){m=new te,m.addEventListener("message",e=>{var t;switch((t=e.data)==null?void 0:t.action){case"tick":return this.onTick(e.data.deltaTime);default:console.error("Unknown timer worker message",e.data)}})},async mounted(){const e=await oe();if(!(e!=null&&e.isRunning))return;const t=e.timeLeft-(Date.now()-e.timeStamp)/1e3,{timerDuration:q}=this.$refs.timerDisplay;this.$refs.timerDisplay.timerDuration=t,this.startTimer(),setTimeout(()=>{this.$refs.timerDisplay.timerDuration=q},0)},beforeUnmount(){m.postMessage("stopTimer")},methods:{startTimer(){var e;qe(),this.timerHasStarted=!0,(e=this.lastNotification)==null||e.close()},stopTimer(e=!1){e||(this.$refs.yooSound.play(),this.showYooModal=!0,this.lastNotification=re({title:"Yoo!",description:"You've finished the pomodoro! It's time to relax for a bit",tag:We,onClick(){window.focus()}})),this.timerHasStarted=!1},onTick(e){this.elapsedFromLastSave+=e,this.$refs.timerDisplay.onTick(e),this.saveState()},saveState(e=!1){if(!e&&this.elapsedFromLastSave<2e3)return;const t={isRunning:this.timerHasStarted,timeLeft:this.$refs.timerDisplay.timeLeft};se(t).catch(console.error),this.elapsedFromLastSave=0},hideYooModal(){this.showYooModal=!1}},watch:{timerHasStarted(e){e?(this.$refs.timerDisplay.start(),m.postMessage("startTimer")):(this.$refs.timerDisplay.stop(),m.postMessage("stopTimer")),this.saveState(!0)}}},Ye=Object.assign(Be,{setup(e){return(t,q)=>(a(),n("section",be,[i("audio",{src:y(Ie),ref:"yooSound"},null,8,De),d(ye,{ref:"timerDisplay",onTimerEnd:t.stopTimer},null,8,["onTimerEnd"]),t.timerHasStarted?p("",!0):(a(),n("button",{key:0,type:"button",class:"primary",onClick:q[0]||(q[0]=(...r)=>t.startTimer&&t.startTimer(...r))}," Start ")),t.timerHasStarted?(a(),n("button",{key:1,type:"button",class:"gray",onClick:q[1]||(q[1]=()=>t.stopTimer(!0))}," Cancel ")):p("",!0),d(T,{isOpen:t.showYooModal,onHide:t.hideYooModal},{body:f(()=>[xe,Oe]),actions:f(()=>[i("button",{type:"button",class:"gray",onClick:q[2]||(q[2]=(...r)=>t.hideYooModal&&t.hideYooModal(...r))},"OK")]),_:1},8,["isOpen","onHide"])]))}});var He=c(Ye,[["__scopeId","data-v-289cbfb7"]]);const L=e=>(v("data-v-2166f2dd"),e=e(),g(),e),Ke={class:"App fill column"},Ue=L(()=>i("h2",null,"Update",-1)),Re=L(()=>i("p",null," There is an update available. It will be installed when all tabs for this page are closed. ",-1)),Ve={name:"App",data(){return{isUpdateAlertShown:!1,newWorker:null}},mounted(){this.checkForUpdates()},methods:{hideUpdateAlert(){this.isUpdateAlertShown=!1},skipWaiting(){!this.newWorker||this.newWorker.postMessage({action:"skipWaiting"})},async checkForUpdates(){if(!navigator.serviceWorker)return;const e=await navigator.serviceWorker.getRegistration();e==null||e.addEventListener("updatefound",()=>{const t=e.installing;t!=null&&t.addEventListener("statechange",()=>{t.state==="installed"&&(navigator.serviceWorker.controller?(this.newWorker=t,this.isUpdateAlertShown=!0,console.log("New content is available")):console.log("Content is cached for offline use"))})}),navigator.serviceWorker.addEventListener("controllerchange",()=>{window.location.reload()})}}},Pe=Object.assign(Ve,{setup(e){return(t,q)=>(a(),n("div",Ke,[d(j),d(He),d(ee),d(T,{onHide:t.hideUpdateAlert,isOpen:t.isUpdateAlertShown},{body:f(()=>[Ue,Re]),actions:f(()=>[i("button",{type:"button",onClick:q[0]||(q[0]=(...r)=>t.skipWaiting&&t.skipWaiting(...r))},"Reload"),i("button",{type:"button",class:"gray",onClick:q[1]||(q[1]=(...r)=>t.hideUpdateAlert&&t.hideUpdateAlert(...r))}," Cancel ")]),_:1},8,["onHide","isOpen"])]))}});var Fe=c(Pe,[["__scopeId","data-v-2166f2dd"]]);B(Fe).mount("#app");function Ge(){if(!navigator.serviceWorker)return;console.log("navigator.serviceWorker is available");const e="/pomodo/",t=C(e,"serviceWorker.js"),q=e;console.log(`Registering service worker ${t} for ${q} scope`),navigator.serviceWorker.register(t,{scope:q}).then(r=>{console.log("[Service worker] Registered with the scope "+r.scope)}).catch(console.error)}Ge();
