
import { useEffect, useState, useContext } from "react"
import { UserContext } from '../contexts/User';
import { useParams } from "react-router-dom";
import { Tooltip, IconButton, Container, Box, Grid, Card, CardActions, CardContent, Button, Typography, Chip } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import AddCommentIcon from '@mui/icons-material/AddComment';
import AddCommentModal from './AddCommentModal';
import DeleteCommentModal from './DeleteCommentModal';
import { getComments } from "../api"
import { Link } from "react-router-dom";

import { format, parseISO } from 'date-fns'

const Comments = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [comments, setComments] = useState([])
    const [openDelete, setOpenDelete] = useState(false);
    const [openAdd, setOpenAdd] = useState(false);
    const [addCommentArticleId, setAddCommentArticleId] = useState(null)
    const [refreshCommentsOnAdd, setRefreshCommentsOnAdd] = useState(false);
    const [commentIdForDelete, setCommentIdForDelete] = useState('')
    const [bodyForDelete, setBodyForDelete] = useState('')
    const [refreshCommentsOnDelete, setRefreshCommentsOnDelete] = useState(false);

    const [loadingButtonAdd, setLoadingButtonAdd] = useState(false);
    const [loadingButtonDelete, setLoadingButtonDelete] = useState(false);

    const { user } = useContext(UserContext)

    const handleDeleteOpen = (comment_id, body) => {
        setBodyForDelete(body)
        setCommentIdForDelete(comment_id)
        setOpenDelete(true);
        setLoadingButtonDelete(false)
    }

    const handleDeleteClose = () => {
        setLoadingButtonDelete(false)
        setOpenDelete(false);
    }

    const handleAddClose = () => {
        setLoadingButtonAdd(false)
        setOpenAdd(false);
    }

    const handleAddOpen = (id) => {
        setLoadingButtonAdd(false)
        setAddCommentArticleId(id)
        setOpenAdd(true)
    }

    let { article_id } = useParams();

    useEffect(() => {
        setIsLoading(true)
        getComments(article_id).then((data) => {
            
            setComments(data)
            setIsLoading(false)
        })
    }, [article_id, refreshCommentsOnAdd, refreshCommentsOnDelete])

   


    return (
        <Container >
            <Typography variant="h4" component="h4" className="articlesTitle"
                sx={{
                    marginTop: '1em'
                }}>
                Comments
            </Typography>
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
                    <Grid
                        item xs={12} sm={12} md={12}
                        sx={{
                            marginTop: '2em'
                        }}
                    >
                        <Tooltip title="Add Comment">
                            <IconButton color="primary" aria-label="add a new comment" fontSize="large"
                                onClick={() => handleAddOpen(article_id)}
                            >
                                <AddCommentIcon fontSize="large" />
                            </IconButton>
                        </Tooltip>
                    </Grid>
                    {comments.map((comment, index) => (

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
                                            parseISO(comment.created_at), 'dd/mm/yyyy')} />


                                    <Link className='articlesTitle' to={`/UserProfile/${comment.author}`}>
                                        <Chip icon={<PersonIcon />} label={comment.author} />
                                    </Link>
                                </CardContent>

                                <CardContent>
                                    <Typography gutterBottom variant="h6" component="div">
                                        {comment.title}
                                    </Typography>
                                    <Typography className="commentsBody"
                                        variant="body2" color="">
                                        {comment.body}

                                    </Typography>
                                </CardContent>
                                <CardActions>

                                    <Button disabled size="small">
                                        <FavoriteIcon /> {comment.votes}
                                    </Button>

                                    {user.username !== comment.author ? (<DeleteForeverIcon disabled />)
                                        :
                                        (<Tooltip title="delete Comment">
                                            <IconButton color="primary" aria-label="delete comment"

                                                onClick={() => { handleDeleteOpen(comment.comment_id, comment.body) }}
                                            >
                                                <DeleteForeverIcon color="error" />
                                            </IconButton>
                                        </Tooltip>
                                        )}
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            )
            }
            <DeleteCommentModal handleDeleteClose={handleDeleteClose} openDelete={openDelete} bodyForDelete={bodyForDelete} commentIdForDelete={commentIdForDelete} setRefreshCommentsOnDelete={setRefreshCommentsOnDelete}
                setLoadingButtonDelete={setLoadingButtonDelete}
                loadingButtonDelete={loadingButtonDelete}
                setComments={setComments}
                comments={comments}
            />


            <AddCommentModal addCommentArticleId={addCommentArticleId} handleAddClose={handleAddClose} openAdd={openAdd} setRefreshCommentsOnAdd={setRefreshCommentsOnAdd} setLoadingButtonAdd={setLoadingButtonAdd} loadingButtonAdd={loadingButtonAdd} />
        </Container >
    )

}

export default Comments