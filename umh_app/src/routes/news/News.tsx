import React from 'react';
import { useState, useEffect } from 'react';
import { Box, Typography, Container, Grid, Card, CardMedia, CardContent, Link } from '@mui/material';

interface NewsItem {
    article_id: string;
    title: string;
    image_url: string;
    pubDate: string;
    link: string;
}

//need replace with API fetch
/*const mockNews = [
    {
        id: '001',
        title: 'Roblox Bedwars has won the WORSE game award 2026',
        imageUrl: 'Ryan.png',
        publishDate: 'April 19, 2026',
        link: ''
    },
    {
        id: '002',
        title: 'Roblox Bedwars has won the WORSE game of ALL TIME!',
        imageUrl: 'Jayde.png',
        publishDate: 'April 15, 2026',
        link: ''
    },
    {
        id: '001',
        title: 'Roblox Bedwars has won the WORSE game award 2026',
        imageUrl: 'Ryan.png',
        publishDate: 'April 19, 2026',
        link: ''
    },
    {
        id: '002',
        title: 'Roblox Bedwars has won the WORSE game of ALL TIME!',
        imageUrl: 'Jayde.png',
        publishDate: 'April 15, 2026',
        link: ''
    },
    {
        id: '001',
        title: 'Roblox Bedwars has won the WORSE game award 2026',
        imageUrl: 'Ryan.png',
        publishDate: 'April 19, 2026',
        link: ''
    },
    {
        id: '002',
        title: 'Roblox Bedwars has won the WORSE game of ALL TIME!',
        imageUrl: 'Jayde.png',
        publishDate: 'April 15, 2026',
        link: ''
    },

]; */

export const NewsPage: React.FC = () => {
    const [newsList, setNewsList] = useState<NewsItem[]>([]);       //storage for the news
    const [isLoading, setIsLoading] = useState(true);       //a switch to prevent crash

    useEffect(() => {       //use when page loads
        const fetchNews = async () => {     //fetch when page loads
            try {
                const response = await fetch('');       //wait until backend call
                const data = await response.json();

                if (data.status === "success" && data.results) {
                    setNewsList(data.results);
                } else {
                    console.error("API return success but no results array.");
                }
            } catch (error) {
                console.error("Error fetching news:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchNews();
    }, []);     //runs only once

    return (
        <Box sx={{ backgroundColor: '#F9F7F5', minHeight: '100vh', pt: 12, pb: 6 }}>
            <Container maxWidth="md">

                <Box sx={{ mb: 4, borderLeft: '4px solid #74924A', pl: 2 }}>
                    <Typography variant="h4" sx={{ color: '#6B5441', fontWeight: 'bold' }}>
                        News & Updates
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#C5AA8E' }}>
                        Everything happening at Bukit
                    </Typography>
                </Box>

                {isLoading ? (
                    <Typography sx={{ color: '#6B5441' }}>Loading the latest news...</Typography>       //loading screen
                ) : (
                    <Grid container spacing={4}>

                        {newsList.map((news) => (
                            <Grid size={{ xs: 12, md: 6 }} key={news.article_id}>
                                <Card sx={{
                                    height: '100%',
                                    borderRadius: '16px',
                                    boxShadow: '0px 4px 20px rgba(0,0,0,0.05)',
                                    border: '1px solid rgba(197, 170, 142, 0.2)',
                                    display: 'flex',
                                    flexDirection: 'column'     //so the card stretch properly
                                }}>
                                    <CardMedia
                                        component="img"
                                        height="180"
                                        image={news.image_url || ''}        //image
                                        alt={news.title}
                                    />

                                    <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                                        {/*push date to the right*/}
                                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 1 }}>
                                            <Typography variant="caption" sx={{ color: '#C5AA8E' }}>
                                                {/*only show the first string of the date*/}
                                                {news.pubDate.split(' ')[0]}
                                            </Typography>
                                        </Box>

                                        <Typography variant="h6" sx={{ color: '#6B5441', fontWeight: 'bold', mb: 1 }}>
                                            {news.title}
                                        </Typography>

                                        <Link
                                            href={news.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            sx={{ color: '#74924A', fontWeight: 'bold', mt: 'auto', textDecoration: 'none' }}
                                        >
                                            Read More ➔
                                        </Link>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                )}
            </Container>
        </Box>
    );
};