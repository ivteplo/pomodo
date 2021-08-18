var e=Object.defineProperty,t=Object.getOwnPropertySymbols,o=Object.prototype.hasOwnProperty,s=Object.prototype.propertyIsEnumerable,n=(t,o,s)=>o in t?e(t,o,{enumerable:!0,configurable:!0,writable:!0,value:s}):t[o]=s,r=(e,r)=>{for(var a in r||(r={}))o.call(r,a)&&n(e,a,r[a]);if(t)for(var a of t(r))s.call(r,a)&&n(e,a,r[a]);return e};import{o as a,c as i,a as u,F as l,r as c,t as d,n as m,p as f,b as p,d as g,e as h,f as k,w as b,T as y,g as v,h as w,i as L}from"./vendor.3ffb7c6b.js";!function(){const e=document.createElement("link").relList;if(!(e&&e.supports&&e.supports("modulepreload"))){for(const e of document.querySelectorAll('link[rel="modulepreload"]'))t(e);new MutationObserver((e=>{for(const o of e)if("childList"===o.type)for(const e of o.addedNodes)"LINK"===e.tagName&&"modulepreload"===e.rel&&t(e)})).observe(document,{childList:!0,subtree:!0})}function t(e){if(e.ep)return;e.ep=!0;const t=function(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerpolicy&&(t.referrerPolicy=e.referrerpolicy),"use-credentials"===e.crossorigin?t.credentials="include":"anonymous"===e.crossorigin?t.credentials="omit":t.credentials="same-origin",t}(e);fetch(e.href,t)}}();const B={props:{time:String,isPaused:Boolean},setup:e=>(t,o)=>(a(),i("button",{class:m("column Timer "+(e.isPaused?"paused":"")),role:"status"},[u("h2",null,[(a(!0),i(l,null,c(Object.entries(e.time.split("")),(([e,t])=>(a(),i("span",{key:e+t},d(t),1)))),128))]),u("p",null,d(e.isPaused?"Paused":"Running"),1)],2)),__scopeId:"data-v-c82834da"};const C={methods:{close(){this.$emit("close")}},emits:["close"]};f("data-v-61ba2992");const P={class:"modal-wrapper column"},S={class:"modal column"},O={class:"row"},F=u("span",null,null,-1),j={class:"controls"};p(),C.render=function(e,t,o,s,n,r){return a(),i("div",P,[u("div",S,[u("header",O,[g(e.$slots,"header",{},(()=>[F]),{}),u("div",j,[u("button",{type:"button",role:"navigation",onClick:t[0]||(t[0]=e=>r.close())}," Close ")])]),u("main",null,[g(e.$slots,"body",{},void 0,!0)])]),u("div",{class:"modal-blur-background",onClick:t[1]||(t[1]=e=>r.close())})])},C.__scopeId="data-v-61ba2992";const N={mode:"focus",streaksForLongBreak:4,streak:{time:Date.now(),length:0},durations:{focus:1500,shortBreak:300,longBreak:900}},T=["focus","shortBreak","longBreak"],D=e=>-1!==T.indexOf(e),x=e=>{if("object"!=typeof e.durations)e.durations=r({},N.durations);else{for(const[t,o]in Object.entries(e.durations))D(t)?"number"!=typeof o&&(e.durations[t]=N.durations[t]):delete e.durations[t];for(let t of T)t in e.durations||(e.durations[t]=N.durations[t])}return D(e.mode)||(e.mode="focus",e.timeLeft=e.durations.focus),"object"==typeof e.streak&&"number"==typeof e.streak.time&&"number"==typeof e.streak.length&&Date.now()-e.streak.time<=288e5||(e.streak=r({},N.streak)),"number"!=typeof e.streaksForLongBreak?e.streaksForLongBreak=N.streaksForLongBreak:e.streaksForLongBreak=Math.max(2,Math.min(8,e.streaksForLongBreak)),"number"==typeof e.timeLeft&&e.timeLeft>=0||(e.timeLeft=e.durations[e.mode]),e},A=e=>{e=x(r({},e)),localStorage.setItem("state",JSON.stringify(e))};const I={class:"column"},q=u("h1",null,"Pomodo",-1),M={class:"row status-buttons"},E=u("h2",null,"Settings",-1),R={class:"column settings"},_={class:"column setting"},$=u("h3",null,"Focus timer duration (in minutes)",-1),H=["value"],J={class:"column setting"},z=u("h3",null,"Short break duration (in minutes)",-1),K=["value"],V={class:"column setting"},G=u("h3",null,"Long break duration (in minutes)",-1),Q=["value"];const U=e=>e>9?e.toString():"0"+e;var W=h((()=>{const e=(()=>{const e=localStorage.getItem("state");if(!e)return r({},N);try{return JSON.parse(e)}catch(t){if(t instanceof SyntaxError)return r({},N);throw t}})(),t=x(r(r({},N),e));return A(t),t})()),X=()=>{};const Y={data:()=>({isPaused:!0,areSettingsOpen:!1,durations:W.durations}),computed:{timeLeftString(){var e=Math.floor(W.timeLeft/60/60);return[e||null,Math.floor(W.timeLeft/60%60),Math.floor(W.timeLeft%60)].filter((e=>null!==e)).map(U).join(":")}},methods:{switchTo(e){this.isPaused=!0,W.mode=e,W.timeLeft=W.durations[e],A(W)},buttonClass:e=>e===W.mode?"selected":"",toggle(){this.isPaused=!this.isPaused,this.isPaused||this.startTimer()},timerClicked(){this.toggle(),this.setupNotifications()},startTimer(){const e=window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||(e=>setInterval(e,1e3/30));let t=Date.now();const o=()=>{if(!this.isPaused){let s=Date.now()-t;if(W.timeLeft=W.timeLeft-s/1e3,t+=s,W.timeLeft<=0)if("focus"===W.mode){W.streak.length+=1,W.streak.time=Date.now();const e=W.streak.length%W.streaksForLongBreak==0;this.switchTo(e?"longBreak":"shortBreak"),X("Hey, the break is over","It's time to focus on your tasks")}else this.switchTo("focus"),X("Hey, it's time for a break","Relax and collect more energy to work productively during the next pomodoro");A(W),e(o)}};o()},setDuration(e,t){W.durations[e]=60*+t,A(W)},async setupNotifications(){"default"===Notification.permission&&await Notification.requestPermission(),"granted"===Notification.permission&&(X=(e,t)=>{new Notification(e,{body:t,icon:"/favicon.ico",sound:"default"})})}}};L(Object.assign(Y,{setup:function(e){return(e,t)=>(a(),i(l,null,[u("header",I,[q,u("div",M,[u("button",{type:"button",class:m(e.buttonClass("focus")),onClick:t[0]||(t[0]=t=>e.switchTo("focus"))}," Focus ",2),u("button",{type:"button",class:m(e.buttonClass("shortBreak")),onClick:t[1]||(t[1]=t=>e.switchTo("shortBreak"))}," Short Break ",2),u("button",{type:"button",class:m(e.buttonClass("longBreak")),onClick:t[2]||(t[2]=t=>e.switchTo("longBreak"))}," Long Break ",2)])]),k(B,{time:e.timeLeftString,isPaused:e.isPaused,onClick:t[3]||(t[3]=t=>e.timerClicked())},null,8,["time","isPaused"]),u("button",{type:"button",class:"settings-button",onClick:t[4]||(t[4]=t=>e.areSettingsOpen=!0)}," Settings "),k(y,{name:"fade"},{default:b((()=>[e.areSettingsOpen?(a(),v(C,{key:0,onClose:t[8]||(t[8]=t=>e.areSettingsOpen=!1)},{header:b((()=>[E])),body:b((()=>[u("div",R,[u("div",_,[$,u("input",{type:"number",min:"10",max:"120",value:e.durations.focus/60,onChange:t[5]||(t[5]=t=>e.setDuration("focus",t.target.value))},null,40,H)]),u("div",J,[z,u("input",{type:"number",min:"5",max:"15",value:e.durations.shortBreak/60,onChange:t[6]||(t[6]=t=>e.setDuration("shortBreak",t.target.value))},null,40,K)]),u("div",V,[G,u("input",{type:"number",min:"10",max:"60",value:e.durations.longBreak/60,onChange:t[7]||(t[7]=t=>e.setDuration("longBreak",t.target.value))},null,40,Q)])])])),_:1})):w("",!0)])),_:1})],64))}})).mount("#app"),(()=>{const e=document.createElement("meta");document.head.appendChild(e);const t=()=>{e.setAttribute("name","theme-color"),e.setAttribute("content",getComputedStyle(document.documentElement).getPropertyValue("--background"))};window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change",t),t()})();
