import{I as C,d as ee,r as n,D as le,J as m,c as r,e as ae,f as e,w as t,F as te,o as oe,k as p,h as z,i as w,K as se}from"./index-e41ceea4.js";import{_ as ne}from"./plugin-vueexport-helper-c27b6911.js";const re=(s,_,h="")=>C.get(`/admin/acl/role/${s}/${_}/?roleName=${h}`),ue=s=>s.id?C.put("/admin/acl/role/update",s):C.post("/admin/acl/role/save",s),ie=s=>C.delete(`/admin/acl/role/remove/${s}`),de=s=>C.get(`/admin/acl/permission/toAssign/${s}`),ce=s=>C.post("/admin/acl/permission/doAssignAcl",s),pe={class:"dialog-footer"},me={class:"demo-pagination-block"},_e={name:"roler"},fe=ee({..._e,setup(s){const _=n("");let h=n(),f=n({roleName:"",id:""});const y=n(!1),u=n(1),i=n(10),P=n(!0),I=n(!1);let g=n(!1);const j={children:"children",label:"name"},V=n([]),E=async a=>{i.value=a,await v(u.value,i.value)},O=async a=>{u.value=a,await v(u.value,i.value)};le(async()=>{await v(u.value,i.value)});const v=async(a,l,d)=>{let b=await re(a,l,d);b.code===200?h.value=b.data:m({type:"error",message:"数据加载失败"})},S=a=>{y.value=!0,Object.assign(f.value,a)},T=()=>{y.value=!0,Object.assign(f.value,{roleName:"",id:""})};let U=n([]);const B=async a=>{g.value=!0,Object.assign(f.value,a);let l=await de(a.id);l.code===200?(V.value=l.data,U.value=[],$(V.value,U.value)):m({type:"error",message:l.message})},$=(a,l)=>{a.forEach(d=>{d.select===!0?l.push(d.id):d.children&&d.children.length>0&&$(d.children,l)})},F=()=>{g.value=!1},A=n(),K=async()=>{let a=await ce({permissionIdList:A.value.getCheckedKeys(),roleId:Number(f.value.id)});a.code===200?m({type:"success",message:a.message}):m({type:"error",message:a.data??a.message}),g.value=!1},M=async a=>{let l=await ie(a.id);l.code===200?m({type:"success",message:l.message}):m({type:"error",message:l.data??l.message}),await v(u.value,i.value)},G=async()=>{await v(u.value,i.value,_.value)},J=async()=>{_.value="",await v(u.value,i.value)},L=async()=>{y.value=!1;let a=await ue(f.value);a.code===200?(m({type:"success",message:a.message}),v(u.value,i.value)):m({type:"error",message:a.message})};return(a,l)=>{const d=r("el-input"),b=r("el-form-item"),c=r("el-button"),N=r("el-form"),R=r("el-card"),H=r("el-dialog"),k=r("el-table-column"),Q=r("el-popconfirm"),W=r("el-table"),X=r("el-pagination"),Y=r("el-tree"),Z=r("el-drawer");return oe(),ae(te,null,[e(R,{style:{margin:"10px 0px",height:"75px"}},{default:t(()=>[e(N,{inline:!0,class:"el-form-search"},{default:t(()=>[e(b,{label:"角色名称:"},{default:t(()=>[e(d,{placeholder:"角色名称",modelValue:_.value,"onUpdate:modelValue":l[0]||(l[0]=x=>_.value=x)},null,8,["modelValue"])]),_:1}),e(b,null,{default:t(()=>[e(c,{type:"primary",disabled:!_.value,onClick:G},{default:t(()=>[p("搜索")]),_:1},8,["disabled"]),e(c,{onClick:J},{default:t(()=>[p("重置")]),_:1})]),_:1})]),_:1})]),_:1}),e(R,null,{default:t(()=>{var x,D;return[e(c,{type:"primary",icon:"Plus",onClick:T},{default:t(()=>[p("添加角色")]),_:1}),e(H,{modelValue:y.value,"onUpdate:modelValue":l[3]||(l[3]=o=>y.value=o),title:"添加角色",width:"30%","align-center":""},{footer:t(()=>[z("span",pe,[e(c,{onClick:l[2]||(l[2]=o=>y.value=!1)},{default:t(()=>[p("取消")]),_:1}),e(c,{type:"primary",onClick:L},{default:t(()=>[p(" 确定 ")]),_:1})])]),default:t(()=>[e(N,null,{default:t(()=>[e(b,{label:"角色名字"},{default:t(()=>[e(d,{placeholder:"请输入角色名字",modelValue:w(f).roleName,"onUpdate:modelValue":l[1]||(l[1]=o=>w(f).roleName=o)},null,8,["modelValue"])]),_:1})]),_:1})]),_:1},8,["modelValue"]),e(W,{style:{margin:"10px 0px"},border:"",data:(x=w(h))==null?void 0:x.records},{default:t(()=>[e(k,{type:"index",label:"#",align:"center"}),e(k,{label:"ID",align:"center",prop:"id"}),e(k,{label:"角色名称",align:"center",prop:"roleName","show-overflow-tooltip":!0}),e(k,{label:"创建时间",align:"center",prop:"createTime","show-overflow-tooltip":!0}),e(k,{label:"更新时间",align:"center",prop:"updateTime","show-overflow-tooltip":!0}),e(k,{label:"操作",width:"360px"},{default:t(o=>[e(c,{type:"primary",icon:"User",size:"small",onClick:q=>B(o.row)},{default:t(()=>[p(" 分配权限 ")]),_:2},1032,["onClick"]),e(c,{type:"primary",icon:"Edit",size:"small",onClick:q=>S(o.row)},{default:t(()=>[p("编辑")]),_:2},1032,["onClick"]),e(Q,{title:"确定要删除吗",onConfirm:q=>M(o.row)},{reference:t(()=>[e(c,{type:"primary",icon:"Delete",size:"small"},{default:t(()=>[p("删除")]),_:1})]),_:2},1032,["onConfirm"])]),_:1})]),_:1},8,["data"]),z("div",me,[e(X,{"current-page":u.value,"onUpdate:currentPage":l[4]||(l[4]=o=>u.value=o),"page-size":i.value,"onUpdate:pageSize":l[5]||(l[5]=o=>i.value=o),"page-sizes":[10,15,20,30],disabled:I.value,background:P.value,layout:" prev, pager, next, jumper,->, sizes,total",total:(D=w(h))==null?void 0:D.total,onSizeChange:E,onCurrentChange:O},null,8,["current-page","page-size","disabled","background","total"])]),e(Z,{modelValue:w(g),"onUpdate:modelValue":l[6]||(l[6]=o=>se(g)?g.value=o:g=o),title:"分配角色","lock-scroll":!0,direction:"rtl"},{default:t(()=>[e(Y,{data:V.value,"show-checkbox":"","node-key":"id","default-expand-all":"","default-checked-keys":w(U),props:j,ref_key:"tree",ref:A},null,8,["data","default-checked-keys"])]),footer:t(()=>[z("div",null,[e(c,{onClick:F},{default:t(()=>[p("取消")]),_:1}),e(c,{type:"primary",onClick:K},{default:t(()=>[p("确定")]),_:1})])]),_:1},8,["modelValue"])]}),_:1})],64)}}});const ye=ne(fe,[["__scopeId","data-v-2cf226b9"]]);export{ye as default};
