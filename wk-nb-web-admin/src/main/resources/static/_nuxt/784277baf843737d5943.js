(window.webpackJsonp=window.webpackJsonp||[]).push([[21],{680:function(e,t,r){"use strict";r.d(t,"b",(function(){return n})),r.d(t,"a",(function(){return o}));var n="/platform/pub/file/upload/image",o="/platform/pub/file/upload/file"},681:function(e,t,r){"use strict";r.d(t,"c",(function(){return n})),r.d(t,"a",(function(){return o})),r.d(t,"b",(function(){return l}));r(424);function n(e){return/^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[589])\d{8}$/.test(e)}function o(e){return new RegExp("^[a-zA-Z][a-zA-Z0-9_]{1,29}$").test(e)}function l(e){return new RegExp("^[a-zA-Z][a-zA-Z0-9_]{1,29}$").test(e)}},692:function(e,t,r){"use strict";r.d(t,"a",(function(){return n})),r.d(t,"b",(function(){return o})),r.d(t,"m",(function(){return l})),r.d(t,"h",(function(){return c})),r.d(t,"d",(function(){return d})),r.d(t,"c",(function(){return f})),r.d(t,"n",(function(){return m})),r.d(t,"l",(function(){return w})),r.d(t,"k",(function(){return y})),r.d(t,"j",(function(){return h})),r.d(t,"f",(function(){return v})),r.d(t,"i",(function(){return $})),r.d(t,"e",(function(){return P})),r.d(t,"g",(function(){return U}));var n="/platform/sys/user/change_user_info",o="/platform/sys/user/change_user_pwd",l="/platform/sys/user/set_user_avatar",c="/platform/sys/user/get/",d="/platform/sys/user/delete/",f="/platform/sys/user/create",m="/platform/sys/user/update",w="/platform/sys/user/reset_pwd/",y="/platform/sys/user/list",h="/platform/sys/user/get_unit_tree",v="/platform/sys/user/disabled",$="/platform/sys/user/get_menu/",P="/platform/sys/user/delete_more",U="/platform/sys/user/export"},732:function(e,t,r){"use strict";r.r(t);r(91),r(44),r(35),r(26),r(69);var n=r(28),o=r(55),l=r(681),c=r(680),d=r(692);function f(object,e){var t=Object.keys(object);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(object);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(object,e).enumerable}))),t.push.apply(t,r)}return t}var m={data:function(){return{btnLoadding:!1,activeName:"base",btnLoading:!1,sysUserInfoData:{},sysUserPwdData:{},uploadUrl:"/api/1.0.0"+c.b,avatar:""}},computed:function(e){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?f(source,!0).forEach((function(t){Object(n.a)(e,t,source[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(source)):f(source).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(source,t))}))}return e}({},Object(o.c)({conf:function(e){return e.conf},siteInfo:function(e){return e.siteInfo},userInfo:function(e){return e.userInfo}}),{infoRules:function(){var e={username:[{required:!0,message:this.$t("sys.user.change.info.usernameCheck"),trigger:"blur"}],email:[{required:!1,type:"email",message:this.$t("sys.user.change.info.emailCheck"),trigger:"blur"}],mobile:[{validator:this.validateMobile,trigger:"blur"}]};return e},pwdRules:function(){var e={oldPassword:[{required:!0,message:this.$t("sys.user.change.pwd.inputOldPwd"),trigger:"blur"}],newPassword:[{required:!0,message:this.$t("sys.user.change.pwd.inputNewPwd"),trigger:"blur"},{min:1,max:20,message:this.$t("sys.user.change.pwd.pwdLength"),trigger:"change"}],passwordAgain:[{required:!0,message:this.$t("sys.user.change.pwd.inputAgain"),trigger:"blur"},{validator:this.validatePwdAgain,trigger:"change"}]};return e}}),created:function(){this.initUserInfo()},methods:{validateMobile:function(e,t,r){if(t&&!Object(l.c)(t))return r(new Error(this.$t("sys.user.change.info.mobileCheck")));r()},validatePwdAgain:function(e,t,r){t!==this.sysUserPwdData.newPassword?r(new Error(this.$t("sys.user.change.pwd.towPwdError"))):r()},initUserInfo:function(){this.sysUserInfoData=JSON.parse(JSON.stringify(this.userInfo.user)),this.userInfo.user.avatar&&(this.avatar=this.conf.AppFileDomain+this.userInfo.user.avatar)},doChangeInfo:function(){var e=this;this.$refs.infoForm.validate((function(t){t&&(e.btnLoading=!0,e.$axios.$post(d.a,e.sysUserInfoData).then((function(t){e.btnLoading=!1,0===t.code&&(e.$message({message:t.msg,type:"success"}),e.dialogUserInfoVisible=!1)})))}))},doChangePwd:function(){var e=this;this.$refs.pwdForm.validate((function(t){t&&(e.btnLoading=!0,e.$axios.$post(d.b,e.sysUserPwdData).then((function(t){e.btnLoading=!1,0===t.code&&(e.$message({message:t.msg,type:"success"}),e.dialogUserPwdVisible=!1)})))}))},handleUploadSuccess:function(e,t){var r=this,n=e.data.file_url;this.$axios.$post(d.m,{avatar:n}).then((function(e){0===e.code&&(r.$message({message:e.msg,type:"success"}),r.avatar=r.conf.AppFileDomain+n)}))},beforeFileUpload:function(e){var t="image/jpeg"===e.type,r="image/png"===e.type;return t||r?!!(e.size/1024/1024<2)||(this.$message.error(this.$t("sys.user.change.avatar.file.size")),!1):(this.$message.error(this.$t("sys.user.change.avatar.file.type")),!1)}}},w=r(11),component=Object(w.a)(m,(function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",[r("el-card",{attrs:{shadow:"never"}},[r("template",{slot:"header"},[r("el-breadcrumb",[r("el-breadcrumb-item",[e._v(e._s(e.$t("sys.user.change.account")))])],1)],1),e._v(" "),r("el-tabs",{model:{value:e.activeName,callback:function(t){e.activeName=t},expression:"activeName"}},[r("el-tab-pane",{attrs:{label:e.$t("sys.user.change.base"),name:"base"}},[r("el-row",[r("el-col",{attrs:{xs:24,sm:21,md:18,lg:15,xl:12}},[r("el-form",{ref:"infoForm",attrs:{model:e.sysUserInfoData,rules:e.infoRules,"label-width":"120px"}},[r("el-form-item",{attrs:{prop:"username",label:e.$t("sys.user.change.info.username")}},[r("el-input",{attrs:{autocomplete:"off"},model:{value:e.sysUserInfoData.username,callback:function(t){e.$set(e.sysUserInfoData,"username",t)},expression:"sysUserInfoData.username"}})],1),e._v(" "),r("el-form-item",{attrs:{prop:"email",label:e.$t("sys.user.change.info.email")}},[r("el-input",{attrs:{autocomplete:"off"},model:{value:e.sysUserInfoData.email,callback:function(t){e.$set(e.sysUserInfoData,"email",t)},expression:"sysUserInfoData.email"}})],1),e._v(" "),r("el-form-item",{attrs:{prop:"mobile",label:e.$t("sys.user.change.info.mobile")}},[r("el-input",{attrs:{autocomplete:"off"},model:{value:e.sysUserInfoData.mobile,callback:function(t){e.$set(e.sysUserInfoData,"mobile",t)},expression:"sysUserInfoData.mobile"}})],1),e._v(" "),r("el-form-item",[r("el-button",{attrs:{size:"small",type:"submit",loading:e.btnLoadding},on:{click:e.doChangeInfo}},[e._v(e._s(e.$t("system.commons.button.save.mini")))])],1)],1)],1)],1)],1),e._v(" "),r("el-tab-pane",{attrs:{label:e.$t("sys.user.change.avatar"),name:"avatar"}},[r("el-row",[r("el-col",{attrs:{xs:24,sm:21,md:18,lg:15,xl:12}},[r("el-form",{attrs:{size:"medium","label-width":"100px"}},[r("el-form-item",[r("el-avatar",{attrs:{shape:"square",size:120,src:e.avatar}})],1),e._v(" "),r("el-form-item",[r("el-upload",{attrs:{action:e.uploadUrl,name:"Filedata","limit:1":"","before-upload":e.beforeFileUpload,"show-file-list":!1,"on-success":function(t,r){return e.handleUploadSuccess(t,r)}}},[r("el-button",{attrs:{icon:"el-icon-upload",size:"small"}},[e._v("上传头像")])],1)],1)],1)],1)],1)],1),e._v(" "),r("el-tab-pane",{attrs:{label:e.$t("sys.user.change.cpwd"),name:"pwd"}},[r("el-row",[r("el-col",{attrs:{xs:24,sm:21,md:18,lg:15,xl:12}},[r("el-form",{ref:"pwdForm",attrs:{model:e.sysUserPwdData,rules:e.pwdRules,"label-width":"125px"}},[r("el-form-item",{attrs:{prop:"oldPassword",label:e.$t("sys.user.change.pwd.oldPassword")}},[r("el-input",{attrs:{tabindex:"1",type:"password",autocomplete:"off"},model:{value:e.sysUserPwdData.oldPassword,callback:function(t){e.$set(e.sysUserPwdData,"oldPassword",t)},expression:"sysUserPwdData.oldPassword"}})],1),e._v(" "),r("el-form-item",{attrs:{prop:"newPassword",label:e.$t("sys.user.change.pwd.newPassword"),"label-width":"125px"}},[r("el-input",{attrs:{tabindex:"2",type:"password",autocomplete:"off"},model:{value:e.sysUserPwdData.newPassword,callback:function(t){e.$set(e.sysUserPwdData,"newPassword",t)},expression:"sysUserPwdData.newPassword"}})],1),e._v(" "),r("el-form-item",{attrs:{prop:"passwordAgain",label:e.$t("sys.user.change.pwd.passwordAgain"),"label-width":"125px"}},[r("el-input",{attrs:{autocomplete:"off",tabindex:"3",type:"password"},model:{value:e.sysUserPwdData.passwordAgain,callback:function(t){e.$set(e.sysUserPwdData,"passwordAgain",t)},expression:"sysUserPwdData.passwordAgain"}})],1),e._v(" "),r("el-form-item",[r("el-button",{attrs:{size:"small",type:"submit",loading:e.btnLoadding},on:{click:e.doChangePwd}},[e._v(e._s(e.$t("system.commons.button.save.mini")))])],1)],1)],1)],1)],1)],1)],2)],1)}),[],!1,null,null,null);t.default=component.exports}}]);