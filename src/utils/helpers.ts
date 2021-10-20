import axios from "./axios";

// 获取所有分类
let getCategories = (categories: any) => {
    axios.get('categories').then((res) => {
        if (res.status == 200) {
            Object.assign(categories, res.data)
        }
    }).catch((err) => {
        console.log('err: ', err)
    })
}

// 获取所有分类文章
let getArticles = (articles: any, params = '') => {
    axios.get('articles' + params).then((res) => {
        if (res.status == 200 && res.data.result) {
            Object.assign(articles, res.data.result)
        }
        return articles = []
    }).catch((err) => {
        console.log('err:', err)
    })
}

// 获取文章详情
let getArticle = (article: any, id: number) => {
    axios.get(`articles/${id}`).then((res) => {
        if (res.status == 200) {
            Object.assign(article, res.data)
        }
    }).catch((err) => {
        console.log('err:', err)
    })
}

export default {
    getCategories,
    getArticles,
    getArticle
}