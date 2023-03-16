import { getArticles } from "../api"
import { useEffect, useState } from "react"
import PersonIcon from '@mui/icons-material/Person';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import CommentIcon from '@mui/icons-material/Comment';
import TagIcon from '@mui/icons-material/Tag';
import { Link } from "react-router-dom";
import { format, parseISO } from 'date-fns'
import { useParams, useSearchParams } from "react-router-dom";

import { Container, Box, Grid, Card, CardActions, CardContent, CardMedia, Button, Typography, Chip, MenuItem, FormControl, InputLabel, Select, Switch, Collapse, FormControlLabel } from '@mui/material';

const Articles = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [articles, setArticles] = useState([])
    const [order, setOrder] = useState('')
    const [topics, setTopics] = useState('');
    const [sortBy, setSortBy] = useState('');
    const [checked, setChecked] = useState(true);
    const [height, setHeight] = useState('300');
    const [currentOrder, setCurrentOrder] = useState('')
    const [currentTopics, setCurrentTopics] = useState('');
    const [currentSortBy, setCurrentSortBy] = useState('');
    const [reset, setReset] = useState(false);
    const [searchSortByParams, setSortByParams] = useSearchParams();
    const [searchOrderParams, setSearchOrderParams] = useSearchParams();
    const [searchTopicParams, setSearchTopicParams] = useSearchParams();

    const sortTopic = searchSortByParams.get('topic')
    const sortOrder = searchSortByParams.get('order')
    const sortSortBy = searchSortByParams.get('sort_by')

    const handleChange = () => {
        setChecked((prev) => !prev);
        setHeight('0')
    };

    useEffect(() => {
        setIsLoading(true)
        getArticles(sortTopic, sortOrder, sortSortBy).then((articleData) => {
            setArticles(articleData)
            setIsLoading(false)
        })

    }, [currentTopics, currentOrder, currentSortBy])

    const submitHandler = (event) => {
        event.preventDefault();
        setCurrentTopics(topics)
        setCurrentSortBy(sortBy)
        setCurrentOrder(order)
        setChecked((prev) => !prev);
    }

    const handleReset = () => {
        setTopics('')
        setSortBy('')
        setOrder('')
        setReset(true)
    }

    return (
        <Container>
            <Box sx={{ height: height }}>
                <FormControlLabel
                    control={<Switch checked={checked} onChange={handleChange} />}
                    label="Show filters "
                />
                <Box>
                    <Collapse in={checked} timeout={1000}>
                        <form onSubmit={submitHandler}>
                            <Box sx={{
                                flexGrow: 1,
                                p: 2,
                                marginTop: '3em',
                                border: '2px solid',
                                borderRadius: '25px'

                            }} >
                                <Grid container spacing={{ xs: 12, md: 12 }} columns={{ xs: 12, sm: 12, md: 12 }}>
                                    <Grid item xs={12} sm={12} md={4}>
                                        <FormControl fullWidth>
                                            <InputLabel id="demo-simple-select-label">Topics</InputLabel>
                                            <Select

                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                value={topics}
                                                label="Topic"
                                                onChange={(event) => {
                                                    setTopics(event.target.value)
                                                    const newSearchTopicParams = new URLSearchParams(searchTopicParams)
                                                    newSearchTopicParams.set('topic', event.target.value)
                                                    setSearchTopicParams(newSearchTopicParams)
                                                }}
                                            >
                                                <MenuItem value={'coding'}>coding</MenuItem>
                                                <MenuItem value={'cooking'}>cooking</MenuItem>
                                                <MenuItem value={'football'}>football</MenuItem>
                                            </Select>
                                        </FormControl>

                                    </Grid>
                                    <Grid item xs={12} sm={12} md={4}>
                                        <FormControl fullWidth>
                                            <InputLabel id="demo-simple-select-label">Order</InputLabel>
                                            <Select

                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                value={order}
                                                label="Order"
                                                onChange={(event) => {
                                                    setOrder(event.target.value)

                                                    const newSearchOrderParams = new URLSearchParams(searchOrderParams)
                                                    newSearchOrderParams.set('order', event.target.value)
                                                    setSearchOrderParams(newSearchOrderParams)
                                                }}
                                            >
                                                <MenuItem value={'asc'}>asc</MenuItem>
                                                <MenuItem value={'desc'}>desc</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} sm={4} md={4}>
                                        <FormControl fullWidth>
                                            <InputLabel id="demo-simple-select-label">Sort option</InputLabel>
                                            <Select

                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                value={sortBy}
                                                label="Sort By"
                                                onChange={(event) => {
                                                    setSortBy(event.target.value)

                                                    const newSearchSortByParams = new URLSearchParams(searchSortByParams)

                                                    newSearchSortByParams.set('sort_by', event.target.value)

                                                    setSortByParams(newSearchSortByParams)
                                                }}
                                            >
                                                <MenuItem value={'title'}>Article Title</MenuItem>
                                                <MenuItem value={'topic'}>Topic</MenuItem>
                                                <MenuItem value={'author'}>Article Author</MenuItem>
                                                <MenuItem value={'article_id'}>Article Id</MenuItem>
                                                <MenuItem value={'created_at'}>Date</MenuItem>
                                                <MenuItem value={'votes'}>Votes</MenuItem>
                                                <MenuItem value={'article_img_url'}>Image</MenuItem>
                                                <MenuItem value={'comment_count'}>Comments</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Grid>

                                    <Grid item xs={6} sm={6} md={6}>
                                        <FormControl fullWidth>
                                            <Button variant="outlined" onClick={handleReset}>Reset</Button>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={6} sm={6} md={6}>
                                        <FormControl fullWidth>
                                            <Button type="submit" variant="contained">
                                                Search</Button>
                                        </FormControl>
                                    </Grid>
                                </Grid>
                            </Box>
                        </form>
                    </Collapse>
                </Box>
            </Box>
            {
                isLoading ? (
                    <Box
                    >
                        <span className="loader"></span>
                    </Box>
                ) : (

                    <Grid
                        container
                        spacing={2}
                        direction="row"
                        justify="flex-start"
                        alignItems="flex-start"
                    >
                        {articles.map((article, index) => (
                            <Grid item xs={12} sm={3} md={4} key={index}
                                sx={{

                                    overflow: 'auto',
                                    mt: 10
                                }}
                            >
                                <Card sx={{
                                    maxWidth: 800,
                                    marginBottom: '1em'
                                }}
                                    className="articleCards"
                                >

                                    <CardContent>
                                        <Chip
                                            icon={<CalendarMonthIcon />} label={format(
                                                parseISO(article.created_at), 'dd/mm/yyyy')} />
                                        <Chip

                                            icon={<PersonIcon />} label={article.author} />
                                    </CardContent>

                                    <CardMedia
                                        sx={{
                                            height: 200,
                                        }}
                                        image={article.article_img_url}
                                        title={article.title}
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h6" component="div" >
                                            <Link
                                                className="articlesTitle"
                                                to={`/Article/${article.article_id}`}
                                            >
                                                {article.title}
                                            </Link>
                                        </Typography>

                                        <Typography className="ArticlesBody"
                                            variant="body2" color="">
                                            {article.body}
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                        <Button disabled size="small">
                                            <CommentIcon /> {article.comment_count}
                                        </Button>
                                        <Button disabled size="small">
                                            <FavoriteIcon /> {article.votes}
                                        </Button>
                                        <Button disabled size="small">
                                            <TagIcon /> {article.topic}
                                        </Button>
                                    </CardActions>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                )
            }
        </Container >
    )
}

export default Articles