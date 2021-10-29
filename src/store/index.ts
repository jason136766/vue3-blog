import {createStore} from "vuex";
import helpers from "../utils/helpers";

export default createStore({
    state: {
        categories: {},
        tags: {}
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
    mutations: {},

})