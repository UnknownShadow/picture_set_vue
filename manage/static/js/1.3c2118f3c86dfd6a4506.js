webpackJsonp([1],{215:function(t,e,a){a(411);var i=a(92)(a(309),a(420),null,null);t.exports=i.exports},250:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=a(52),o=a.n(i),r=a(51),s=a.n(r),n=a(53),l=a.n(n),d=a(93),p=a(94),c=a(95);e.default={data:function(){return{baseImgPath:p.b}},created:function(){this.adminInfo.id||this.getAdminData()},computed:l()({},a.i(c.b)(["adminInfo"])),methods:l()({},a.i(c.c)(["getAdminData"]),{handleCommand:function(t){var e=this;return s()(o.a.mark(function i(){var r;return o.a.wrap(function(i){for(;;)switch(i.prev=i.next){case 0:if("home"!=t){i.next=4;break}e.$router.push("/addGoods"),i.next=9;break;case 4:if("singout"!=t){i.next=9;break}return i.next=7,a.i(d.b)();case 7:r=i.sent,1==r.status?(e.$message({type:"success",message:"退出成功"}),e.$router.push("/")):e.$message({type:"error",message:r.message});case 9:case"end":return i.stop()}},i,e)}))()}})}},251:function(t,e,a){e=t.exports=a(213)(!1),e.push([t.i,".allcover{position:absolute;top:0;right:0}.ctt{left:50%;transform:translate(-50%,-50%)}.ctt,.tb{position:absolute;top:50%}.tb{transform:translateY(-50%)}.lr{position:absolute;left:50%;transform:translateX(-50%)}.header_container{background-color:#eff2f7;height:60px;display:-ms-flexbox;display:flex;-ms-flex-pack:justify;justify-content:space-between;-ms-flex-align:center;align-items:center;padding-left:20px}.avator{width:36px;height:36px;border-radius:50%;margin-right:37px}.el-dropdown-menu__item{text-align:center}",""])},261:function(t,e,a){var i=a(251);"string"==typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);a(214)("24ad6d9e",i,!0)},262:function(t,e,a){a(261);var i=a(92)(a(250),a(263),null,null);t.exports=i.exports},263:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"header_container"},[a("el-breadcrumb",{attrs:{separator:"/"}}),t._v(" "),a("el-dropdown",{attrs:{"menu-align":"start"},on:{command:t.handleCommand}},[a("img",{staticClass:"avator",attrs:{src:t.baseImgPath+t.adminInfo.avatar}}),t._v(" "),a("el-dropdown-menu",{attrs:{slot:"dropdown"},slot:"dropdown"},[a("el-dropdown-item",{attrs:{command:"home"}},[t._v("首页")]),t._v(" "),a("el-dropdown-item",{attrs:{command:"singout"}},[t._v("退出")])],1)],1)],1)},staticRenderFns:[]}},309:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=a(54),o=a.n(i),r=a(262),s=a.n(r),n=(a(93),a(94)),l=a(96),d=a.n(l);e.default={data:function(){return{imgList:[],size:0,limit:void 0,file:"",baseUrl:n.a,baseImgPath:n.b,restaurant_id:1,categoryForm:{categoryList:[],categorySelect:"",name:"",description:""},foodForm:{name:"",description:"",image_path:"",attributes:[]},foodrules:{name:[{required:!0,message:"请输入一级标题",trigger:"blur"}]}}},components:{headTop:s.a},methods:{uploadImg:function(t,e){1==t.status?this.foodForm.image_path=t.image_path:this.$message.error("上传图片失败！")},beforeImgUpload:function(t){var e="image/jpeg"===t.type||"image/png"===t.type||"image/jpg"===t.type;return e||this.$message.error("只能上传图片！"),this.file=t,e},fileClick:function(){document.getElementById("upload_file").click()},fileChange:function(t){console.log("文件：",t.target.files),t.target.files[0].size&&(this.fileList(t.target),t.target.value="")},fileList:function(t){for(var e=t.files,a=0;a<e.length;a++)""!=e[a].type?this.fileAdd(e[a]):this.folders(t.items[a])},folders:function(t){var e=this;t.kind&&(t=t.webkitGetAsEntry()),t.createReader().readEntries(function(t){for(var a=0;a<t.length;a++)t[a].isFile?e.foldersAdd(t[a]):e.folders(t[a])})},foldersAdd:function(t){var e=this;t.file(function(t){e.fileAdd(t)})},fileAdd:function(t){if(console.log("文件类型：",t.type),void 0!==this.limit&&this.limit--,!(void 0!==this.limit&&this.limit<0))if(this.size=this.size+t.size,-1==t.type.indexOf("image"))t.src="../assets/img/del.png",this.imgList.push({file:t});else{var e=new FileReader,a=new Image,i=this;e.readAsDataURL(t),e.onload=function(){t.src=this.result,a.onload=function(){var e=a.width,o=a.height;t.width=e,t.height=o,i.imgList.push({file:t}),console.log(i.imgList)},a.src=t.src}}},fileDel:function(t){this.size=this.size-this.imgList[t].file.size,this.imgList.splice(t,1),void 0!==this.limit&&(this.limit=this.imgList.length)},bytesToSize:function(t){if(0===t)return"0 B";var e=["B","KB","MB","GB","TB","PB","EB","ZB","YB"],a=Math.floor(Math.log(t)/Math.log(1e3));return(t/Math.pow(1e3,a)).toPrecision(3)+" "+e[a]},addFood:function(t){var e=this,a=this.foodForm.name;if(""==(a=a.replace(/(^\s*)|(\s*$)/g,"")))return void this.$message.error("请输入一级标题");if(""==this.file||void 0===this.file)return void this.$message.error("请选择首页显示的图片");if(this.imgList.length<=0)return void this.$message.error("请选择需要上传的图片组");for(var i=new Array,r=0;r<this.imgList.length;r++){var s=new FormData;s.append("file",this.imgList[r].file),s.append("id","1"),s.append("status","4");var n=new o.a(function(t,e){d()({method:"post",url:"http://192.168.31.37:8080/platform/api/uploadFile",data:s}).then(function(e){0==e.data.code&&(i.push(e.data.data.accessUrl),t({data:i,code:r}))})})}n.then(function(t){console.log("图片上传后的地址集：",t.data),console.log("文件：",e.file);var i=new FormData;i.append("file",e.file),i.append("id","1"),i.append("status","1"),i.append("pictures",t.data),i.append("title",a),d()({method:"post",url:"http://192.168.31.37:8080/platform/api/warehousing",data:i}).then(function(t){0==t.data.code?e.$message({type:"success",message:"入库成功"}):e.$message.error(t.data.errMsg)})},function(t){console.log("失败：",t),e.$message.error(t)})}}}},320:function(t,e,a){e=t.exports=a(213)(!1),e.push([t.i,".allcover{position:absolute;top:0;right:0}.ctt{left:50%;transform:translate(-50%,-50%)}.ctt,.tb{position:absolute;top:50%}.tb{transform:translateY(-50%)}.lr{position:absolute;left:50%;transform:translateX(-50%)}.form{min-width:400px;margin-bottom:30px}.form:hover{box-shadow:0 0 8px 0 rgba(232,237,250,.6),0 2px 4px 0 rgba(232,237,250,.5);border-radius:6px;transition:all .4s}.food_form{border:1px solid #eaeefb;padding:10px 10px 0}.form_header{text-align:center;margin-bottom:10px}.category_select{border:1px solid #eaeefb;padding:10px 30px 10px 10px;border-top-right-radius:6px;border-top-left-radius:6px}.add_category_row{height:0;overflow:hidden;transition:all .4s;background:#f9fafc}.showEdit{height:185px}.add_category{background:#f9fafc;padding:10px 30px 0 10px;border:1px solid #eaeefb;border-top:none}.add_category_button{text-align:center;line-height:40px;border-bottom-right-radius:6px;border-bottom-left-radius:6px;border:1px solid #eaeefb;border-top:none;transition:all .4s}.add_category_button:hover{background:#f9fafc}.add_category_button:hover .edit_icon,.add_category_button:hover span{color:#20a0ff}.add_category_button span{font-size:14px;color:#999;transition:all .4s}.add_category_button .edit_icon{color:#ccc;transition:all .4s}.avatar-uploader .el-upload{border:1px dashed #d9d9d9;border-radius:6px;cursor:pointer;position:relative;overflow:hidden}.avatar-uploader .el-upload:hover{border-color:#20a0ff}.avatar-uploader-icon{font-size:28px;color:#8c939d;width:120px;height:120px;line-height:120px;text-align:center}.avatar{width:120px;height:120px;display:block}.cell{text-align:center}.upload_warp_img_div_del{position:absolute;top:6px;width:16px;right:4px}.upload_warp_img_div_top{position:absolute;top:0;width:100%;height:30px;background-color:rgba(0,0,0,.4);line-height:30px;text-align:left;color:#fff;font-size:12px;text-indent:4px}.upload_warp_img_div_text{white-space:nowrap;width:80%;overflow:hidden;text-overflow:ellipsis}.upload_warp_img_div img{max-width:100%;max-height:100%;vertical-align:middle}.upload_warp_img_div{position:relative;height:100px;width:120px;border:1px solid #ccc;margin:0 30px 10px 0;float:left;line-height:100px;display:table-cell;text-align:center;background-color:#eee;cursor:pointer}.upload_warp_img{border-top:1px solid #d2d2d2;padding:14px 0 0 14px;overflow:hidden}.upload_warp_text{text-align:left;margin-bottom:10px;padding-top:10px;text-indent:14px;border-top:1px solid #ccc;font-size:14px}.upload_warp_right{float:left;width:57%;margin-left:2%;height:100%;border:1px dashed #999;border-radius:4px;line-height:130px;color:#999}.upload_warp_left img{margin-top:32px;margin-left:85px}.upload_warp_left{float:left;width:40%;height:100%;border:1px dashed #999;border-radius:4px;cursor:pointer}.upload_warp{margin:14px;height:130px}.upload{border:1px solid #ccc;background-color:#fff;box-shadow:0 1px 0 #ccc;border-radius:4px}.hello,.upload{width:650px}",""])},411:function(t,e,a){var i=a(320);"string"==typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);a(214)("4d9191f6",i,!0)},414:function(t,e){t.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAABdElEQVRYR+2W0VEDMQxEdzugk9ABpAJIB5QAlUAnJBUk6QA6oQMzujnPOMY+aT1zcz/4Mzlrn2VZWmLjxY318Q/wJwMppXsA7wAeAVwAHEj+jFxVSukOwGcR643kVxmrBWCiD8VHtmGvQsziZwB2oLwuJPceQGqcVoLoiE9hSd4cupWBI4CnUYglcQAnks9eBuze7Bp2KoQj/m21UF9l8xnOgSSIEfHpSnrVrUCMii8C2J8RiPkAdbXnczXTvlgDdUYCELalfGphcTcDOZID0bpF9+R5U3gWCBBh8XAGhExI4qMAvYKzeFLHlACcp1bWgQQRqgFBPIOEIVyAQJMxUblth15BQNw8gy2pbYcaUUQ8D5ZAs+r6iaVhJLXXUYiWH7BxLIkH+0SzMBVDEmoyTiaOJA+eIWlZspB4JBMRS1abUkncgbiSzC9n+rRnyz9mZ3wC8KI64grCPKa57CuAV9eWt2brmr+5nXBNcWkYrQWyeQZ+Ac/E4iHdfHjZAAAAAElFTkSuQmCC"},415:function(t,e){t.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAEmUlEQVR4Xu1b0VHcMBDVnvwfUkGggsRz6+9ABQkVABVAKghUEKiAo4JwFXB8WzeGCgIdwL9vlFmPzPgcy5JsWZwD+mI4WdZ72l2t3srAKi1N010AOGaMfa/+f+R/X0spL5IkWTThgPKfQohLxtjhyMG2TX+GiEf1DgUBbwB8ifsfEkCZ/c1/vPJr0KSUe1V3ACHENWPs21shgDE2R8SXGEcEyDcEvoCKiC+xr5UAKeUtAJxLKZ/GRBIAUDA/0M3ZigACnyTJ7piA17b0UwD42TR/KwIYY/uISPFhlC3Lsu3VavWnMwH1aDlGFnTxzcoC3gmo7ZfvFjBCBt5dQJPjvMcAm0TINQgKIQ4AYJs8ZTKZzOM4vnttrwniAlmWfcnz/BIAvtQANx4/Q5IShIA0TbMG8AVOKeVZkiSnIUFX3zU4Acvl8lBKSUKKrj0h4kcfBGRZthXHsdOZZHAC0jTV5tslaM557CMeCCF+M8auXNLzTSFgJ47jhz5WUCGaCLCW7QYngALgarXKdOB8nChripWTSw1OAAEXQpwzxkhJrrdnzvluH/NXJzoieKsyuPUpNQgBNDFloieMsQ8q+t9GUXTSE/xWnuc3DTuMtRsEI6BcHXIJxthTX59XlqWT6a3dIDgBfQJd9VmL7dXKDUZJgCmwKqKs3GB0BFCyo3aV4kzRN8EaHQFCCCrQWAmxNgnWqAho2U51hnCBiLTzaNtGEEDHZES8MkyUKjWU6rq0e0Ssn0DXnn91Asqia5u2oIIemX412TERMeecH5oOR0IIOjwVuUmlPSPiy7u0lSFXQaQ+41rF+QERd+p9KOhpkp02Aqx2AJVLNGWpa64zCAFN5fYmbaBDWd4aPBGgdhXSI8jFaNVnnPPTquV4J6AF1JOK3MXJcLlcnkgpf5lsvWq6nPNtk9k7jFd09UqAxYpeI+J+xzsJxqjvCt4rARbgy/ntM8Yoz3cJeiSvrV1sqIIVQhwDwBZVsTnnVy5W4sUCHMB3WaTimaqWXwO/ljxJKe+iKNqzJaE3ASHA6wjQuRIA/JhOp7QDGFsvAkKB1xGgC6QuanRnAkKCb7GARlF2cAJCg98oAgYGP1fJyoONnKaT5QezgAHB36vc3qmeGJSAgcGTeuxU9SG3CEZAh7O6cfspO9gIG7rBghFgjSZwx5bS3Gwymcx00wGAx1K57rwNDom1cm3flC6TdmjSD3VTXXDO9zeOgI4Hpa7rMd84AgJf3n7cOALSNF0AwNeuS+ryXHEXWicc9pXEXCZS7Wtz56Dr2PXnAOCo7ba4VfnJ12TKcZSMRRF8yG8YHqWUM7q+00bAAhH3fAO0HU8Jpq2yNwA0fumi0w6a3m36YGIhpTznnDtnabZAAeC+SxZI49vo/qZ5mAgwPe/ldwA4nU6nZ66D+SKADiCfXV/uu3+XoOuFAItavG+suvGcNH9vLqAGenUr6HKhyosFEAFq66FPS1/NFVxEjNKEvBFQDqiSELqH9ymU3av3WBU763PyTkAlGdnO87zrKcuJuyiK7npsg8bqr2kyLx8Qmjpu4u8aocaphDZqAmyqv6aF+wtk1Bw67F50LgAAAABJRU5ErkJggg=="},420:function(t,e,a){t.exports={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",[i("head-top"),t._v(" "),i("el-row",{staticStyle:{"margin-top":"20px"}},[i("el-col",{attrs:{span:14,offset:4}},[i("header",{staticClass:"form_header"},[t._v("添加数据")]),t._v(" "),i("el-form",{ref:"foodForm",staticClass:"form food_form",attrs:{model:t.foodForm,rules:t.foodrules,"label-width":"110px"}},[i("el-form-item",{attrs:{label:"一级标题",prop:"name"}},[i("el-input",{model:{value:t.foodForm.name,callback:function(e){t.$set(t.foodForm,"name",e)},expression:"foodForm.name"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"首页展示图片"}},[i("el-upload",{staticClass:"avatar-uploader",attrs:{action:t.baseUrl+"/v1/addimg/food","show-file-list":!1,"on-success":t.uploadImg,"before-upload":t.beforeImgUpload}},[t.foodForm.image_path?i("img",{staticClass:"avatar",attrs:{src:t.baseImgPath+t.foodForm.image_path}}):i("i",{staticClass:"el-icon-plus avatar-uploader-icon"})])],1),t._v(" "),i("el-form-item",{attrs:{label:"图片组上传"}},[i("div",{staticClass:"hello"},[i("div",{staticClass:"upload"},[i("div",{staticClass:"upload_warp"},[i("div",{staticClass:"upload_warp_left",on:{click:t.fileClick}},[i("img",{attrs:{src:a(415)}})])]),t._v(" "),i("div",{staticClass:"upload_warp_text"},[t._v("\n                    选中"+t._s(t.imgList.length)+"张文件，共"+t._s(t.bytesToSize(this.size))+"\n                  ")]),t._v(" "),i("input",{staticStyle:{display:"none"},attrs:{type:"file",id:"upload_file",multiple:"",accept:"image/jpeg,image/x-png,image/gif,image/bmp"},on:{change:function(e){t.fileChange(e)}}}),t._v(" "),i("div",{directives:[{name:"show",rawName:"v-show",value:0!=t.imgList.length,expression:"imgList.length!=0"}],staticClass:"upload_warp_img"},t._l(t.imgList,function(e,o){return i("div",{key:o,staticClass:"upload_warp_img_div"},[i("div",{staticClass:"upload_warp_img_div_top"},[i("div",{staticClass:"upload_warp_img_div_text"},[t._v("\n                          "+t._s(e.file.name)+"\n                        ")]),t._v(" "),i("img",{staticClass:"upload_warp_img_div_del",attrs:{src:a(414)},on:{click:function(e){t.fileDel(o)}}})]),t._v(" "),i("img",{attrs:{src:e.file.src}})])}))]),t._v(" "),t._l(t.imgList,function(e,a){return i("div",{staticStyle:{"text-align":"left"}},[t._v("\n                  "+t._s(a)+"："+t._s(e.file.name)+"\n                ")])})],2)]),t._v(" "),i("el-form-item",[i("el-button",{attrs:{type:"primary"},on:{click:function(e){t.addFood("foodForm")}}},[t._v("提交数据")])],1)],1)],1)],1)],1)},staticRenderFns:[]}}});