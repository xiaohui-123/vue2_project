//SPU平台
import request from '@/utils/request'
//   export const  = ()=>request({url:'',method:'get'})

//获取SPU接口  /admin/product/{page}/{limit}
export const reqSpuList = (page, limit, category3Id) => request({ url: `/admin/product/${page}/${limit}`, method: 'get', params: { category3Id } })

// 获取品牌数据  /admin/product/baseTrademark/getTrademarkList get
export const getTrademarkList = () => request({ url: '/admin/product/baseTrademark/getTrademarkList', method: 'get' })

// 获取平台中所有销售属性  /admin/product/baseSaleAttrList  get
export const getBaseSaleAttrList = () => request({ url: '/admin/product/baseSaleAttrList', method: 'get' })

// 获取某一个SPU信息 /admin/product/getSpuById/{spuId} get
export const getSpuById = (spuId) => request({ url: `/admin/product/getSpuById/${spuId}`, method: 'get' })

// 获取SPU照片墙   /admin/product/spuImageList/{spuId} get
export const getSpuImageList = (spuId) => request({ url: `/admin/product/spuImageList/${spuId}`, method: 'get' })

//保存spu /admin/product/saveSpuInfo
// 修改spu /admin/product/updateSpuInfo
export const addOrUpdateSpu = (spuInfo) => {
    //带id 为修改
    if (spuInfo.id) {
        return request({ url: '/admin/product/updateSpuInfo', method: 'post', data: spuInfo })
    } else {
        return request({ url: '/admin/product/saveSpuInfo', method: 'post', data: spuInfo })
    }
}

//删除SPU /admin/product/deleteSpu/{spuId}
export const reqDeleteSpu = (spuId) => request({ url: `/admin/product/deleteSpu/${spuId}`, method: 'delete' })





