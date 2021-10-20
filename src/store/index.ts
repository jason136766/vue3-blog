import {createStore} from "vuex";
import helpers from "../utils/helpers";

export default createStore({
    state: {
        articles: [],
        category_id: 0,
        article: {}
    },
    getters: {
        getArticles(state) {
            let params = state.category_id ? '?category_id=' + state.category_id : ''
            state.articles = []

            helpers.getArticles(state.articles, params)
            return state.articles;
        },
    },
    mutations: {
        setCategory_id(state, payload) {
            state.category_id = payload.id ?? 0
        }

    },

})