import axios from 'axios'

const ncNewsApi = axios.create({
    baseURL: 'https://back-end-news-project.onrender.com',
})

export const getArticles = (topic, order, sortby) => {
    return ncNewsApi.get('/api/articles', { params: {  topic, order, sortby } }).then(({ data }) => {
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

export const patchArticle = (article_id, votes) => {
    return ncNewsApi.patch(`/api/articles/${article_id}`, {inc_votes: votes}).then(({ data }) => {
        return data.article
    })
}