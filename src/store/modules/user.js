import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter, asyncRoutes, constantRoutes, anyRoutes } from '@/router'
import router from '@/router'
const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    avatar: '',
    routes: [],
    buttons: [],
    roles: [],
    resultAsyncRoutes: [],
    //最终可以遍历的所有路由
    resultAllRoutes: [],
    ifChange:false
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_USERINFO: (state, userInfo) => {
    state.name = userInfo.name
    state.avatar = userInfo.avatar
    state.roles = userInfo.roles
    state.buttons = userInfo.buttons
    state.routes = userInfo.routes
  },
  SET_ROUTES: (state, resultRoutes) => {
    state.resultAsyncRoutes = resultRoutes
    state.resultAllRoutes = constantRoutes.concat(state.resultAsyncRoutes, anyRoutes)
    //给路由器添加新的路由
    router.addRoutes(state.resultAllRoutes)
    state.ifChange = true
  }
}

const resultAsyncRoutes = (asyncRoutes, routes) => {
  return asyncRoutes.filter(item => {
    if (routes.indexOf(item.name) != -1) {
      if (item.children && item.children.length) {
        //递归
        item.children = resultAsyncRoutes(item.children, routes)
      }
      return true
    }
  })
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password }).then(response => {
        const { data } = response
        commit('SET_TOKEN', data.token)
        setToken(data.token)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  againLogin({ commit }, flag) {
   try {
    if(flag) {
      const AllRoutes =  JSON.parse(localStorage.getItem('All'))
      commit('SET_ROUTES', resultAsyncRoutes(asyncRoutes,AllRoutes))
      return flag
    }
   } catch (error) {
    console.log(error);
   }
  },
  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {
        const { data } = response
        if (!data) {
          return reject('Verification failed, please Login again.')
        }
        commit('SET_USERINFO', data)
        localStorage.setItem('All',JSON.stringify(data.routes))
        //路由对比 根据用户的权限来给他分配对应的路由 
        commit('SET_ROUTES', resultAsyncRoutes(asyncRoutes, data.routes))
        
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        removeToken() // must remove  token  first
        resetRouter()
        commit('RESET_STATE')
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

