import { Modal, IconButton, Box, Grid, FormControl, TextField, Stack } from '@mui/material';
import { useState, useContext } from "react"
import { UserContext } from '../contexts/User';
import CancelIcon from '@mui/icons-material/Cancel';
import SendIcon from '@mui/icons-material/Send';
import { postComments } from "../api"

const AddCommentModal = ({ handleAddClose, openAdd, addCommentArticleId }) => {

    const { user } = useContext(UserContext)

    const [comment, setComment] = useState(null)

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    const submitHandler = (event) => {
        event.preventDefault()
        
        if (comment) {
            postComments(addCommentArticleId, user.username, comment).then((comment) => {
                console.log(comment)
            }).catch((error) => {
                console.log(error)
            })
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
                <h3>Add a comment</h3>
                <form className='CommentForm' onSubmit={submitHandler}>
                    <Box>
                        <Grid container spacing={{ xs: 12, md: 12 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                            <Grid item xs={12} sm={12} md={12}>
                                <FormControl>
                                    <TextField id="outlined-basic" label="Username" variant="outlined" disabled defaultValue={user.username} />
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={12} md={12}>
                                <FormControl>
                                    <TextField
                                        required
                                        id="outlined-multiline-static"
                                        label="Comment"
                                        multiline
                                        rows={4}
                                        defaultValue={comment}
                                        onChange={(event) => setComment(event.target.value)}
                                    />
                                </FormControl>
                            </Grid>

                        </Grid>
                        <Stack direction="row" spacing={2}>
                            <IconButton variant="outlined" >
                                <CancelIcon />  Delete
                            </IconButton>
                            <IconButton variant="contained" type='submit'>
                                <SendIcon /> Send
                            </IconButton>
                        </Stack>
                    </Box>
                </form>
            </Box>
        </Modal>


    )

}

export default AddCommentModal