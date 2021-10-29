import {createStore} from "vuex";
import helpers from "../utils/helpers";

export default createStore({
    state: {
        categories: {},
    },
    getters: {
        getCategories(state) {
            helpers.getCategories(state.categories)
            return state.categories
        }
    },
    mutations: {},

})