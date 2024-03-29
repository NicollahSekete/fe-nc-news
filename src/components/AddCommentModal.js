import { Modal, Alert, Button, Box, Grid, FormControl, TextField } from '@mui/material';
import { useState, useContext } from "react"
import { UserContext } from '../contexts/User';
import SendIcon from '@mui/icons-material/Send';
import { postComments } from "../api"

const AddCommentModal = ({ handleAddClose, openAdd, addCommentArticleId, setRefreshCommentsOnAdd, setLoadingButtonAdd, loadingButtonAdd }) => {

    const { user } = useContext(UserContext)

    const [comment, setComment] = useState('')
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('')
    

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '3px solid #E63946',
        borderRadius:'25px',
        boxShadow: 24,
        p: 4,
    };

    const submitHandler = (event) => {
        event.preventDefault()
        setLoadingButtonAdd(true)
        if (comment) {
            postComments(addCommentArticleId, user.username, comment).then((comment) => {
                setSuccess(true)
                setComment('')
                setRefreshCommentsOnAdd(true)
                setLoadingButtonAdd(false)
            }).catch((error) => {
                setErrorMessage('Something went wrong, try again later')
                setError(true)
                console.log(error)
                setLoadingButtonAdd(false)
            })
        } else {
            setErrorMessage('Comment is required')
            setError(true)
            setLoadingButtonAdd(false)
        }
    }

    return (
        <Modal
            open={openAdd}
            onClose={handleAddClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                {success  && <Alert severity="success" onClose={() => setSuccess(param => !param)}>Comment posted!</Alert>}
                {error &&
                    <Alert severity="error" onClose={() => setError(param => !param)}><strong>error!</strong> {errorMessage} </Alert>
                }
                <h3>Add a comment</h3>
                <form className='CommentForm' onSubmit={submitHandler}>
                    <Box>
                        <Grid container spacing={{ xs: 12, md: 12 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                            <Grid item xs={6} sm={6} md={6}>
                                <FormControl>
                                    <TextField id="outlined-basic" label="Username" variant="outlined" disabled defaultValue={user.username} />
                                </FormControl>
                            </Grid>
                            <Grid item xs={6} sm={6} md={6}>
                                <FormControl>
                                    <TextField
                                        error={error === true}
                                        id="outlined-multiline-static"
                                        label="Comment"
                                        multiline
                                        maxRows={4}
                                        value={comment}
                                        onChange={(event) => setComment(event.target.value)}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={12} md={12} >
                                <FormControl>
                                    <Button variant="contained" type='submit' disabled={loadingButtonAdd}>
                                        <SendIcon /> Send
                                    </Button>
                                </FormControl>
                            </Grid>
                        </Grid>
                    </Box>
                </form>
            </Box>
        </Modal>
    )
}

export default AddCommentModal