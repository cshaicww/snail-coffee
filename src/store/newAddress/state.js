//地区列表
import addressList from "../../data/addressList";

export const state = {
    //显示默认地址
    isDefault: true,

    //是否新增
    isAdd: 0,

    //是否显示删除
    isDelete: true,

    //地址选择数据
    addressList,

    //地址标识
    aid: '',

    //临时地址数据,用于判断用户是否修改地址数据
    temporaryAddressData: {}
}