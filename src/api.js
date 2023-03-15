import axios from 'axios'

const ncNewsApi = axios.create({
    baseURL: 'https://back-end-news-project.onrender.com',
})

export const getArticles = () => {
    return ncNewsApi.get('/api/articles').then(({ data }) => {
        return data.articles
    })
}

export const getArticle = (article_id) => {
    return ncNewsApi.get(`/api/articles/${article_id}`).then(({ data }) => {
        return data.article
    })
}

export const getComments = (article_id) => {
    return ncNewsApi.get(`/api/articles/${article_id}/comments`).then(({ data }) => {
        return data.comments
    })
}
