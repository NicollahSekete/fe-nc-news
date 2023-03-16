import { Modal, Box, Typography,  Alert, Button, Grid, FormControl, TextField } from '@mui/material';
import { useState, useContext } from "react"
import { UserContext } from '../contexts/User';
import { deleteComment } from "../api"

const DeleteCommentModal = ({ handleDeleteClose, openDelete, bodyForDelete, commentIdForDelete }) => {

    const { user } = useContext(UserContext)

    const [success, setSuccess] = useState(false)
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('')
    const [loadingButton, setLoadingButton] = useState(false);

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 500,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    const submitHandler = (event) => {
        event.preventDefault()
        // setLoadingButton(true)
        // if (comment) {
        //     postComments(addCommentArticleId, user.username, comment).then((comment) => {
        //         setSuccess(true)
        //         setComment('')
        //         setRefreshCommentsOnAdd(true)
        //         setLoadingButton(false)
        //     }).catch((error) => {
        //         setErrorMessage('Something went wrong, try again later')
        //         setError(true)
        //         setLoadingButton(false)
        //     })
        // } else {
        //     setErrorMessage('Comment is required')
        //     setError(true)
        //     setLoadingButton(false)
        // }
    }


    return (
        <Modal
            open={openDelete}
            onClose={handleDeleteClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                {success && <Alert severity="success" onClose={() => setSuccess(param => !param)}>Comment posted!</Alert>}
                {error &&
                    <Alert severity="error" onClose={() => setError(param => !param)}><strong>error!</strong> {errorMessage} </Alert>
                }
                <h3>Delete comment</h3>
                <form className='CommentForm' onSubmit={submitHandler}>
                    <Box>
                        <Grid container spacing={{ xs: 12, md: 12 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                            <Grid item xs={12} sm={12} md={12}>
                               <Typography variant="h6" component="h6">Are you sure you want to delete comment:</Typography>
                               <Typography variant="subtitle2" component="subtitle2">{bodyForDelete}</Typography>

                            </Grid>
                            
                            <Grid item xs={12} sm={12} md={12} >
                                <FormControl>
                                    <Button variant="contained" type='submit' disabled={loadingButton}
                                    color="error"
                                    >
                                         Delete
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

export default DeleteCommentModal