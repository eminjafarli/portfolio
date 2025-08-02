import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import {AnimatePresence, motion} from 'framer-motion';
import emailjs from '@emailjs/browser';
import gmailLogo from './gmail.svg';
import { FaLinkedin, FaGithub, FaWhatsapp } from 'react-icons/fa';

emailjs.init('Gd4p2ProZXIbj4qwh');

const PageWrapper = styled.div`
    margin-top: 25px;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    padding: 100px;
    gap: 60px;
    max-height: 434px;
    flex-wrap: wrap;

    @media (max-width: 768px) {
        flex-direction: column;
        align-items: center;
        padding: 40px 20px;
        gap: 30px;
        max-height: none;
        margin-left: -30px;
        margin-top: 80px;
    }
`;

const ChatWrapper = styled.div`
    width: 100%;
    max-width: 500px;
    height: 500px;
    background: #f7f7f9;
    border-radius: 30px;
    padding: 20px;
    display: flex;
    flex-direction: column;

    @media (max-width: 768px) {
        height: 400px;
        padding: 15px;
    }
`;
const Notification = styled(motion.div)`
    position: fixed;
    top: 20px;
    left: 31%;
    transform: translateX(-50%);
    padding: 12px 24px;
    border-radius: 8px;
    color: white;
    background: ${(props) => (props.success ? "#28a745" : "#dc3545")};
    z-index: 1000;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    @media (max-width: 768px) {
        left:5%;
        margin-right:5%;
    }
`;
const MessagesContainer = styled.div`
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    gap: 12px;
    overflow-y: auto;
    margin-bottom: 10px;
    overscroll-behavior: contain;

    scroll-behavior: smooth;
`;

const BotMessageWrapper = styled(motion.div)`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    max-width: 75%;
`;

const BotHeader = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 6px;
`;

const BotAvatar = styled.img`
    width: 32px;
    height: 32px;
    border-radius: 50%;
`;

const BotName = styled.div`
    font-weight: bold;
    font-size: 14px;
    color: #555;
`;

const Message = styled(motion.div)`
    align-self: ${({ type }) => (type === 'bot' ? 'flex-start' : 'flex-end')};
    background-color: ${({ type }) => (type === 'bot' ? '#E9E9EB' : '#497BF6')};
    color: ${({ type }) => (type === 'bot' ? 'black' : 'white')};
    padding: 12px 18px;
    border-radius: 20px;
    font-size: 15px;
    line-height: 1.4;
    box-shadow: ${({ type }) =>
            type === 'bot'
                    ? '0 1px 3px rgba(0,0,0,0.1)'
                    : '0 1px 3px rgba(0,0,0,0.3)'};

    @media (max-width: 768px) {
        font-size: 14px;
        padding: 10px 14px;
    }
`;

const InputBox = styled.form`
    display: flex;
    gap: 10px;
`;

const Input = styled.input`
    flex-grow: 1;
    padding: 12px 15px;
    border-radius: 25px;
    border: 1px solid #ccc;
    font-size: 14px;
    outline: none;
`;

const SendButton = styled.button`
    background-color: #497BF6;
    color: white;
    border: none;
    padding: 0 20px;
    border-radius: 25px;
    cursor: pointer;
    font-weight: bold;
    transition: background-color 0.2s;

    &:hover {
        background-color: #3D66CC;
    }
`;

const LinksWrapper = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;

    @media (max-width: 768px) {
        gap:70px;
    }
`;

const LargeLinkCard = styled(motion.a)`
    width: 218px;
    height: 218px;
    background-color: #f7f7f9;
    color: black;
    border-radius: 25px;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    font-size: 18px;
    font-weight: 500;
    text-decoration: none;
    overflow: hidden;
    position: relative;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
        background-color: ${({ hoverBg }) => hoverBg || '#000'};
        color: white;

        svg {
            color: white;
        }
    }

    @media (max-width: 768px) {
        width: 100%;
        height: auto;
        padding: 16px;
        margin-bottom: -32px;
    }
`;

const CardLabel = styled.div`
    margin-top: auto;
    padding-bottom: 5px;
`;

const CardIcon = styled.div`
    margin-top: 30px;
    font-size: 120px;
    color: ${({ color }) => color || '#000'};

    @media (max-width: 768px) {
        font-size: 90px;
        margin-top: 20px;
    }
`;

const GmailIcon = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
    flex-grow: 1;

    img {
        width: 125px;
        height: 125px;
        transition: filter 0.3s ease;

        @media (max-width: 768px) {
            width: 100px;
            height: 100px;
        }
    }

    ${LargeLinkCard}:hover & img {
        filter: brightness(0) invert(1);
    }
`;

const CardButton = styled.a`
    margin-top: -10px;
    padding: 8px 16px;
    border-radius: 20px;
    background-color: ${({ bg }) => bg || '#000'};
    color: white;
    text-align: center;
    font-size: 14px;
    font-weight: bold;
    text-decoration: none;
    transition: background-color 0.3s;

    &:hover {
        background-color: ${({ bg }) => (bg ? bg + 'cc' : '#222')};
    }

    @media (max-width: 768px) {
        font-size: 13px;
        padding: 6px 14px;
    }
`;

const MAX_EMAILS = 5;
const EMAIL_STORAGE_KEY = 'emailCount';
const TIMESTAMP_KEY = 'lastResetTime';

const ContactChat = () => {
    const prompts = [
        "Want to work together? Send me a text here.",
        "What is your name?",
        "Can I have your email?",
        "Send me your mobile number please.",
        "What's the subject of your message?",
        "Alright! Send me the message.",
        "Thank you for your message!\nI'll text you back as soon as possible."
    ];

    const [step, setStep] = useState(1);
    const [messages, setMessages] = useState([
        { type: 'bot', text: prompts[0] },
        { type: 'bot', text: prompts[1] }
    ]);
    const [input, setInput] = useState('');
    const [formData, setFormData] = useState({
        name: '', email: '', phone: '', subject: '', message: ''
    });
    const [emailCount, setEmailCount] = useState(0);
    const [notification, setNotification] = useState(null);
    const messagesContainerRef = useRef(null);

    useEffect(() => {
        if (messages.length > 2 && messagesContainerRef.current) {
            messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
        }
    }, [messages]);

    useEffect(() => {
        const storedTime = localStorage.getItem(TIMESTAMP_KEY);
        const storedCount = parseInt(localStorage.getItem(EMAIL_STORAGE_KEY) || '0');
        const now = Date.now();

        if (!storedTime || now - parseInt(storedTime) > 24 * 60 * 60 * 1000) {
            localStorage.setItem(EMAIL_STORAGE_KEY, '0');
            localStorage.setItem(TIMESTAMP_KEY, now.toString());
            setEmailCount(0);
        } else {
            setEmailCount(storedCount);
        }
    }, []);

    const canSendEmail = () => emailCount < MAX_EMAILS;

    const incrementEmailCount = () => {
        const newCount = emailCount + 1;
        localStorage.setItem(EMAIL_STORAGE_KEY, newCount.toString());
        setEmailCount(newCount);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        if (!canSendEmail()) {
            setNotification({message: "You've reached the limit of 5 messages in 24 hours. Please try again later.", success: false});
            setTimeout(() => setNotification(null), 2000);
            return;
        }

        const updatedMessages = [...messages, { type: 'user', text: input }];
        const dataKeys = ['name', 'email', 'phone', 'subject', 'message'];
        let newFormData = { ...formData };

        if (step > 0 && step <= dataKeys.length) {
            const key = dataKeys[step - 1];
            newFormData[key] = input;
        }

        setMessages(updatedMessages);
        setFormData(newFormData);
        setInput('');

        if (step < prompts.length - 2) {
            setTimeout(() => {
                setMessages(prev => [...prev, { type: 'bot', text: prompts[step + 1] }]);
                setStep(step + 1);
            }, 500);
        } else if (step === prompts.length - 2) {
            setTimeout(() => {
                setMessages(prev => [...prev, { type: 'bot', text: prompts[step + 1] }]);
                setStep(step + 1);

                emailjs.send(
                    'service_glig86q',
                    'template_pxbcqqu',
                    newFormData,
                    'Gd4p2ProZXIbj4qwh'
                ).then(
                    (response) => {
                        console.log('✅ Email sent!', response.status, response.text);
                        incrementEmailCount();
                    },
                    (err) => {
                        console.error('❌ Error sending email:', err);
                    }
                );
            }, 500);
        }
    };


    return (
        <PageWrapper>
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <ChatWrapper>
                    <MessagesContainer ref={messagesContainerRef}>
                        {messages.map((msg, index) => {
                            if (msg.type === 'bot') {
                                return (
                                    <BotMessageWrapper
                                        key={index}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.4 }}
                                    >
                                        <BotHeader>
                                            <BotAvatar src="/emin-avatar.jpg" alt="Bot" />
                                            <BotName>Emin</BotName>
                                        </BotHeader>
                                        <Message type="bot">
                                            {msg.text.split('\n').map((line, idx) => (
                                                <div key={idx}>{line}</div>
                                            ))}
                                        </Message>
                                    </BotMessageWrapper>
                                );
                            }
                            return (
                                <Message
                                    key={index}
                                    type="user"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.4 }}
                                >
                                    {msg.text}
                                </Message>
                            );
                        })}
                    </MessagesContainer>
                    {step < prompts.length - 1 && (
                        <InputBox onSubmit={handleSubmit}>
                            <Input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Type here..."
                                autoFocus
                            />
                            <SendButton type="submit">Send</SendButton>
                        </InputBox>
                    )}
                </ChatWrapper>
            </motion.div>

            <LinksWrapper>
                <LargeLinkCard
                    href="mailto:eminjafarli02@gmail.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    hoverBg="#CA4A3E"
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1, duration: 0.4 }}
                >

                    <GmailIcon>
                        <img src={gmailLogo} alt="Gmail" />
                    </GmailIcon>
                    <CardLabel>Gmail</CardLabel>
                </LargeLinkCard>

                <LargeLinkCard
                    href="https://wa.me/qr/HFJD6LK5ZSUNN1"
                    target="_blank"
                    rel="noopener noreferrer"
                    hoverBg="#6FD267"
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.4 }}
                >
                    <CardIcon color="#6FD267"><FaWhatsapp /></CardIcon>
                    WhatsApp
                </LargeLinkCard>
                <LargeLinkCard
                    href="https://github.com/eminjafarli"
                    target="_blank"
                    rel="noopener noreferrer"
                    hoverBg="#333"
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.4 }}
                >
                    <CardIcon color="#333"><FaGithub /></CardIcon>
                    GitHub
                </LargeLinkCard>
                <LargeLinkCard
                    href="https://www.linkedin.com/in/eminjaf/"
                    target="_blank"
                    rel="noopener noreferrer"
                    hoverBg="#0077B5"
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7, duration: 0.4 }}
                >
                    <CardIcon color="#0077B5"><FaLinkedin /></CardIcon>
                    LinkedIn
                </LargeLinkCard>
            </LinksWrapper>
            <AnimatePresence>
                {notification && (
                    <Notification
                        success={notification.success}
                        initial={{y: -100, opacity: 0}}
                        animate={{y: 0, opacity: 1}}
                        exit={{y: -100, opacity: 0}}
                        transition={{duration: 0.5}}
                    >
                        {notification.message}
                    </Notification>
                )}
            </AnimatePresence>
        </PageWrapper>
    );
};

export default ContactChat;
