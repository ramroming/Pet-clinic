(this["webpackJsonppet-clinic-app"]=this["webpackJsonppet-clinic-app"]||[]).push([[34],{254:function(e,r,a){"use strict";a.r(r);var s=a(8),t=a.n(s),n=a(11),c=a(4),o=a(1),l=a(38),u=a(30),i=a(71),p=a(12),d=a(6),b=a(5),j=a(0),m={first_name:{value:"",errorMsg:""},last_name:{value:"",errorMsg:""},username:{value:"",errorMsg:""},phone_number:{value:"",errorMsg:""},address:{value:"",errorMsg:""},email:{value:"",errorMsg:""},password:{value:"",errorMsg:""},re_password:{value:"",errorMsg:""},dataToSend:{},isLoading:!1,missingInput:!1,responseError:"",responseData:{}};r.default=function(){var e=Object(i.a)(m),r=Object(c.a)(e,2),a=r[0],s=r[1],O=Object(u.a)(),g=Object(o.useContext)(p.a),f=Object(o.useContext)(d.a).setPageIsLoading,h=function(){var e=Object(n.a)(t.a.mark((function e(r){return t.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:r.preventDefault(),s({type:"validate"});case 2:case"end":return e.stop()}}),e)})));return function(r){return e.apply(this,arguments)}}();return Object(o.useEffect)((function(){var e=!0,r=function(){var r=Object(n.a)(t.a.mark((function r(){var n;return t.a.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:if(0!==Object.keys(a.responseData).length||""!==a.responseError){r.next=11;break}return r.prev=1,r.next=4,O("".concat("https://pet-verse-app.herokuapp.com/","users"),"POST",JSON.stringify(a.dataToSend),{"Content-Type":"application/json"});case 4:(n=r.sent)&&e&&s({type:"success",data:n}),r.next=11;break;case 8:r.prev=8,r.t0=r.catch(1),s({type:"failure",error:r.t0.message});case 11:case"end":return r.stop()}}),r,null,[[1,8]])})));return function(){return r.apply(this,arguments)}}();return a.isLoading&&r(),function(){f(!1),e=!1}}),[a.dataToSend,a.isLoading,O,s,a.responseData,a.responseError,f]),Object(o.useEffect)((function(){f(a.isLoading)}),[a.isLoading,f]),Object(o.useEffect)((function(){a.responseData.token&&g.login(a.responseData.userData.id,a.responseData.token,a.responseData.userData.stmem_type)}),[a.responseData,g]),Object(j.jsx)("div",{className:"background-blue",children:Object(j.jsxs)("div",{className:"main-container flex-row",children:[Object(j.jsxs)("form",{className:"form-container flex-col gap-16p falign-center",action:"/",method:"POST",onSubmit:function(e){return h(e)},children:[Object(j.jsx)("a",{className:"logo-link",href:"/#",children:Object(j.jsx)("img",{src:"/media/imgs/favicon.png",alt:"",className:"logo"})}),Object(j.jsxs)("div",{className:"input-wrapper flex-row fjust-between",children:[Object(j.jsx)("label",{className:"half-label",htmlFor:"first_name",children:"First Name:*"}),Object(j.jsx)("input",{type:"text",name:"first_name",id:"first_name",onChange:function(e){s({type:"enterValue",field:"first_name",value:e.currentTarget.value})}})]}),Object(j.jsxs)("div",{className:"input-wrapper flex-row fjust-between",children:[Object(j.jsx)("label",{className:"half-label",htmlFor:"last_name",children:"Last Name:*"}),Object(j.jsx)("input",{type:"text",name:"last_name",id:"last_name",onChange:function(e){s({type:"enterValue",field:"last_name",value:e.currentTarget.value})}})]}),Object(j.jsxs)("div",{className:"input-wrapper flex-row fjust-between",children:[Object(j.jsx)("label",{className:"half-label",htmlFor:"username",children:"Username:*"}),Object(j.jsx)("input",{type:"text",name:"username",id:"username",onChange:function(e){s({type:"enterValue",field:"username",value:e.currentTarget.value})}}),a.username.errorMsg&&Object(j.jsx)(l.a,{class:"error-msg",msg:a.username.errorMsg})]}),Object(j.jsxs)("div",{className:"input-wrapper flex-row fjust-between",children:[Object(j.jsx)("label",{className:"half-label",htmlFor:"phone_number",children:"Phone Number:"}),Object(j.jsx)("input",{type:"text",name:"phone_number",id:"phone_number",placeholder:"eg. 506 022 23 80",onChange:function(e){s({type:"enterValue",field:"phone_number",value:e.currentTarget.value})},onBlur:function(){s({type:"blurPhone"})}}),a.phone_number.errorMsg&&Object(j.jsx)(l.a,{class:"error-msg",msg:a.phone_number.errorMsg})]}),Object(j.jsxs)("div",{className:"input-wrapper flex-row fjust-between",children:[Object(j.jsx)("label",{className:"half-label",htmlFor:"address",children:"Address:*"}),Object(j.jsx)("textarea",{name:"address",id:"address",cols:"30",rows:"4",onChange:function(e){s({type:"enterValue",field:"address",value:e.currentTarget.value})}})]}),Object(j.jsxs)("div",{className:"input-wrapper flex-row fjust-between",children:[Object(j.jsx)("label",{className:"half-label",htmlFor:"email",children:"Email:*"}),Object(j.jsx)("input",{type:"text",name:"email",id:"email",placeholder:"example@gmail.com",onChange:function(e){s({type:"enterValue",field:"email",value:e.currentTarget.value})},onBlur:function(){s({type:"blurEmail"})}}),a.email.errorMsg&&Object(j.jsx)(l.a,{class:"error-msg",msg:a.email.errorMsg})]}),Object(j.jsxs)("div",{className:"input-wrapper flex-row fjust-between",children:[Object(j.jsx)("label",{className:"half-label",htmlFor:"password",children:"Password:*"}),Object(j.jsx)("input",{type:"password",name:"password",id:"password",onChange:function(e){s({type:"enterValue",field:"password",value:e.currentTarget.value})},onBlur:function(){s({type:"blurPassword"})}}),a.password.errorMsg&&Object(j.jsx)(l.a,{class:"error-msg",msg:a.password.errorMsg})]}),Object(j.jsxs)("div",{className:"input-wrapper flex-row fjust-between",children:[Object(j.jsx)("label",{className:"half-label",htmlFor:"rePassword",children:"Re-password:*"}),Object(j.jsx)("input",{type:"password",name:"rePassword",id:"rePassword",onChange:function(e){s({type:"enterValue",field:"re_password",value:e.currentTarget.value})},onBlur:function(){s({type:"blurRePassword"})}}),a.re_password.errorMsg&&Object(j.jsx)(l.a,{class:"error-msg",msg:a.re_password.errorMsg})]}),a.missingInput&&Object(j.jsx)("p",{style:{color:"red",textAlign:"center",width:"70%",margin:"auto"},children:"Please Fill mandatory fields *"}),a.responseError&&Object(j.jsx)("p",{style:{color:"red",textAlign:"center",width:"70%",margin:"auto"},children:a.responseError}),Object(j.jsxs)("div",{className:"button-wrapper flex-row gap-8p fjust-center",children:[Object(j.jsx)("button",{type:"submit",className:a.isLoading?"btn-r btn-r-dark disabled":"btn-r btn-r-dark",disabled:a.isLoading,children:"Sign up"}),Object(j.jsx)(b.b,{to:"/login",className:"btn-r btn-r-purple",children:"Already a member?"})]})]}),Object(j.jsx)("div",{className:"split-screen-signup",children:Object(j.jsx)("img",{src:"/media/imgs/sleeping-cat.jpg",alt:""})})]})})}},30:function(e,r,a){"use strict";var s=a(8),t=a.n(s),n=a(11),c=a(1);r.a=function(){var e=Object(c.useCallback)(function(){var e=Object(n.a)(t.a.mark((function e(r){var a,s,n,c,o,l=arguments;return t.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a=l.length>1&&void 0!==l[1]?l[1]:"GET",s=l.length>2&&void 0!==l[2]?l[2]:null,n=l.length>3&&void 0!==l[3]?l[3]:{},e.prev=3,e.next=6,fetch(r,{method:a,headers:n,body:s});case 6:return c=e.sent,e.next=9,c.json();case 9:if(o=e.sent,c.ok){e.next=12;break}throw new Error(o.error);case 12:return e.abrupt("return",o);case 15:throw e.prev=15,e.t0=e.catch(3),e.t0;case 18:case"end":return e.stop()}}),e,null,[[3,15]])})));return function(r){return e.apply(this,arguments)}}(),[]);return e}},38:function(e,r,a){"use strict";var s=a(0);r.a=function(e){return Object(s.jsx)("span",{style:e.style,className:e.class,children:e.msg})}},71:function(e,r,a){"use strict";var s=a(4),t=a(27),n=a(31),c=a(1),o=a(66),l=a.n(o),u=function(e,r){switch(r.type){case"enterValue":return Object(n.a)(Object(n.a)({},e),{},Object(t.a)({},r.field,Object(n.a)(Object(n.a)({},e[r.field]),{},{value:r.value})));case"blurPhone":var a=l.a.isMobilePhone(e.phone_number.value);if(!e.phone_number.value||a)return Object(n.a)(Object(n.a)({},e),{},{phone_number:Object(n.a)(Object(n.a)({},e.phone_number),{},{errorMsg:""})});if(!a)return Object(n.a)(Object(n.a)({},e),{},{phone_number:Object(n.a)(Object(n.a)({},e.phone_number),{},{errorMsg:"Invalid Phone number"})});break;case"blurEmail":var s=l.a.isEmail(e.email.value);if(!e.email.value||s)return Object(n.a)(Object(n.a)({},e),{},{email:Object(n.a)(Object(n.a)({},e.email),{},{errorMsg:""})});if(!s)return Object(n.a)(Object(n.a)({},e),{},{email:Object(n.a)(Object(n.a)({},e.email),{},{errorMsg:"Invalid Email Address"})});break;case"blurPassword":return e.password.value?l.a.isStrongPassword(e.password.value)?e.re_password.value&&e.password.value!==e.re_password.value?Object(n.a)(Object(n.a)({},e),{},{password:Object(n.a)(Object(n.a)({},e.password),{},{errorMsg:""}),re_password:Object(n.a)(Object(n.a)({},e.re_password),{},{errorMsg:"password not matched!!"})}):Object(n.a)(Object(n.a)({},e),{},{password:Object(n.a)(Object(n.a)({},e.password),{},{errorMsg:""}),re_password:Object(n.a)(Object(n.a)({},e.re_password),{},{errorMsg:""})}):e.re_password.value&&e.password.value!==e.re_password.value?Object(n.a)(Object(n.a)({},e),{},{password:Object(n.a)(Object(n.a)({},e.password),{},{errorMsg:"minlength:8, must include uppercase, numbers and special chars"}),re_password:Object(n.a)(Object(n.a)({},e.re_password),{},{errorMsg:"password not matched!!"})}):Object(n.a)(Object(n.a)({},e),{},{password:Object(n.a)(Object(n.a)({},e.password),{},{errorMsg:"minlength:8, must include uppercase, numbers and special chars"}),re_password:Object(n.a)(Object(n.a)({},e.re_password),{},{errorMsg:""})}):Object(n.a)(Object(n.a)({},e),{},{password:Object(n.a)(Object(n.a)({},e.password),{},{errorMsg:""})});case"blurRePassword":var c=e.password.value===e.re_password.value;return e.re_password.value?c?Object(n.a)(Object(n.a)({},e),{},{re_password:Object(n.a)(Object(n.a)({},e.re_password),{},{errorMsg:""})}):Object(n.a)(Object(n.a)({},e),{},{re_password:Object(n.a)(Object(n.a)({},e.re_password),{},{errorMsg:"password not matched!!"})}):Object(n.a)(Object(n.a)({},e),{},{re_password:Object(n.a)(Object(n.a)({},e.re_password),{},{errorMsg:""})});case"validate":return e.isLoading?e:e.first_name.value&&e.last_name.value&&e.username.value&&e.email.value&&e.address.value&&e.password.value&&e.re_password.value&&e.phone_number.value?e.username.errorMsg||e.email.errorMsg||e.password.errorMsg||e.re_password.errorMsg||e.phone_number.errorMsg?e:Object(n.a)(Object(n.a)({},e),{},{dataToSend:{first_name:e.first_name.value,last_name:e.last_name.value,username:e.username.value,phone_number:e.phone_number.value,address:e.address.value,email:e.email.value,password:e.password.value},isLoading:!0,missingInput:!1}):Object(n.a)(Object(n.a)({},e),{},{missingInput:!0});case"success":return Object(n.a)(Object(n.a)({},e),{},{responseError:"",isLoading:!1,responseData:r.data});case"failure":return Object(n.a)(Object(n.a)({},e),{},{responseError:r.error,isLoading:!1})}};r.a=function(e){var r=Object(c.useReducer)(u,e),a=Object(s.a)(r,2);return[a[0],a[1]]}}}]);
//# sourceMappingURL=34.c9603fa9.chunk.js.map