(this.webpackJsonpreact=this.webpackJsonpreact||[]).push([[0],{25:function(e,t){window.getToday=()=>{var e=new Date,t=e.getDate(),n=e.getMonth()+1;return t<10&&(t="0"+t),n<10&&(n="0"+n),n+"/"+t+"/"+e.getFullYear()}},26:function(e,t,n){},28:function(e,t,n){},29:function(e,t,n){},30:function(e,t,n){},31:function(e,t,n){},32:function(e,t,n){},33:function(e,t,n){},34:function(e,t,n){},36:function(e,t,n){},37:function(e,t,n){},43:function(e,t,n){},44:function(e,t,n){},45:function(e,t,n){"use strict";n.r(t);var a=n(1),c=n(16),r=n.n(c),s=(n(25),n(9)),i=n(2),l=(n(26),n(0));var o=function({style:e,className:t,variant:n,children:a}){const c="".concat(t?t+" ":"","textography ").concat(n||"base");return Object(l.jsx)("p",{style:e,className:c,children:a})};n(28);var u=function(){return Object(l.jsx)(o,{variant:"h3",children:"Notes"})};n(29);var j=function(){return Object(l.jsx)(o,{variant:"h3",children:"Analitics"})},d=n(5),b=(n(30),function({className:e,expanded:t,children:n}){return Object(l.jsx)("div",{className:"container ".concat(e),expanded:t,children:n})}),f=(n(31),function({onClick:e,variant:t,children:n,className:a}){return Object(l.jsx)("button",{onClick:e,className:"".concat(t||""," ").concat(a," button"),children:n})}),h=(n(32),function({className:e,elevation:t,children:n,error:c,title:r,footer:s,backgroundImage:i,expanded:u}){const j=Object(a.useState)(t),h=Object(d.a)(j,2),p=h[0],x=h[1],O=Object(a.useState)(u),m=Object(d.a)(O,2),v=m[0],g=m[1],N=e=>!0===v||!1===v?Object(l.jsx)(f,{className:"expand-collaps",onClick:()=>(e=>{g(!e)})(v),variant:"small",children:Object(l.jsx)("span",{children:Object(l.jsx)("i",{className:"fas fa-chevron-circle-up"})})}):"",k=e=>{if(e)return Object(l.jsx)("img",{src:e,alt:e.split("/")[e.split("/").length-1],className:"card-title-image"})};return Object(l.jsxs)("div",{onMouseEnter:()=>x(5),onMouseLeave:()=>x(0),style:{"--elev":p},expanded:v.toString(),className:"elevated card ".concat(e),children:[(e=>{if(e)return Object(l.jsx)(o,{variant:"error warning",children:e})})(c),((e,t)=>{if(e)return Object(l.jsxs)("div",{className:"card-title",children:[Object(l.jsx)(o,{children:e}),k(t)]})})(r,i),Object(l.jsx)(b,{expanded:v.toString(),className:"main-content",children:n}),(e=>{if(e)return Object(l.jsxs)("div",{className:"card-footer",children:[Object(l.jsx)(o,{children:e}),N()]})})(s)]})});n(33);var p=function({onChange:e,value:t,label:n,placeHolder:c,id:r,type:s}){const i=Object(a.useState)(0),o=Object(d.a)(i,2),u=o[0],j=o[1];return Object(l.jsxs)("div",{className:"input-wrapper elevated",style:{"--elev":u},children:[(e=>{if(e)return Object(l.jsx)("label",{className:"input-label",htmlFor:r,children:n})})(n),Object(l.jsx)("input",{value:t,onChange:e,id:r,onFocus:()=>j(8),onBlur:()=>j(0),placeholder:c||"",type:s||"text",className:"input-field"})]})},x=function({options:e,defaultOption:t,selected:n}){return Object(l.jsx)("div",{className:"select-wrap",children:Object(l.jsx)("select",{className:"option selected",children:e&&e.length>0?e.map(((e,t)=>Object(l.jsx)("option",{className:"option",value:e.value,title:e.value,children:e.label},t))):[]})})};n(34);var O=function(){const e=Object(a.useState)([]),t=Object(d.a)(e,2);t[0],t[1];return Object(l.jsxs)(l.Fragment,{children:[Object(l.jsx)(o,{variant:"h3",children:"Raffle Manager"}),Object(l.jsxs)("div",{className:"content-body",children:[Object(l.jsx)(h,{title:"New Raffle",className:"add-raffle",expanded:!1,footer:"Lets get paid",children:Object(l.jsx)(p,{label:"Raffle Item",placeHolder:"Lamborheni"})}),Object(l.jsx)(h,{title:"Edit Raffles",className:"add-raffle",expanded:!1,footer:"Lets get paid",children:Object(l.jsx)(x,{label:"Raffle Item",placeHolder:"Lamborheni",selected:1})})]})]})},m=n(3),v=n.n(m),g=n(7);n(36);const N=window.getToday,k=function(){var e=Object(g.a)(v.a.mark((function e(t,n){var a,c,r;return v.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a={method:t.includes("crud")?"POST":"GET",headers:{"Content-Type":"application/json",Accept:"application/json"},body:JSON.stringify(n)},t="/"!==t[0]?"/".concat(t):t,e.next=4,fetch("".concat("https://codingbutter.com").concat(t),a);case 4:return c=e.sent,e.next=7,c.json();case 7:return r=e.sent,e.abrupt("return",r);case 9:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}(),w=function(){var e=Object(g.a)(v.a.mark((function e(){var t;return v.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,k("crud/read/raffles");case 2:return t=e.sent,e.abrupt("return",t.filter((e=>e.datetime.includes(N()))));case 4:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),y=function(){var e=Object(g.a)(v.a.mark((function e(t){var n;return v.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,k("/st/".concat(t));case 2:return n=e.sent,e.abrupt("return",n);case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),S=function(){var e=Object(g.a)(v.a.mark((function e(t){var n;return v.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,k("/confirm");case 2:return n=e.sent,e.abrupt("return",n);case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();var R=function(){const e=Object(a.useState)([]),t=Object(d.a)(e,2),n=t[0],c=t[1],r=Object(a.useState)(0),s=Object(d.a)(r,2),i=s[0],u=s[1],j=Object(a.useState)([]),b=Object(d.a)(j,2),p=b[0],x=b[1],O=Object(a.useState)({}),m=Object(d.a)(O,2),N=m[0],k=m[1];var R;N&&N.ready&&clearInterval(R);const C=function(){var e=Object(g.a)(v.a.mark((function e(t){return v.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return x(t),e.next=3,y(t);case 3:e.sent,clearInterval(R),R=setInterval((()=>{I(t)}),1e3);case 6:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),I=function(){var e=Object(g.a)(v.a.mark((function e(t){var n;return v.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,S(t);case 2:n=e.sent,k(n);case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();Object(a.useEffect)((()=>{L()}),[]);const L=function(){var e=Object(g.a)(v.a.mark((function e(){var t;return v.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,w();case 2:t=e.sent,c(t);case 4:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return Object(l.jsxs)("div",{className:"rigger",children:[Object(l.jsx)(o,{variant:"h3",children:"Rigger"}),Object(l.jsx)(o,{className:N&&N.ready?"".concat(p," ticket-confirmed"):"ticket-not-confirmed",variant:"h4",children:N&&N.ready?"".concat(p," Confirmed"):"Ticket Not Set"}),Object(l.jsx)(h,{title:"Select Raffle",className:"rigger-card raffle-card",expanded:!0,footer:"Lets get paid",children:Object(l.jsx)("select",{onChange:({target:e})=>{u(e.value)},children:n.map(((e,t)=>Object(l.jsx)("option",{value:t,children:e.item},t)))})}),Object(l.jsx)(h,{title:"Win Raffle",className:"rigger-card ticket-card",expanded:!0,footer:"Lets get paid",children:(()=>{if(n[i])return Object(l.jsxs)("div",{className:"raffle-info",children:[Object(l.jsx)(o,{variant:"h2",children:n[i].item}),Object(l.jsxs)("div",{className:"button-section",children:[Object(l.jsx)(f,{onClick:()=>{C(n[i].ticket)},className:"win-btn",variant:"big",children:"Win"}),Object(l.jsx)(o,{className:"ticket-number",children:n[i].ticket})]})]})})()})]})};n(37);function C({currentPage:e}){const t="/"===e?"notes":e.replace("/","");return Object(l.jsxs)("ul",{className:"nav-ul",children:[Object(l.jsx)("li",{className:"logo",children:Object(l.jsxs)("a",{href:"/",className:"nav-link",children:[Object(l.jsx)("span",{className:"link-text",children:"FEBU"}),Object(l.jsx)("span",{className:"link-icon",children:Object(l.jsx)("i",{className:"fas fa-chart-line"})})]})}),(e=>{const t={notes:{label:"Notes",path:"/",icon:"fab fa-neos"},manager:{label:"Manage Raffles",path:"/manager",icon:"fas fa-tasks"},rigger:{label:"Rigger",path:"/rigger",icon:"fas fa-pound-sign"},analitics:{label:"Analitics",path:"/analitics",icon:"fas fa-chart-area"}};return Object.keys(t).map((n=>{const a=t[n],c=a.path,r=a.label,i=a.icon,o=n===e?"active-nav-item":"";return Object(l.jsx)("li",{id:o,className:"nav-item",children:Object(l.jsxs)(s.b,{className:"nav-link",to:c,children:[Object(l.jsx)("span",{className:"link-icon",children:Object(l.jsx)("i",{className:i})}),Object(l.jsx)("span",{className:"link-text",children:r})]})},n)}))})(t)]})}n(43),n(44);var I=function(){return Object(l.jsxs)(l.Fragment,{children:[Object(l.jsx)("nav",{className:"navbar",children:Object(l.jsx)(C,{currentPage:Object(i.f)().pathname})}),Object(l.jsx)("main",{children:Object(l.jsxs)(i.c,{children:[Object(l.jsx)(i.a,{exact:!0,path:"/",children:Object(l.jsx)(u,{})}),Object(l.jsx)(i.a,{path:"/analitics",children:Object(l.jsx)(j,{})}),Object(l.jsx)(i.a,{path:"/manager",children:Object(l.jsx)(O,{})}),Object(l.jsx)(i.a,{path:"/rigger",children:Object(l.jsx)(R,{})})]})})]})};const L=document.getElementById("root");r.a.render(Object(l.jsx)(s.a,{children:Object(l.jsx)(a.StrictMode,{children:Object(l.jsx)(I,{})})}),L)}},[[45,1,2]]]);
//# sourceMappingURL=main.5a3c6c0c.chunk.js.map