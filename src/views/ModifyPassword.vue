<template>
  <div class="modifypassword">
    <!-- 导航栏 -->
    <van-nav-bar title="修改密碼" left-text="返回" left-arrow @click-left="goBack" />

    <div class="cont">
      <van-form @submit="updatePassword">
        <van-field
          v-for="(item,index) in cellData"
          :key="index"
          class="van-cell"
          v-model="item.password"
          :label-width="66"
          :label="item.title"
          :placeholder="item.placeholder"
          :type="item.type"
          clearable
          autocomplete="off"
        >
          <template #right-icon>
            <van-icon
              class-prefix="icon"
              :name="item.isOpen ? 'yanjing' : 'biyan'"
              @click="changeEyes(index)"
            />
          </template>
        </van-field>

        <p>必须包含大小写字母和数字的组合，可以使用特殊字符，长度在8-10之间</p>
        <div class="btn">
          <van-button type="info" class="van-button" native-type="submit" :disabled="isPass">确认</van-button>
        </div>
      </van-form>
    </div>
  </div>
</template>

<script>

import {reg} from '../utils/reg'
import {utils} from '../utils/utils'

export default {
  name: "ModifyPassword",

  data() {
    return {
      cellData: [
        {
          title: "旧密码",
          placeholder: "请填写旧密码",
          type: "password",
          password: "",
          isOpen: false
        },
        {
          title: "新密码",
          placeholder: "请填写新密码",
          type: "password",
          password: "",
          isOpen: false
        }
      ],

    };
  },
  

  computed:{

    //获取密码数据
    userInfo(){
      let o = {}

      o.oldPassword = this.cellData[0].password
      o.newPassword = this.cellData[1].password

      return o
    },

    //提交按钮是否可点击
    isPass(){

      for(let key in this.userInfo){

        if(this.userInfo[key] == ''){
          return  true;
        }

      }

      return false 
    }

  },

  methods: {
    //返回上一级
    goBack() {
      this.$router.go(-1);
    },

    //密码是否可见
    changeEyes(index) {
      if (!this.cellData[index].isOpen) {
        this.cellData[index].type = "text";
      } else {
        this.cellData[index].type = "password";
      }

      this.cellData[index].isOpen = !this.cellData[index].isOpen;
    },


    //修改密码
    updatePassword(){

      if(reg.sub(this.userInfo,this)){

        if(this.userInfo.newPassword == this.userInfo.oldPassword){
          this.$toast('您曾使用过当前密码,请从新输入')
          return
        }

        let tokenString = localStorage.getItem('_t');

         //加载提示
        this.$toast.loading({
          forbidClick: true,
          duration: 0,
          message: "加载中..."
        });

        this.axios({
          method: 'POST',
          url:'/updatePassword',
          data:{
            appkey: this.appKey,
            tokenString,
            oldPassword: this.userInfo.oldPassword,
            password: this.userInfo.newPassword,
          },
          transformRequest: utils.transformRequest
        }).then(result =>{
          this.$toast.clear()
          

          if(result.data.code == 'E001'){
            localStorage.removeItem('_t');

            this.$router.push({name:'Login'})
          }else{
            this.$toast(result.data.msg)
          }
          
        }).catch(err =>{
          this.$toast.clear()
          
          
        })


      }

      
    }
  }
};
</script>

<style lang="less" scoped>
.modifypassword {
  height: 100%;
  position: relative;

  .cont {
    margin-top: 30px;
    padding: 0px 40px;

    .van-cell {
      padding-left: 0;
      padding-right: 0;
    }

    p {
      margin-top: 6px;
      margin-bottom: 26px;
    }

    .van-button {
      width: 100%;
      border-radius: 8px;
    }
  }
}
</style>