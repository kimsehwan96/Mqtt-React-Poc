(this["webpackJsonpmqtt-app"]=this["webpackJsonpmqtt-app"]||[]).push([[0],{124:function(e){e.exports=JSON.parse('{"region":"ap-northeast-2","cognitoUserPoolId":"ap-northeast-2_0OJVDWgPa","cognitoUserPoolClientId":"3siov6brjoecvq3d0djgrsohvd","cognitoIdentityPoolId":"ap-northeast-2:b100e387-8238-4ac6-a1e2-5d18dd5ec77a","mqttBrokerEndpoint":"a37j5ardzq7hal-ats.iot.ap-northeast-2.amazonaws.com"}')},139:function(e,t,o){},197:function(e,t,o){"use strict";o.r(t);var n=o(35),r=o.n(n),s=o(123),a=o.n(s),c=(o(139),o(92)),i=o(88),d=o(62),l=o(61),u=o(124),p=o(23);var b=function(){var e;e=u,i.default.configure({Auth:{userPoolId:e.cognitoUserPoolId,userPoolWebClientId:e.cognitoUserPoolClientId,identityPoolId:e.cognitoIdentityPoolId,region:e.region}}),i.default.addPluggable(new l.AWSIoTProvider({aws_pubsub_region:e.region,aws_pubsub_endpoint:"wss://".concat(e.mqttBrokerEndpoint,"/mqtt")}));var t=Object(n.useState)([]),o=Object(c.a)(t,2),r=o[0],s=o[1],a=Object(n.useState)([]),b=Object(c.a)(a,2),g=b[0],j=b[1];return Object(n.useEffect)((function(){d.a.subscribe("app/test",{provider:"AWSIoTProvider"}).subscribe({next:function(e){s(e.value.fields),j(e.value.values)},error:function(e){return console.log(e)}})})),Object(p.jsxs)("div",{className:"App",children:[Object(p.jsx)("header",{className:"App-header",children:"Hello App"}),Object(p.jsx)(p.Fragment,{children:r.map((function(e,t){return console.log(g),Object(p.jsxs)(p.Fragment,{children:[Object(p.jsxs)("p",{children:[" fields : ",e," "]}),Object(p.jsxs)("p",{children:[" value : ",g[0][t]," "]})]})}))})]})},g=function(e){e&&e instanceof Function&&o.e(3).then(o.bind(null,224)).then((function(t){var o=t.getCLS,n=t.getFID,r=t.getFCP,s=t.getLCP,a=t.getTTFB;o(e),n(e),r(e),s(e),a(e)}))};a.a.render(Object(p.jsx)(r.a.StrictMode,{children:Object(p.jsx)(b,{})}),document.getElementById("root")),g()}},[[197,1,2]]]);
//# sourceMappingURL=main.c3be4ba5.chunk.js.map