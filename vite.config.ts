import {defineConfig, loadEnv} from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import {ElementPlusResolver} from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default ({mode}) => {
    process.env = {...process.env, ...loadEnv(mode, process.cwd())};

    return defineConfig({
        plugins: [
            vue(),
            Components({
                resolvers: [ElementPlusResolver()],
            }),
        ],
        server: {
            host: '0.0.0.0',
            cors: true,
            // 设置代理，根据我们项目实际情况配置
            proxy: {
                '/api':
                    {
                        target: process.env.VITE_API_URL,
                        changeOrigin: true,
                        rewrite: (path) => path.replace('/api/', '/')
                    }
            }
        }
    })
}
