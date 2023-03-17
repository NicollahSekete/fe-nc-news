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
    const [topic, setTopic] = useState('');
    const [sortBy, setSortBy] = useState('');
    const [checked, setChecked] = useState(true);
    const [height, setHeight] = useState('300');
    const [searchParams, setSearchParams] = useSearchParams();


    const sortTopic = searchParams.get('topic')
    const sortOrder = searchParams.get('order')
    const sortSortBy = searchParams.get('sort_by')

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

    }, [sortTopic, sortOrder, sortSortBy])

    const submitHandler = (event) => {
        event.preventDefault();

        const newSearchParams = new URLSearchParams(searchParams)
        newSearchParams.set('topic', topic)
        newSearchParams.set('order', order)
        newSearchParams.set('sort_by', sortBy)
        setSearchParams(newSearchParams)
        setChecked((prev) => !prev);
    }

    const handleReset = () => {
        setTopic('')
        setSortBy('')
        setOrder('')
        const newSearchParams = new URLSearchParams(searchParams)
        newSearchParams.delete('topic')
        newSearchParams.delete('order')
        newSearchParams.delete('sort_by')
        setSearchParams(newSearchParams)
    }

    return (
        <Container>
            <Typography variant="h4" component="h4" className="articlesTitle"
                sx={{
                    marginTop: '1em'
                }}>
                Articles
            </Typography>
            <Box sx={{ height: height }} className="searchBox">
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
                                border: '3px solid #E63946',
                                borderRadius: '25px',

                            }} >
                                <Grid container spacing={{ xs: 12, md: 12 }} columns={{ xs: 12, sm: 12, md: 12 }}>
                                    <Grid item xs={12} sm={12} md={4}>
                                        <FormControl fullWidth>
                                            <InputLabel id="demo-simple-select-label">Topics</InputLabel>
                                            <Select

                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                value={topic}
                                                label="Topic"
                                                onChange={(event) => {
                                                    setTopic(event.target.value)
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
                                        <Link className='articlesTitle' to={`/UserProfile/${article.author}`}>
                                            <Chip icon={<PersonIcon />} label={article.author} />
                                        </Link>

                                    </CardContent>

                                    <CardMedia
                                        sx={{
                                            height: 200,
                                        }}
                                        image={article.article_img_url}
                                        title={article.title}
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h6" component="div" className="ArticlesBody" >
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