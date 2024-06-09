
import React, { useState, ChangeEvent, useRef, FormEvent, useEffect } from 'react';
import styles from './chatbot.module.css';
import ChatbotAnimation from '../Components/Animations/chatbotAnimation';
import Navbar from '../NavBars/NavBar';
import { IoSendSharp } from "react-icons/io5";
import Typeing from "../Components/Animations/Typeing";

interface Message {
  sender: 'user' | 'bot';
  text: string;
}


interface QueryResult {
  responseId: string;
  queryResult: {
    advancedSettings: any;
    currentPage: { name: string; displayName: string };
    diagnosticInfo: any;
    intent: { name: string; displayName: string };
    intentDetectionConfidence: number;
    languageCode: string;
    match: { intent: any; resolvedInput: string; matchType: string; confidence: number };
    responseMessages: { responseType: string; text: { text: string[] } }[];
  };
  responseType: string;
}

const ChatBot: React.FC = () => {
  const [inputText, setInputText] = useState<string>('');
  const [messages, setMessages] = useState<Message[]>([]);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const [authToken, setAuthToken] = useState('');
  const [isResponding, setIsResponding] = useState<boolean>(false);

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const token = localStorage.getItem('token');
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", `Bearer ${token}`);

        const response = await fetch('http://localhost:8082/chat/token', {
          method: 'GET',
          headers: myHeaders
        });

        if (!response.ok) {
          throw new Error('Failed to fetch auth token');
        }

        const tokenn = await response.text(); 
        setAuthToken(tokenn);
      } catch (error) {
        console.error('Error fetching auth token:', error);
      }
    };

    fetchToken();

    return () => {
    };
  }, []);



  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    setIsResponding(true);
    e.preventDefault();

    if (!inputText.trim()) return;

    setMessages(prevMessages => [...prevMessages, { sender: 'user', text: inputText }]);

    try {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Authorization", `Bearer ${authToken}`);
      const raw = JSON.stringify({
        "queryInput": {
          "text": {
            "text": inputText
          },
          "languageCode": "en"
        }
      });

      const requestOptions: RequestInit = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
      };

      const response = await fetch("https://dialogflow.googleapis.com/v3/projects/chatbotproject-425609/locations/global/agents/20d81fdb-61a7-4eea-bb1d-f239b59d44fd/sessions/32908026-0a65-48ed-b076-6ab2d3481fa3:detectIntent", requestOptions);
      if (!response.ok) {
        throw new Error('Failed to fetch');
      }
      const data: QueryResult = await response.json();
      console.log(data)

      const botMessage = data.queryResult.responseMessages[0]?.text?.text[0];

      if (botMessage) {
        setMessages(prevMessages => [...prevMessages, { sender: 'bot', text: botMessage }]);
      }
      setIsResponding(false);
    } catch (error) {
      console.error('Error:', error);
      setMessages(prevMessages => [...prevMessages, { sender: 'bot', text: 'Sorry, there was an error processing your request.' }]);
    } finally {
      setInputText('');
    }
  };

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);


  function formatToList(text: string): string {
    const items = text.split('. ');
    
    const formattedItems: string[] = [];
    
    items.forEach(item => {
        if (item && !isNaN(Number(item[0]))) {
            formattedItems.push(item.trim());
        }
    });
    
    const formattedText = formattedItems.map((item, index) => `${index + 1}. ${item}`).join('\n');
    
    return formattedText;
}

  
  return (
    <div>
      <Navbar pagename=''></Navbar>
      <div className={styles.body}>
        <div className={styles.principal}>
          <div className={styles.animation}> <ChatbotAnimation></ChatbotAnimation></div>
          <div className={styles.message}>
            {messages.map((message, index) => (
            <div key={index} className={message.sender === 'user' ? styles.user : styles.bot}>
              <div className={message.sender === 'user' ? styles.userImg : styles.botImg}> </div>      
              <div className={message.sender === 'user' ? styles.messageDisplayUser : styles.messageDisplay}> {message.text} </div>
              </div>
            ))}
            {isResponding &&
            (
              <div className={styles.bot}>
              <div className={styles.botImg}> </div>      
              <div className={styles.messageDisplay}> <Typeing></Typeing> </div>
              </div>
            )}
            <div ref={messagesEndRef} />
            
          </div>

        </div>
        <form onSubmit={handleSubmit} className={styles.ask}>
          <input className={styles.input_field}
            type="text"
            id="inputText"
            value={inputText}
            onChange={handleChange}
          />
          {isResponding && (
            <button type="button" className={styles.sendMessage_inactive} disabled>
              <IoSendSharp />
            </button>
          )}
          {!isResponding && (
            <button type="submit" className={styles.sendMessage}>
              <IoSendSharp />
            </button>
          )}
        </form>
      </div>
    </div>
  );
}

export default ChatBot;
