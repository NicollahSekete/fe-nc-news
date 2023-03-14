import { getArticles } from "../api"
import { useEffect, useState } from "react"
import PersonIcon from '@mui/icons-material/Person';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import CommentIcon from '@mui/icons-material/Comment';
import TagIcon from '@mui/icons-material/Tag';
import { Link } from "react-router-dom";

import { Container, Box, Grid, Card, CardActions, CardContent, CardMedia, Button, Typography, Chip } from '@mui/material';


const Articles = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [articles, setArticles] = useState([])


    useEffect(() => {
        setIsLoading(true)
        getArticles().then((articleData) => {
            setArticles(articleData)
            setIsLoading(false)
        })
    }, [])

    return (
        <Container>
            {isLoading ? (
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
                                        icon={<CalendarMonthIcon />} label={article.created_at} />
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
                                    <Typography gutterBottom variant="h6" component="div">
                                        {article.title}
                                    </Typography>
                                    <Typography className="ArticlesBody"
                                        variant="body2" color="">
                                        {article.body}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button size="small"
                                        variant="outlined"

                                    >
                                        <Link to={`/Article/${article.article_id}`}

                                        >Read More</Link>
                                    </Button>

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