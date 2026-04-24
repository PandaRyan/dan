import React, { useState, useRef, useEffect } from 'react';
import { Box, Typography, Paper } from '@mui/material';
import { PromptBar } from '../../components/PromptBar';

interface AiResponseOption {        //defining
    id: number;
    title: string;
    description: string;
    isPrimary: boolean;
}

interface ChatMessage {
    id: number;
    sender: 'user' | 'bot';
    text?: string;                                  //user message
    options?: AiResponseOption[];               //if its ai giving options to user
}

const initialChatHistory: ChatMessage[] = [
    {
        id: 1,
        sender: 'user',
        text: 'I am a B40 student living in Kuala Lumpur. What financial aids are available to me?'
    },
    {
        id: 2,
        sender: 'bot',
        options: [
            {
                id: 1,
                title: 'MyKasih - Option 1',
                description: 'MyKasih can be used to apply for targeted subsidies. This option focuses on rapid deployment of funds directly to the linked MyKad accounts for essential groceries.',
                isPrimary: true,
            },
            {
                id: 2,
                title: 'BUDI Madani - Option 2',
                description: 'BUDI Madani provides monthly cash assistance for agricultural and commodity smallholders.',
                isPrimary: false,
            },
            {
                id: 3,
                title: 'My50 - Option 3',
                description: 'The My50 Unlimited Travel Pass offers 30 days of unlimited rides on Rapid KL LRT, MRT, Monorail, BRT, and bus services in Klang Valley.',
                isPrimary: false,
            }
        ]
    }
];

export const PromptPage = () => {

    const [chatHistory, setChatHistory] = useState<ChatMessage[]>(initialChatHistory);          //holding conversations

    const messagesEndRef = useRef<HTMLDivElement>(null);                //for the scrolling

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });         //the scrolling thing for each boxes
    };

    useEffect(() => {
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
                    <Box key={message.id} sx={{ width: '700px' }}>

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
                        {message.sender === 'bot' && message.options && (                       //make sure the message was sent by Z
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                                {message.options.map((option) => (
                                    <Paper
                                        key={option.id}
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
                    </Box>
                ))}

                {/* This empty div acts as our anchor for the auto-scroll */}
                <div ref={messagesEndRef} />
            </Box>

            {/* Fixed Input Area */}
            <PromptBar />

        </Box>
    );
};

export default PromptPage;