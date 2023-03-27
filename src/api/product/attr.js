//平台属性管理
import request from '@/utils/request'

//获取一级分类数据接口 GET /admin/product/getCategory1
export const getCategory1List = () => request({ url: '/admin/product/getCategory1', method: 'get' })

//获取二级分类 /admin/product/getCategory2/{category1Id}
export const getCategory2List = (category1Id) => request({ url: `/admin/product/getCategory2/${category1Id}`, method: 'get' })

//获取三级分类 /admin/product/getCategory3/{category2Id}
export const getCategory3List = (category2Id) => request({ url: `/admin/product/getCategory3/${category2Id}`, method: 'get' })

//商品基础数据   /admin/product/attrInfoList/{category1Id}/{category2Id}/{category3Id}
export const attrInfoList = (category1Id, category2Id, category3Id) => request({ url: `/admin/product/attrInfoList/${category1Id}/${category2Id}/${category3Id}`, method: 'get' })

//添加属性与属性值的接口 POST /admin/product/saveAttrInfo
export const saveAttrInfo = (data) => request({ url: '/admin/product/saveAttrInfo', method: 'post', data })




