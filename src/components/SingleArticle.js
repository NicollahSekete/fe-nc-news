import { useEffect, useState } from "react"
import { Alert, IconButton, Tooltip, Container, Box, Grid, Card, CardActions, CardContent, CardMedia, Button, Typography, Chip } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import CommentIcon from '@mui/icons-material/Comment';
import TagIcon from '@mui/icons-material/Tag';
import { useParams } from "react-router-dom";
import { getArticleById, patchArticle } from "../api"
import { format, parseISO } from 'date-fns'
import { Link } from "react-router-dom";

const SingleArticle = () => {

    const [article, setArticle] = useState({})
    const [isLoading, setIsLoading] = useState(true)
    const [userVote, setUserVote] = useState(0)
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState(false);
    const [errorFetch, setErrorFetch] = useState(false);
    const [errorMessage, setErrorMessage] = useState('')

    let { article_id } = useParams();

    useEffect(() => {
        setIsLoading(true)
        getArticleById(article_id).then((article) => {
            setArticle(article)
            setIsLoading(false)
        }).catch((error) => {
            setErrorFetch(true)
        })

    }, [article_id])


    const upVote = () => {
        setUserVote(1)
        patchArticle(article_id, 1).then((article) => {
            setSuccess(true)
        }).catch((error) => {
            setErrorMessage('Sorry there was issue when attempting to vote, please try again later.')
            setError(true)
        })
    }


    return (
        <Container
            sx={{ justifyContent: "center" }}
        >
            {success && <Alert severity="success" onClose={() => setSuccess(param => !param)}>Thanks for your vote!</Alert>}
            {error &&
                <Alert severity="error" onClose={() => setError(param => !param)}>{errorMessage}
                </Alert>
            }
            {errorFetch &&
                <Alert severity="error" onClose={() => setError(param => !param)}>Sorry we could not find what you were looking for. Head back to main <Link to="/Articles">Articles</Link>
                </Alert>
            }




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
                                <Link className='articlesTitle' to={`/UserProfile/${article.author}`}>
                                    <Chip icon={<PersonIcon />} label={article.author} />
                                </Link>

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
                                <Tooltip title="view Comments">
                                    <IconButton color="primary" aria-label="view comments">
                                        <Link
                                            className="articlesTitle"
                                            to={`/Comments/${article.article_id}`}
                                        >
                                            <CommentIcon /> {article.comment_count}
                                        </Link>
                                    </IconButton>
                                </Tooltip>
                                <Button size="small" onClick={upVote} disabled={userVote !== 0}>
                                    <FavoriteIcon /> {article.votes + userVote}
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

export default SingleArticle