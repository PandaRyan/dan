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

interface Subsidy {
    subsidy_name: string;
    description: string;
}

interface ChatMessage {
    sender: 'user' | 'zai' | 'error';
    text?: string;                                  //user message
    options?: responseList[];               //if its ai giving options to user
}

export const PromptPage = () => {
    const { authUser } = useAuth();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [chatHistory, setChatHistory] = useState<ChatMessage[]>([{
        sender: 'zai',
        text: "Hello! Ask me anything related to Malaysian subsidies!"
    }]);          //holding conversations

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
                birthYear: detailsdata.birthyear,
                state: detailsdata.state,
                incomeCategory: detailsdata.incomeCategory
            }

            //create message form for chat
            const msgform = {
                usermsg: usermsg,
                userdetails: fetchedDetails
            }
            
            setUsermsg('');

            //fetch chat response
            const response = await fetch('/api/chat/' + category, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(msgform)
            });

            const data = await response.json();


            setIsLoading(false);

            if (response.ok && data.returnResponse) { 
                let parsedResponse = data.returnResponse;

                if (typeof parsedResponse === 'string') {
                    try {
                        const cleanString = parsedResponse.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
                        parsedResponse = JSON.parse(cleanString);
                    } catch (parseError) {
                        console.error("Failed to parse AI string:"+ parseError, parsedResponse);
                        setChatHistory((prev) => [...prev, { sender: 'error', text: "AI returned an invalid data format. Please try again." }]);
                        return;
                    }
                }

                if (!parsedResponse?.main_response) {
                    console.error("Parsed response is missing main_response:", parsedResponse);
                    setChatHistory((prev) => [...prev, { sender: 'error', text: "AI response was missing the required data. Please try again." }]);
                    return; // Stop execution
                }

                const newOptions: responseList[] = [
                    {
                        title: parsedResponse.main_response.subsidy_name,
                        description: parsedResponse.main_response.description,
                        isPrimary: true
                    }
                ];

                const supp = parsedResponse.supplementary_response;
                
                if (supp && supp.available === "true") {
                    if (Array.isArray(supp.subsidies)) {
                        supp.subsidies.forEach((sub: Subsidy) => {
                            newOptions.push({
                                title: sub.subsidy_name,
                                description: sub.description,
                                isPrimary: false
                            });
                        });
                    } 
                    else if (supp.subsidy_name) {
                        newOptions.push({
                            title: supp.subsidy_name,
                        description: supp.description,
                            isPrimary: false
                        });
                    }
                }

                setChatHistory((prev) => [
                    ...prev, 
                    { sender: 'zai', options: newOptions }
                ]);
            } else {
                setChatHistory((prev) => [...prev, { sender: 'error', text: "Server returned an error. Please try again." }]);
            }

        } catch (err) {
            setUsermsg(usermsg);
            setIsLoading(false);
            console.error('Error:', err);
            setChatHistory((prev) => [...prev, { sender: 'error', text: "Error generating response. Please try again." }]);
            return;
        }
    }

    useEffect(() => {
        if (!authUser) {
            navigate('/signin')
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