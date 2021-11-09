import {createApp} from 'vue';
import App from './App.vue';
import router from './router';
import 'element-plus/theme-chalk/display.css';
import store from './store';
import VMdEditor from '@kangc/v-md-editor';
import '@kangc/v-md-editor/lib/style/base-editor.css';
import githubTheme from '@kangc/v-md-editor/lib/theme/github.js';
import '@kangc/v-md-editor/lib/theme/style/github.css';
import hljs from 'highlight.js';

VMdEditor.use(githubTheme, {
    Hljs: hljs,
});

const app = createApp(App);
app.use(router);
app.use(store);
app.use(VMdEditor);
app.mount('#app');
