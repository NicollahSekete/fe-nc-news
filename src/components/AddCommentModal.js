import { Link, Modal, Tooltip, IconButton, Container, Box, Grid, Card, CardActions, CardContent, CardMedia, Button, Typography, Chip } from '@mui/material';


const AddCommentModal = ({ handleAddClose, openAdd, addCommentArticleId }) => {
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
    return (
        <Modal
            open={openAdd}
            onClose={handleAddClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Add Comment for article {addCommentArticleId}
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    Add form will go here
                </Typography>
            </Box>
        </Modal>


    )

}

export default AddCommentModal