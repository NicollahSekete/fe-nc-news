import { Modal, Box, Typography, Alert, Button, Grid, FormControl, TextField } from '@mui/material';
import { useState } from "react"

import { deleteComment } from "../api"

const DeleteCommentModal = ({ handleDeleteClose, openDelete, bodyForDelete, commentIdForDelete, setRefreshCommentsOnDelete, loadingButtonDelete, setLoadingButtonDelete }) => {

    const [success, setSuccess] = useState(false)
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('')


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
        setLoadingButtonDelete(true)
        
        deleteComment(commentIdForDelete).then(() => {
            setSuccess(true)
            setRefreshCommentsOnDelete(true)
            setLoadingButtonDelete(true)
        }).catch((error) => {
            setErrorMessage('Something went wrong, try again later')
            setError(true)
            console.log(error)
            setLoadingButtonDelete(false)
        })
    }


    return (
        <Modal
            open={openDelete}
            onClose={handleDeleteClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                {success && <Alert severity="success" onClose={() => setSuccess(param => !param)}>Comment deleted!</Alert>}
                {error &&
                    <Alert severity="error" onClose={() => setError(param => !param)}><strong>error!</strong> {errorMessage} </Alert>
                }
                <h3>Delete comment</h3>
                <form className='CommentForm' onSubmit={submitHandler}>
                    <Box>
                        <Grid container spacing={{ xs: 12, md: 12 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                            <Grid item xs={12} sm={12} md={12}>
                                <Typography variant="h6" component="h6">Are you sure you want to delete comment:</Typography>
                                <p>{bodyForDelete}</p>
                            </Grid>

                            <Grid item xs={12} sm={12} md={12} >
                                <FormControl>
                                    <Button variant="contained" type='submit' disabled={loadingButtonDelete}
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