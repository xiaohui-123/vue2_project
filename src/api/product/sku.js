//SKU平台
import request from '@/utils/request'
//   export const  = ()=>request({url:'',method:'get'})

//获取图片接口 /admin/product/spuImageList/{spuId}
export const getSpuImageList = (spuId) => request({ url: `/admin/product/spuImageList/${spuId}`, method: 'get' })

//获取销售属性的接口 /admin/product/spuSaleAttrList/{spuId}
export const getSpuSaleAttrList = (spuId) => request({ url: `/admin/product/spuSaleAttrList/${spuId}`, method: 'get' })

//获取商品基础属性 /admin/product/attrInfoList/{category1Id}/{category2Id}/{category3Id}
export const getAttrInfoList = (category1Id, category2Id, category3Id) => request({ url: `/admin/product/attrInfoList/${category1Id}/${category2Id}/${category3Id}`, method: 'get' })

//保存 /admin/product/saveSkuInfo
export const saveSkuInfo = (skuInfo) => request({ url: '/admin/product/saveSkuInfo', method: 'post', data: skuInfo })

// 查看sku列表 /admin/product/findBySpuId/{spuId}
export const getSkuList = (spuId) => request({ url: `/admin/product/findBySpuId/${spuId}`, method: 'get' })

//sku模块
//获取SKU基本信息 /admin/product/list/{page}/{limit}
export const getSkuProductList = (page, limit) => request({ url: `/admin/product/list/${page}/${limit}`, method: 'get' })

//上架 GET /admin/product/onSale/{skuId}
export const onSale = (skuId) => request({ url: `/admin/product/onSale/${skuId}`, method: 'get' })

//下架  get /admin/product/cancelSale/{skuId}
export const cancelSale = (skuId) => request({ url: `/admin/product/cancelSale/${skuId}`, method: 'get' })

//查看详情 /admin/product/getSkuById/{skuId}
export const getSkuById = (skuId) => request({ url: `/admin/product/getSkuById/${skuId}`, method: 'get' })




