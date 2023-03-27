// 将4个模块请求的接口统一暴露
import * as trademark from '@/api/product/tradeMark'
import * as attr from '@/api/product/attr'
import * as sku from '@/api/product/sku'
import * as spu from '@/api/product/spu'

//引入权限相关的接口文件
import permission from './acl/permission'
import role from './acl/role'
import * as user from './acl/user'

export default {
    trademark,
    attr,
    sku,
    spu,
    permission,
    role,
    user
}