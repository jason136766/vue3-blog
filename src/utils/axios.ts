import Axios from 'axios'
import {ElMessage} from 'element-plus'
import 'element-plus/theme-chalk/el-message.css'
import helpers from "./helpers";


const baseURL = <string>import.meta.env.VITE_APP_DOMAIN

const axios = Axios.create({
    baseURL,
    timeout: 20000 // 请求超时 20s
})

// 前置拦截器（发起请求之前的拦截）
axios.interceptors.request.use(
    (response) => {
        /**
         * 根据你的项目实际情况来对 config 做处理
         * 这里对 config 不做任何处理，直接返回
         */
        return response
    },
    (error) => {
        return Promise.reject(error)
    }
)

// 后置拦截器（获取到响应时的拦截）
axios.interceptors.response.use(
    (response) => {
        /**
         * 根据你的项目实际情况来对 response 和 error 做处理
         * 这里对 response 和 error 不做任何处理，直接返回
         */
        return response
    },
    (error) => {

        if (error.response && error.response.data) {
            const msg = error.response.data.msg

            if (msg instanceof Object) {
                let errMsg = ''
                helpers.recursive(msg, (val: any) => {
                    errMsg += `<p style="height: 25px;line-height: 25px">${val}</p>`
                })

                ElMessage.error({
                    dangerouslyUseHTMLString: true,
                    message: errMsg
                })
            } else {
                ElMessage.error(msg)
            }
        } else {
            ElMessage.error(error)
        }
        return Promise.reject(error)
    }
)

export default axios
