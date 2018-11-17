<template>
    <div>
     	<head-top></head-top>
        <el-row style="margin-top: 20px;">
  			<el-col :span="14" :offset="4">
	  			<header class="form_header">添加数据</header>
	  			<el-form :model="foodForm" :rules="foodrules" ref="foodForm" label-width="110px" class="form food_form">
	  				<el-form-item label="一级标题" prop="name">
						<el-input v-model="foodForm.name"></el-input>
					</el-form-item>
					<!-- <el-form-item label="虚拟点赞数" prop="description">
						<el-input v-model="foodForm.description"></el-input>
					</el-form-item> -->
					<el-form-item label="首页展示图片">
						<el-upload
						  class="avatar-uploader"
						  :action="baseUrl + '/v1/addimg/food'"
						  :show-file-list="false"
						  :on-success="uploadImg"
						  :before-upload="beforeImgUpload">
						  <img v-if="foodForm.image_path" :src="baseImgPath + foodForm.image_path" class="avatar">
						  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
						</el-upload>
					</el-form-item>

          <el-form-item label="图片组上传">
            <div class="hello">
                <div class="upload">
                  <div class="upload_warp">
                    <div class="upload_warp_left" @click="fileClick">
                      <img src="../assets/img/upload.png">
                    </div>
                  </div>
                  <div class="upload_warp_text">
                    选中{{imgList.length}}张文件，共{{bytesToSize(this.size)}}
                  </div>
                  <input @change="fileChange($event)" type="file" id="upload_file" multiple style="display: none" accept="image/jpeg,image/x-png,image/gif,image/bmp"/>
                  <div class="upload_warp_img" v-show="imgList.length!=0">
                    <div class="upload_warp_img_div" v-for="(item,index) in imgList"
                        :key="index">
                      <div class="upload_warp_img_div_top">
                        <div class="upload_warp_img_div_text">
                          {{item.file.name}}
                        </div>
                        <img src="../assets/img/del.png" class="upload_warp_img_div_del" @click="fileDel(index)">
                      </div>
                      <img :src="item.file.src">
                    </div>
                  </div>
                </div>
                <div v-for="(item,index) in imgList" style="text-align: left">
                  {{index}}：{{item.file.name}}
                </div>
              </div>
          </el-form-item>
					<el-form-item>
						<el-button type="primary" @click="addFood('foodForm')">提交数据</el-button>
					</el-form-item>
	  			</el-form>
  			</el-col>
  		</el-row>
    </div>
</template>

<script>
import headTop from "@/components/headTop";
import { getCategory, addCategory, addFood } from "@/api/getData";
import { baseUrl, baseImgPath } from "@/config/env";
import axios from "axios";
export default {
  data() {
    return {
      imgList: [],
      size: 0,
      limit: undefined,

      file: "",
      baseUrl,
      baseImgPath,
      restaurant_id: 1,
      categoryForm: {
        categoryList: [],
        categorySelect: "",
        name: "",
        description: ""
      },
      foodForm: {
        name: "",
        description: "",
        image_path: "",
        attributes: []
      },
      foodrules: {
        name: [{ required: true, message: "请输入一级标题", trigger: "blur" }]
      }
    };
  },
  components: {
    headTop
  },
  methods: {
    uploadImg(res, file) {
      if (res.status == 1) {
        this.foodForm.image_path = res.image_path;
      } else {
        this.$message.error("上传图片失败！");
      }
    },
    beforeImgUpload(file) {
      const isRightType =
        file.type === "image/jpeg" || file.type === "image/png" || file.type === "image/jpg";

      //图片大小及尺寸的限制
      // const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isRightType) {
        this.$message.error("只能上传图片！");
        // this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      // if (!isLt2M) {
      //   this.$message.error("上传头像图片大小不能超过 2MB!");
      // }
      this.file = file;
      // return isRightType && isLt2M;
      return isRightType;
    },

    //---------------------------------------

    fileClick() {
      document.getElementById("upload_file").click();
    },
    fileChange(el) {
      console.log("文件：", el.target.files);

      if (!el.target.files[0].size) return;
      this.fileList(el.target);
      el.target.value = "";
    },
    fileList(fileList) {
      let files = fileList.files;
      for (let i = 0; i < files.length; i++) {
        //判断是否为文件夹
        if (files[i].type != "") {
          this.fileAdd(files[i]);
        } else {
          //文件夹处理
          this.folders(fileList.items[i]);
        }
      }
    },
    //文件夹处理
    folders(files) {
      let _this = this;
      //判断是否为原生file
      if (files.kind) {
        files = files.webkitGetAsEntry();
      }
      files.createReader().readEntries(function(file) {
        for (let i = 0; i < file.length; i++) {
          if (file[i].isFile) {
            _this.foldersAdd(file[i]);
          } else {
            _this.folders(file[i]);
          }
        }
      });
    },
    foldersAdd(entry) {
      let _this = this;
      entry.file(function(file) {
        _this.fileAdd(file);
      });
    },
    fileAdd(file) {
      console.log("文件类型：", file.type);

      if (this.limit !== undefined) this.limit--;
      if (this.limit !== undefined && this.limit < 0) return;
      //总大小
      this.size = this.size + file.size;
      //判断是否为图片文件
      if (file.type.indexOf("image") == -1) {
        file.src = "../assets/img/del.png";
        this.imgList.push({
          file
        });
      } else {
        let reader = new FileReader();
        let image = new Image();
        let _this = this;
        reader.readAsDataURL(file);
        reader.onload = function() {
          file.src = this.result;
          image.onload = function() {
            let width = image.width;
            let height = image.height;
            file.width = width;
            file.height = height;
            _this.imgList.push({
              file
            });
            console.log(_this.imgList);
          };
          image.src = file.src;
        };
      }
    },
    fileDel(index) {
      this.size = this.size - this.imgList[index].file.size; //总大小
      this.imgList.splice(index, 1);
      if (this.limit !== undefined) this.limit = this.imgList.length;
    },
    bytesToSize(bytes) {
      if (bytes === 0) return "0 B";
      let k = 1000, // or 1024
        sizes = ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"],
        i = Math.floor(Math.log(bytes) / Math.log(k));
      return (bytes / Math.pow(k, i)).toPrecision(3) + " " + sizes[i];
    },

    addFood(foodForm) {
      //标题
      var title = this.foodForm.name;
      title = title.replace(/(^\s*)|(\s*$)/g, "");

      if (title == "") {
        this.$message.error("请输入一级标题");
        return;
      }

      //首页显示图片判断
      if (this.file == "" || typeof this.file === "undefined") {
        this.$message.error("请选择首页显示的图片");
        return;
      }

      //图片组判断
      if (this.imgList.length <= 0) {
        this.$message.error("请选择需要上传的图片组");
        return;
      }

      //用于封装图片组地址
      var pictrues = new Array();

      //图片组上传
      for (var i = 0; i < this.imgList.length; i++) {
        var param = new FormData(); // FormData 对象
        param.append("file", this.imgList[i].file); // 文件对象
        param.append("id", "1"); // 其他参数
        param.append("status", "4");

        var promise = new Promise((resolve, reject) => {
          axios({
            method: "post",
            url: "http://192.168.31.37:8080/platform/api/uploadFile",
            data: param
          }).then(res => {
            if (res.data.code == 0) {
              // console.log("返回数据：", res.data.data.accessUrl);
              pictrues.push(res.data.data.accessUrl);
              resolve({ data: pictrues, code: i });
            }
          });
        });
      }

      //等待异步执行完成后回调，（等同于 同步执行）
      promise.then(
        res => {
          // 执行成功的回调函数

          console.log("图片上传后的地址集：", res.data);

          // //首页显示图片上传
          console.log("文件：", this.file);
          var param = new FormData(); // FormData 对象
          param.append("file", this.file); // 文件对象
          param.append("id", "1"); // 其他参数
          param.append("status", "1"); // 其他参数
          param.append("pictures", res.data); // 图片组集合地址
          param.append("title", title); // 图片组集合地址
          axios({
            method: "post",
            url: "http://192.168.31.37:8080/platform/api/warehousing",
            data: param
          }).then(res => {
            if (res.data.code == 0) {
              this.$message({
                type: "success",
                message: "入库成功"
              });
            }else{
              this.$message.error(res.data.errMsg);
            }
          });
        },
        error => {
          // 执行失败的回调函数
          console.log("失败：", error);
          this.$message.error(error);
        }
      );

      // //首页显示图片上传
      // console.log("文件：", this.file);
      // var param = new FormData(); // FormData 对象
      // param.append("file", this.file); // 文件对象
      // param.append("id", "1"); // 其他参数
      // param.append("status", "1"); // 其他参数
      // axios({
      //   method: "post",
      //   url: "http://192.168.31.37:8080/store/api/uploadFile",
      //   data: param
      // });
    }
  }
};
</script>

<style lang="less">
@import "../style/mixin";
.form {
  min-width: 400px;
  margin-bottom: 30px;
  &:hover {
    box-shadow: 0 0 8px 0 rgba(232, 237, 250, 0.6),
      0 2px 4px 0 rgba(232, 237, 250, 0.5);
    border-radius: 6px;
    transition: all 400ms;
  }
}
.food_form {
  border: 1px solid #eaeefb;
  padding: 10px 10px 0;
}
.form_header {
  text-align: center;
  margin-bottom: 10px;
}
.category_select {
  border: 1px solid #eaeefb;
  padding: 10px 30px 10px 10px;
  border-top-right-radius: 6px;
  border-top-left-radius: 6px;
}
.add_category_row {
  height: 0;
  overflow: hidden;
  transition: all 400ms;
  background: #f9fafc;
}
.showEdit {
  height: 185px;
}
.add_category {
  background: #f9fafc;
  padding: 10px 30px 0px 10px;
  border: 1px solid #eaeefb;
  border-top: none;
}
.add_category_button {
  text-align: center;
  line-height: 40px;
  border-bottom-right-radius: 6px;
  border-bottom-left-radius: 6px;
  border: 1px solid #eaeefb;
  border-top: none;
  transition: all 400ms;
  &:hover {
    background: #f9fafc;
    span,
    .edit_icon {
      color: #20a0ff;
    }
  }
  span {
    .sc(14px, #999);
    transition: all 400ms;
  }
  .edit_icon {
    color: #ccc;
    transition: all 400ms;
  }
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #20a0ff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 120px;
  height: 120px;
  line-height: 120px;
  text-align: center;
}
.avatar {
  width: 120px;
  height: 120px;
  display: block;
}
.cell {
  text-align: center;
}

//-------------------上：标题和首页图片，下：图片组上传（样式）------------------------

.upload_warp_img_div_del {
  position: absolute;
  top: 6px;
  width: 16px;
  right: 4px;
}

.upload_warp_img_div_top {
  position: absolute;
  top: 0;
  width: 100%;
  height: 30px;
  background-color: rgba(0, 0, 0, 0.4);
  line-height: 30px;
  text-align: left;
  color: #fff;
  font-size: 12px;
  text-indent: 4px;
}

.upload_warp_img_div_text {
  white-space: nowrap;
  width: 80%;
  overflow: hidden;
  text-overflow: ellipsis;
}

.upload_warp_img_div img {
  max-width: 100%;
  max-height: 100%;
  vertical-align: middle;
}

.upload_warp_img_div {
  position: relative;
  height: 100px;
  width: 120px;
  border: 1px solid #ccc;
  margin: 0px 30px 10px 0px;
  float: left;
  line-height: 100px;
  display: table-cell;
  text-align: center;
  background-color: #eee;
  cursor: pointer;
}

.upload_warp_img {
  border-top: 1px solid #d2d2d2;
  padding: 14px 0 0 14px;
  overflow: hidden;
}

.upload_warp_text {
  text-align: left;
  margin-bottom: 10px;
  padding-top: 10px;
  text-indent: 14px;
  border-top: 1px solid #ccc;
  font-size: 14px;
}

.upload_warp_right {
  float: left;
  width: 57%;
  margin-left: 2%;
  height: 100%;
  border: 1px dashed #999;
  border-radius: 4px;
  line-height: 130px;
  color: #999;
}

.upload_warp_left img {
  margin-top: 32px;
  margin-left: 85px;
}

.upload_warp_left {
  float: left;
  width: 40%;
  height: 100%;
  border: 1px dashed #999;
  border-radius: 4px;
  // padding-left: 120px;
  cursor: pointer;
}

.upload_warp {
  margin: 14px;
  height: 130px;
}

.upload {
  border: 1px solid #ccc;
  background-color: #fff;
  width: 650px;
  box-shadow: 0px 1px 0px #ccc;
  border-radius: 4px;
}

.hello {
  width: 650px;
}
</style>
