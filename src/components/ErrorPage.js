import { Box, Button, Container, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import { Link } from "react-router-dom"

const ErrorPage = () => {
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh'
            }}
        >
            <Container maxWidth="md">
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography variant="h1">
                            404
                        </Typography>
                        <Typography variant="h6">
                            The page you’re looking for doesn’t exist.
                        </Typography>
                        <Button variant="contained"><Link className="" to='/'>Back Home</Link></Button>
                    </Grid>
                    
                </Grid>
            </Container>
        </Box>
    )

}

export default ErrorPage
