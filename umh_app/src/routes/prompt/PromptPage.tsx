import React, { useState, useRef, useEffect } from 'react';
import { Box, Typography, Paper } from '@mui/material';
import { PromptBar } from '../../components/PromptBar';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../components/context/AuthContext';

interface responseList {        //defining
    title: string;
    description: string;
    isPrimary: boolean;
}

interface ChatMessage {
    sender: 'user' | 'zai' | 'error';
    text?: string;                                  //user message
    options?: responseList[];               //if its ai giving options to user
}

const initialChatHistory: ChatMessage[] = [
    {
        sender: 'user',
        text: 'I am a B40 student living in Kuala Lumpur. What financial aids are available to me?'
    },
    {
        sender: 'zai',
        options: [
            {
                title: 'MyKasih - Option 1',
                description: 'MyKasih can be used to apply for targeted subsidies. This option focuses on rapid deployment of funds directly to the linked MyKad accounts for essential groceries.',
                isPrimary: true,
            },
            {
                title: 'BUDI Madani - Option 2',
                description: 'BUDI Madani provides monthly cash assistance for agricultural and commodity smallholders.',
                isPrimary: false,
            },
            {
                title: 'My50 - Option 3',
                description: 'The My50 Unlimited Travel Pass offers 30 days of unlimited rides on Rapid KL LRT, MRT, Monorail, BRT, and bus services in Klang Valley.',
                isPrimary: false,
            }
        ]
    },
    {
        sender: 'user',
        text: 'testing error'
    },
    {
        sender: 'error',
        text: "Error generating response. Please try again."
    }
];

export const PromptPage = () => {
    const { authUser } = useAuth();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);          //holding conversations

    const messagesEndRef = useRef<HTMLDivElement>(null);                //for the scrolling
    const [usermsg, setUsermsg] = useState('');

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });         //the scrolling thing for each boxes
    };

    const { category } = useParams();

    const handleSubmit = async () => {

        try {
            setChatHistory((prev) => [...prev, { sender: 'user', text: usermsg }]);       //add user message to chat history
            setIsLoading(true);

            //fetch user details
            const detailsresponse = await fetch('/api/auth/getUserDetails', {
                method: 'GET',
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `${authUser?.token}`
                },
            });

            const detailsdata = await detailsresponse.json();

            const fetchedDetails = {
                birthYear: detailsdata.birthYear,
                state: detailsdata.state,
                incomeCategory: detailsdata.incomeCategory
            }

            //create message form for chat
            const msgform = {
                usermsg: usermsg,
                userdetails: fetchedDetails
            }

            //fetch chat response
            const response = await fetch('/api/chat/' + category, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(msgform)
            });

            const data = await response.json();
            if (data.status===201) {
                setChatHistory((prev) => [...prev, { sender: 'zai', title: data.main_response.subsidy_name, text: data.main_response.description, isPrimary: true }]); 
            }

            setIsLoading(false);
            if (data.status===201) {
                setChatHistory((prev) => [...prev, { sender: 'user', text: usermsg }]);
            }

            setUsermsg('');
        } catch (err) {
            setIsLoading(false);
            setChatHistory((prev) => [...prev, { sender: 'error', text: "Error generating response. Please try again." }]);
            return;
        }
    }

    useEffect(() => {
        if (!authUser) {
            navigate('/')
        }
        scrollToBottom();           //use if the chat changes
    }, [chatHistory]);

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            height: '100vh',
            backgroundColor: '#F2F4F7'
        }}>
            {/* the scrolling chat box */}
            <Box sx={{
                flexGrow: 1,
                overflowY: 'auto',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                pt: 4,
                pb: '25%',                  //so it shows everything
                gap: 4                                          //the gap for different convo
            }}>

                {/* for the entire convo */}
                {chatHistory.map((message) => (
                    <Box sx={{ width: '670px' }}>

                        {/* check if user sent the message*/}
                        {message.sender === 'user' && (
                            <Box sx={{
                                display: 'flex',
                                justifyContent: 'flex-end',     //right side of screen
                                mb: 2
                            }}>
                                <Paper sx={{
                                    p: 2,
                                    backgroundColor: '#BDA891',
                                    color: '#FFFFFF',
                                    borderRadius: 2,
                                    maxWidth: '80%'
                                }}>
                                    <Typography variant="body1">{message.text}</Typography>
                                </Paper>
                            </Box>
                        )}

                        {/* check if the bot sent the messages */}
                        {message.sender === 'zai' && message.options && (
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                                {message.options.map((option) => (
                                    <Paper
                                        elevation={option.isPrimary ? 4 : 1}        //darker if first
                                        sx={{
                                            p: 3,
                                            borderRadius: 2,
                                            backgroundColor: option.isPrimary ? '#698B4B' : '#FFFFFF',
                                            color: option.isPrimary ? '#FFFFFF' : '#6C513C',
                                            border: option.isPrimary ? 'none' : '1px solid #BDA891',
                                            transition: 'transform 0.2s ease-in-out',
                                            cursor: 'pointer',
                                            '&:hover': {
                                                transform: 'translateY(-2px)',
                                                boxShadow: 3
                                            }
                                        }}
                                    >
                                        <Typography                 //the title
                                            variant="h6"
                                            gutterBottom
                                            sx={{
                                                fontWeight: 'bold'
                                            }}
                                            style={{
                                                textDecoration: option.isPrimary ? 'underline' : 'none',
                                                textUnderlineOffset: '4px'
                                            } as React.CSSProperties}
                                        >
                                            {option.title}
                                        </Typography>
                                        <Typography variant="body1">
                                            {option.description}
                                        </Typography>
                                    </Paper>
                                ))}
                            </Box>
                        )}

                        {message.sender === 'error' && (
                            <Box sx={{ display: 'flex' }}>
                                <Paper
                                    sx={{
                                        p: 1.5,
                                        borderRadius: 2,
                                        backgroundColor: '#c98f8f',
                                        color: '#000000',
                                        border: '1px solid #cc6262',
                                        transition: 'transform 0.2s ease-in-out',
                                        '&:hover': {
                                            transform: 'translateY(-2px)',
                                            boxShadow: 3
                                        }
                                    }}
                                >
                                    <Typography variant="body1">
                                        {message.text}
                                    </Typography>
                                </Paper>
                            </Box>
                        )}
                    </Box>
                ))}

                {isLoading && (
                    <Box sx={{ justifyContent: "flex-end", flexDirection: 'column', gap: 2, width: '670px' }}>
                        <Paper
                            sx={{
                                p: 1.5,
                                borderRadius: 2,
                                backgroundColor: '#698B4B',
                                color: '#000000',
                                border: '1px solid #BDA891',
                                transition: 'transform 0.2s ease-in-out',
                                '&:hover': {
                                    transform: 'translateY(-2px)',
                                    boxShadow: 3
                                }
                            }}
                        >
                            <Typography variant="body1">
                                Loading...
                            </Typography>
                        </Paper>
                    </Box>
                )}

                <div ref={messagesEndRef} />
            </Box>

            <PromptBar
                value={usermsg}
                onChange={setUsermsg}
                onSend={handleSubmit}
            />

        </Box>
    );
};

export default PromptPage;