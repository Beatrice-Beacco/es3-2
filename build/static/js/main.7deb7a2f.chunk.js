(this.webpackJsonp02phonebook=this.webpackJsonp02phonebook||[]).push([[0],{42:function(e,t,n){"use strict";n.r(t);var r=n(17),c=n.n(r),u=n(18),i=n(8),a=n(3),o=n(2),d=n(5),s=n.n(d),j="api/persons",b=function(){return s.a.get(j).then((function(e){return e.data}))},l=b,h=function(e){return s.a.post(j,e).then((function(e){return e.data}))},f=function(e,t){return s.a.put(j+"/"+e,t).then((function(e){return e.data}))},O=function(e){return s.a.delete("".concat(j,"/").concat(e)).then(b)},m=n(0),x=function(e){var t=e.list,n=e.handler;return Object(m.jsx)("div",{children:t.map((function(e){return Object(m.jsxs)("li",{children:[e.name," - Number: ",e.number," ",Object(m.jsx)("button",{onClick:function(t){return n(t,e.id,e.name)},children:"Delete"})]},e.id)}))})},p=function(e){var t=e.results;return Object(m.jsx)(m.Fragment,{children:t.map((function(e){return" --- "+e.name+": "+e.number}))})},v=function(e){var t=e.text,n=e.id,r=e.updateFunction,c=e.stateHandler;return Object(m.jsxs)("div",{children:[t,": ",Object(m.jsx)("input",{id:n,onChange:function(e){return r(e,c,n)}})]})},g=function(e){var t=e.state,n={color:t[1],background:"lightgrey",fontSize:20,borderStyle:"solid",borderRadius:5,padding:10,marginBottom:10};return t?Object(m.jsx)("div",{style:n,children:Object(m.jsx)("em",{children:t[0]})}):null},y=function(){var e=Object(o.useState)([]),t=Object(a.a)(e,2),n=t[0],r=t[1],c=Object(o.useState)(""),d=Object(a.a)(c,2),s=d[0],j=d[1],b=Object(o.useState)(""),y=Object(a.a)(b,2),w=y[0],S=y[1],k=Object(o.useState)([]),D=Object(a.a)(k,2),N=D[0],B=D[1],E=Object(o.useState)(""),F=Object(a.a)(E,2),A=F[0],C=F[1];Object(o.useEffect)((function(){l().then((function(e){return r(e)}))}),[]);var H=function(e,t,n){return e.preventDefault(),t(document.getElementById(n).value)},I=function(e){return C(e),setTimeout((function(){C("")}),5e3)};return Object(m.jsxs)("div",{children:[Object(m.jsx)("center",{children:Object(m.jsx)("h1",{children:"Phonebook"})}),Object(m.jsx)(g,{state:A}),Object(m.jsx)("h2",{children:"Search"}),Object(m.jsx)("input",{id:"search",onChange:function(){var e=document.getElementById("search").value,t=n.filter((function(t){return t.name.search(e)>-1}));return B(t)}}),Object(m.jsx)("br",{}),"Results: ",Object(m.jsx)(p,{results:N}),Object(m.jsx)("h2",{children:"Add New"}),Object(m.jsxs)("form",{onSubmit:function(e){e.preventDefault();var t=n.find((function(e){return e.name===s}));if(!s||!w)return window.alert("Please, complete both fields!");if(t){if(window.confirm("The name "+s+" is already present! Do you want to replace the number?")){var c=Object(i.a)(Object(i.a)({},t),{},{number:w});f(t.id,c).then((function(){return l()})).then((function(e){return r(e)})).then(I(["Updated "+s,"green"]))}}else{var a=n.reduce((function(e,t){return Math.max(e,t.id)}),0);h({name:s,number:w,id:a+1}).then((function(e){return r([].concat(Object(u.a)(n),[e]))})).then(I(["Added "+s,"green"]))}},children:[Object(m.jsx)(v,{text:"Name",id:"name",updateFunction:H,stateHandler:j}),Object(m.jsx)(v,{text:"Number",id:"number",updateFunction:H,stateHandler:S}),Object(m.jsx)("div",{children:Object(m.jsx)("button",{type:"submit",children:"Add"})})]}),Object(m.jsx)("h2",{children:"Numbers"}),Object(m.jsx)(x,{list:n,handler:function(e,t,n){e.preventDefault(),O(t).then((function(){l().then((function(e){return r(e)}))})).catch((function(){return I([n+" was already deleted from the server","red"])}))}})]})};c.a.render(Object(m.jsx)(y,{}),document.getElementById("root"))}},[[42,1,2]]]);
//# sourceMappingURL=main.7deb7a2f.chunk.js.map