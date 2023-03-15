import { Modal, Box, Typography } from '@mui/material';


const DeleteCommentModal = ({handleDeleteClose, openDelete}) => {

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
            open={openDelete}
            onClose={handleDeleteClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Delete Comment
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    Delete confirm will go here
                </Typography>
            </Box>
        </Modal>

    )

}

export default DeleteCommentModal