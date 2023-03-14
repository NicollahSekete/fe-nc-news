import { useEffect, useState } from "react"
import { Container, Box, Grid, Card, CardActions, CardContent, CardMedia, Button, Typography, Chip } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import CommentIcon from '@mui/icons-material/Comment';
import TagIcon from '@mui/icons-material/Tag';
import { useParams } from "react-router-dom";
import { getArticle } from "../api"
import { format, parseISO } from 'date-fns'

const Article = (articleId) => {

    const [article, setArticle] = useState({})
    const [isLoading, setIsLoading] = useState(true)
    let { article_id } = useParams();

    useEffect(() => {
        setIsLoading(true)
        getArticle(article_id).then((article) => {
            setArticle(article)
            setIsLoading(false)
        })

    }, [articleId])

    return (
        <Container
            sx={{ justifyContent: "center" }}
        >

            {isLoading ? (
                <Box
                >
                    <span className="loader"></span>
                </Box>
            ) : (

                <Grid
                    container
                    spacing={0}
                    direction="column"
                    alignItems="center"
                    justify="center"
                    style={{ minHeight: '100vh' }}
                >

                    <Grid item xs={3}>
                        <Card sx={{
                            maxWidth: 845,
                            marginBottom: '1em',
                            marginTop: '1em'

                        }}>
                            <CardContent>
                                <Chip
                                    icon={<CalendarMonthIcon />} label={format(
                                        parseISO(article.created_at), 'dd/mm/yyyy HH:mm:ss')} />
                                <Chip

                                    icon={<PersonIcon />} label={article.author} />
                            </CardContent>
                            <CardMedia
                                sx={{ height: '50vh' }}
                                image={article.article_img_url}
                                title={article.title}
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    {article.title}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {article.body}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small">
                                    <CommentIcon /> {article.comment_count}
                                </Button>
                                <Button size="small">
                                    <FavoriteIcon /> {article.votes}
                                </Button>
                                <Button size="small">
                                    <TagIcon /> {article.topic}
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                </Grid>




            )}


        </Container >
    )
}

export default Article