"use strict";(self.webpackChunkelodie_cra=self.webpackChunkelodie_cra||[]).push([[588],{588:function(e,n,a){a.r(n),a.d(n,{default:function(){return P}});var t,i=a(4942),d=a(1413),r=a(885),o=a(2791),l=a(6030),u=a(8099),p=a(460),s=a(6151),c=a(7710),_=a(9157),h=a(7123),v=a(5574),E=a(5661),C=a(6895),S=a(3925),I=a(3915),A=a(3466),Z=a(9955),f=a(9012),m=a(5523),x=a(184);function P(){var e,n=(0,o.useState)({invoiceId:void 0,dateInvoice:(new Date).toString(),patient_name:"",patient_share:0,patient_paid:!1,SECU_share:0,SECU_paid:!1,mode:"CREATE",dateError:!1}),a=(0,r.Z)(n,2),P=a[0],T=a[1],U=(0,l.I0)(),j=(0,l.v9)(u.D),g=j.invoiceToUpdate;(0,o.useEffect)((function(){T({invoiceId:null===g||void 0===g?void 0:g.id,dateInvoice:(null===g||void 0===g?void 0:g.date)||(new Date).toString(),patient_name:(null===g||void 0===g?void 0:g.patient_name)||"",patient_share:(null===g||void 0===g?void 0:g.patient_share.value)||0,patient_paid:(null===g||void 0===g?void 0:g.patient_share.paid)||!1,SECU_share:(null===g||void 0===g?void 0:g.SECU_share.value)||0,SECU_paid:(null===g||void 0===g?void 0:g.SECU_share.paid)||!1,mode:"EDIT",dateError:!1})}),[g]),e=j.invoiceToUpdate?"Modifie une facturation":"Ajoute une facturation";var D=function(){U((0,p.$J)({open:!1}))},N=""===P.patient_name||!0===P.dateError||null===P.dateInvoice,b=function(e){var n=e.currentTarget;T((function(e){return(0,d.Z)((0,d.Z)({},e),{},(0,i.Z)({},n.id,function(e){return e.id===t.PATIENT_PAID||e.id===t.SECU_PAID?e.checked:e.id===t.PATIENT_SHARE||e.id===t.SECU_SHARE?""===e.value?0:parseFloat(e.value.replace(",",".")):e.value}(n)))}))};return(0,x.jsxs)(v.Z,{fullWidth:!0,maxWidth:"xs",open:j.open,onClose:D,children:[(0,x.jsx)(E.Z,{children:e}),(0,x.jsxs)(_.Z,{style:{paddingTop:"10px"},children:[(0,x.jsx)(I.Z,{locale:"fr",dateAdapter:S.Z,children:(0,x.jsx)(C.Z,{label:"Date du soin",mask:"__/__/__",value:P.dateInvoice,inputFormat:"DD/MM/YY",onError:function(e){T((function(n){return(0,d.Z)((0,d.Z)({},n),{},{dateError:null!==e})}))},onChange:function(e){T((function(n){return(0,d.Z)((0,d.Z)({},n),{},{dateInvoice:(null===e||void 0===e?void 0:e.toString())||(new Date).toString()})}))},renderInput:function(e){return(0,x.jsx)(c.Z,(0,d.Z)({fullWidth:!0},e))}})}),(0,x.jsx)(c.Z,{autoFocus:!0,margin:"dense",id:t.PATIENT_NAME,label:"Nom du patient",type:"text",placeholder:"Danse avec les sparadrap",required:!0,fullWidth:!0,value:P.patient_name,variant:"standard",onChange:b}),(0,x.jsx)(c.Z,{autoFocus:!0,margin:"dense",id:t.PATIENT_SHARE,label:"Part patient",type:"number",placeholder:"499.99",helperText:"",fullWidth:!0,value:P.patient_share||"",onChange:b,InputProps:{endAdornment:(0,x.jsx)(A.Z,{position:"end",children:"\u20ac"})},inputProps:{inputMode:"numeric",pattern:"[0-9]*"},variant:"standard"}),(0,x.jsx)(f.Z,{children:(0,x.jsx)(m.Z,{control:(0,x.jsx)(Z.Z,{id:t.PATIENT_PAID,onChange:b,checked:P.patient_paid}),label:"Pay\xe9 ?"})}),(0,x.jsx)(c.Z,{autoFocus:!0,margin:"dense",id:t.SECU_SHARE,label:"Part CPAM",type:"number",placeholder:"499.99",fullWidth:!0,value:P.SECU_share||"",onChange:b,InputProps:{endAdornment:(0,x.jsx)(A.Z,{position:"end",children:"\u20ac"})},inputProps:{inputMode:"numeric",pattern:"[0-9]*"},variant:"standard"}),(0,x.jsx)(f.Z,{children:(0,x.jsx)(m.Z,{control:(0,x.jsx)(Z.Z,{id:t.SECU_PAID,onChange:b,checked:P.SECU_paid}),label:"Pay\xe9 ?"})})]}),(0,x.jsxs)(h.Z,{children:[(0,x.jsx)(s.Z,{onClick:D,children:"Annuler"}),(0,x.jsx)(s.Z,{disabled:N,onClick:function(){U({type:"SAVE_INVOICE",payload:{invoiceId:P.invoiceId,dateInvoice:P.dateInvoice,patient_name:P.patient_name,patient_share:P.patient_share||0,patient_paid:P.patient_paid,SECU_share:P.SECU_share||0,SECU_paid:P.SECU_paid,mode:P.mode}})},children:"Sauvegarder"})]})]})}!function(e){e.PATIENT_NAME="patient_name",e.PATIENT_SHARE="patient_share",e.PATIENT_PAID="patient_paid",e.SECU_SHARE="SECU_share",e.SECU_PAID="SECU_paid"}(t||(t={}))}}]);
//# sourceMappingURL=588.04537375.chunk.js.map