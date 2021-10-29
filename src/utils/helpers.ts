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
let getArticles = (list: any, params = '') => {
    axios.get('articles' + params).then((res) => {
        if (res.status == 200 && res.data.result) {
            Object.assign(list, res.data)
        }
        return list = []
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

// 递归获取深层对象值
let recursive = (obj: any, callback: any) => {
    Object.keys(obj).forEach(function (key) {
        var val = obj[key];

        if (typeof val !== 'object') {
            callback(val);
        } else {
            recursive(val, callback);
        }
    });
}

export default {
    getCategories,
    getArticles,
    getArticle,
    recursive
}