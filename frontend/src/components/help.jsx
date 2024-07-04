import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import socket from '../utils/socket';
import { useSnackbar } from 'notistack';
import { Box, TextField, Button, List, ListItem, Typography } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import chatBot from '../images/chatbot.png';
import { StyleContainer, ChatbotIcon, HeaderTitle } from '../css/styles/help.style';
import Header from '../components/Header';

import Dialog from '@mui/material/Dialog';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const faqData = [
  {
    question: 'How do I place an order?',
    answer:
      'You can place an order by navigating to the product page, selecting the quantity, and clicking on the "Add to Cart" button. Then proceed to checkout to complete your order.',
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'We accept stripe payment for online payments.',
  },
  {
    question: 'How can I track my order?',
    answer:
      'Once your order is shipped, you will receive a tracking number via email. You can use this tracking number on our website to track your order.',
  },
];

const FAQChatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    socket.on('faqResponse', (response) => {
      setMessages((prevMessages) => [...prevMessages, { text: response, from: 'bot' }]);
    });

    return () => socket.off('faqResponse');
  }, [enqueueSnackbar, dispatch]);

  const handleSend = () => {
    if (input.trim()) {
      setMessages((prevMessages) => [...prevMessages, { text: input, from: 'user' }]);
      socket.emit('faqQuery', input);
      setInput('');
    }
  };

  return (
    <>
      <Header />
      <StyleContainer>
        <HeaderTitle align={'center'} variant="h6">
          FAQ{' '}
        </HeaderTitle>
        <Box>
          {faqData.map((data) => (
            <Accordion>
              <AccordionSummary
                expandIcon={<ArrowDownwardIcon />}
                aria-controls="panel1-content"
                id="panel1-header"
              >
                <Typography>{data.question}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>{data.answer}</Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>

        <ChatbotIcon alt="chat-bot" src={chatBot} onClick={handleClickOpen} />
      </StyleContainer>
      <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              conversation
            </Typography>
            {/* <Button autoFocus color="inherit" onClick={handleClose}>
              save
            </Button> */}
          </Toolbar>
        </AppBar>
        <List>
          <ListItemButton>
            <ListItemText primary="Phone ringtone" secondary="Titania" />
          </ListItemButton>
          <Divider />
        </List>
      </Dialog>
    </>
  );
};

export default FAQChatbot;
{
  /* <Box sx={{ padding: 2 }}>
        <Typography variant="h6">FAQ </Typography>
        <List>
          {messages.map((msg, index) => (
            <ListItem key={index} sx={{ textAlign: msg.from === 'user' ? 'right' : 'left' }}>
              <Typography variant="body1">{msg.text}</Typography>
            </ListItem>
          ))}
        </List>
        <Box sx={{ display: 'flex', mt: 2 }}>
          <TextField
            variant="outlined"
            fullWidth
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask a question..."
          />
          <Button variant="contained" color="primary" onClick={handleSend} sx={{ ml: 1 }}>
            Send
          </Button>
        </Box>
      </Box> */
}
