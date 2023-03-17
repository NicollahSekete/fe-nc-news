
import { useEffect, useState } from "react"
import { getUsers } from "../api"
import { useParams } from "react-router-dom";
import PersonIcon from '@mui/icons-material/Person';

import { Container, Box, Grid, Card, CardContent, Typography, Chip } from '@mui/material';

const UserProfile = () => {

    const [isLoading, setIsLoading] = useState(true)
    const [allUsers, setAllUsers] = useState('')

    let { username } = useParams();

    useEffect(() => {
        setIsLoading(true)
        getUsers().then((users) => {
            console.log(users)
            setAllUsers(users)
            setIsLoading(false)
        })

    }, [])

    return (
        <Container
            sx={{ justifyContent: "center" }}
        >

            {
                isLoading ?
                    (
                        <Box
                        >
                            <span className="loader"></span>
                        </Box>
                    )
                    :
                    (
                        <section>
                            {allUsers.map((user, index) => (
                                <section>
                                    {user.username === username
                                        ? (
                                            <Grid
                                                container
                                                spacing={0}
                                                direction="column"
                                                alignItems="center"
                                                justify="center"
                                                style={{
                                                    minHeight: '100vh',

                                                }}
                                                key={index}


                                            >


                                                <Grid item xs={12}

                                                >
                                                    <Card sx={{
                                                        maxWidth: 845,
                                                        minWidth: 500,
                                                        marginBottom: '1em',
                                                        marginTop: '1em',
                                                        border: '3px solid #E63946',
                                                        borderRadius: '25px',

                                                    }}>
                                                        <CardContent>
                                                            <Chip icon={<PersonIcon />} label={user.username} />
                                                        </CardContent>

                                                        <img src={user.avatar_url} alt={user.username}></img>
                                                        <CardContent>
                                                            <Typography gutterBottom variant="h5" component="div">
                                                                {user.name}
                                                            </Typography>
                                                            <Typography variant="body2" color="text.secondary">
                                                                {user.username}

                                                            </Typography>
                                                        </CardContent>

                                                    </Card>
                                                </Grid>
                                            </Grid>
                                        )
                                        :
                                        (
                                            <span></span>
                                        )
                                    }

                                </section>





                            ))}
                        </section>

                    )


            }

        </Container >
    )


}

export default UserProfile