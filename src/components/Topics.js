import { getTopics } from "../api"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom";

import { Container, Box, Grid, Card, CardContent,  Typography } from '@mui/material';


const Topics = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [topics, setTopics] = useState([])

    useEffect(() => {
        setIsLoading(true)
        getTopics().then((topicData) => {
            setTopics(topicData)
            setIsLoading(false)
        })
    }, [])

    return (
        <Container>
            <Typography variant="h4" component="h4" className="articlesTitle"
                sx={{
                    marginTop: '1em'
                }}>
                Topics
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
                    {topics.map((topic, index) => (
                        <Grid item xs={12} sm={3} md={4} key={index}
                            sx={{


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
                                    <Typography gutterBottom variant="h6" component="div" >
                                        <Link
                                            className="topicsTitle"
                                            to={`/Articles?topic=${topic.slug}`}
                                        >
                                            {topic.slug}
                                        </Link>

                                    </Typography>
                                    <Typography className="topicsBody"
                                        variant="body2" color="">
                                        {topic.description}
                                    </Typography>
                                </CardContent>

                            </Card>
                        </Grid>
                    ))}
                </Grid>
            )
            }
        </Container >
    )
}

export default Topics