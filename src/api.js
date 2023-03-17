import axios from 'axios'

const ncNewsApi = axios.create({
    baseURL: 'https://back-end-news-project.onrender.com',
})

export const getArticles = (topic, order, sortby) => {
    return ncNewsApi.get('/api/articles', { params: { topic, order, sortby } }).then(({ data }) => {
        return data.articles
    })
}

export const getArticleById = (article_id) => {
    return ncNewsApi.get(`/api/articles/${article_id}`).then(({ data }) => {
        return data.article
    })
}

export const getComments = (article_id) => {
    return ncNewsApi.get(`/api/articles/${article_id}/comments`).then(({ data }) => {
        return data.comments
    })
}

export const postComments = (article_id, username, body) => {
    return ncNewsApi.post(`/api/articles/${article_id}/comments`, { username, body }).then(({ data }) => {
        return data.comment
    })
}

export const patchArticle = (article_id, votes) => {
    return ncNewsApi.patch(`/api/articles/${article_id}`, { inc_votes: votes }).then(({ data }) => {
        return data.article
    })
}

export const getTopics = () => {
    return ncNewsApi.get('/api/topics').then(({ data }) => {
        return data.topics
    })
}


export const deleteComment = (comment_id) => {
    return ncNewsApi.delete(`/api/comments/${comment_id}`)
}