// 品牌管理数据接口
import request from '@/utils/request'

// 获取品牌列表接口 admin/product/baseTrademark/{page}/{limit}
export const tradeMarkList = (page, limit) => request({ url: `/admin/product/baseTrademark/${page}/${limit}`, method: 'get' })

//新增BaseTrademark  /admin/product/baseTrademark/save
//修改BaseTrademark  /admin/product/baseTrademark/update
export const addOrUpdateBaseTrademark = (data) => {
    // 修改
    if (data.id) {
        return request({ url: '/admin/product/baseTrademark/update', method: 'put', data })
    } else {
        // 新增
        return request({ url: '/admin/product/baseTrademark/save', method: 'post', data })
    }
}

// 删除品牌 DELETE   /admin/product/baseTrademark/remove/{id}  
export const deleteTradeMark = (id) => request({ url: `/admin/product/baseTrademark/remove/${id}`, method: 'delete'})
