import {createStore} from "vuex";
import helpers from "../utils/helpers";

export default createStore({
    state: {
        categories: {},
        tags: {},
        isLogin: false,
        article: {}
    },
    getters: {
        getCategories(state) {
            helpers.getCategories(state.categories)

            return state.categories
        },
        getTags(state) {
            helpers.getTags(state.tags)

            return state.tags
        }
    },
    mutations: {
        setIsLogin(state, val: boolean) {
            state.isLogin = val
        }
    },

})