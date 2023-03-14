import axios from 'axios'

const ncNewsApi = axios.create({
    baseURL: 'https://back-end-news-project.onrender.com',
})

export const getArticles = () => {
    return ncNewsApi.get('/api/articles').then(({ data }) => {
        return data.articles
    })
}
