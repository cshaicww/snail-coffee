class Reg {
    constructor() {

        this.phone = {
            reg: /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/,
            err: '请输入正确的电话号码或邮箱'
        }

        this.nickName = {

            reg: /^[0-9a-zA-Z\u4e00-\u9fa5]{4,12}$/,
            err: '请输入正确的呢称'

        }

        this.password = {
            reg: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,16}$/,
            err: '请输入正确的密码'
        }

        this.oldPassword = {
            reg: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,16}$/,
            err: '请输入正确的旧密码'
        }

        this.newPassword = {
            reg: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,16}$/,
            err: '请输入正确的新密码'
        }

        this.venCode = {
            reg: /^[0-9]{6}$/,
            err: '请输入正确的验证码'
        },

        this.email ={
           reg: /(\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*)/,
           err: '请输入正确的邮箱地址'

        }

    }

    sub(o, t) {




        for (let key in o) {


            if (!this[key].reg.test(o[key])) {
                t.$toast(this[key].err);

                return false;
            }


        }
        return true


    }

}

export const reg = new Reg()