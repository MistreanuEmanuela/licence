
import React, { useState, ChangeEvent, useRef, FormEvent, useEffect } from 'react';
import styles from './chatbot.module.css';
import ChatbotAnimation from '../Components/Animations/chatbotAnimation';
import Navbar from '../NavBars/NavBar';
import { IoSendSharp } from "react-icons/io5";

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

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!inputText.trim()) return;

    // Add user message to the conversation
    setMessages(prevMessages => [...prevMessages, { sender: 'user', text: inputText }]);

    try {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Authorization", "Bearer ya29.c.c0AY_VpZjSPpRhuAMUq5-N4i9CPSPqZA8HWgC0_lYtewHR2OPwGksYrLtQ2Qq67SHpVykfpPx5ZlAUWr3n0mRhk9lTqn7VdBPaQdMBguSlRYDZKr_-qHP7mvHOhofAiA0bNCQ0-dnhU0g7SZn8Vi5TClhAIq1q3ewCk169sIG-EzTcl9wTWTYbxF-Y7JffZDNmAtsTj1oVKnfRhZl_AqK92HhptkdeVn_BO1xTzNg9OnKfj3dPtKbZ0ITcaEz6zUVSEoxmz8I5St8yoFjtuC93jW8k8Hiads6i47DgxUpJ0yGwiIxgwotn8dkf5-mmc71qlPGO6PLer7_lEpqnaU13HPWugtxhyOI5QEjZGk8sT35NYmgh8T5zoBWmxwT387A75Fs0gqeQRs8XVtJaYc0cwecl_1RtXohuiFxF1Mo58i35MeBzMo8lcqmVQ-O4tb3q-80lgMbOnJRa2MX8-7VVoq7nc35jm1e0J8ngF7s7cjpXbQBwt2dIazryW0Z57mhV8qestR6sjzYynlkBnF8d-zzJIXqmpgfnVy2fwJXBRB2V1SuwVc42Wycfy51rFuSyigaU5BXizORJnzZnI9YtggMq21n4jwk92_02o8Ym32syQvoBfrcpIF5goIeouvBR94okvtMgWYp4BJ5RhM4Md_U4646SteR9-Og21aIpBqdpbZ8-6wuO4bUUBq2e9ounYFukpIIBS4SdQwYVhqX-wtdMvqhk2vBbk7g5tFw6WY0j5Zeo8yrhtowMl7osieMr1p6X4ObOVwcBRQIRaJmm8SRF1h72YO41r-6kgxhFOiaJkmF7BRr3YQfmjFx_BWsW_Slhq6oeRbUa7rjc6hvBuYXMF5UaoUUYRYrxgwc_laJF_a9yQOmtUhJIB3mS-ZSSz4Uk9Ikf0Zzyv2im0zqh5YZ6holyukVllfMqhm4Zzl9FnWBV4_j5r3d1ajVyX1c47-ujMt6b7S_RXe-g3M2W5xZ_UBUgvXYJpevpx_zJowSInIbyblf56Ui");
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

      // Extract the bot's response text
      const botMessage = data.queryResult.responseMessages[0]?.text?.text[0];

      // Add bot message to the conversation
      if (botMessage) {
        setMessages(prevMessages => [...prevMessages, { sender: 'bot', text: botMessage }]);
      }
    } catch (error) {
      console.error('Error:', error);
      setMessages(prevMessages => [...prevMessages, { sender: 'bot', text: 'Sorry, there was an error processing your request.' }]);
    } finally {
      setInputText(''); // Clear the input field
    }
  };

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

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
          <button type="submit" className={styles.sendMessage}><IoSendSharp /></button>
        </form>
      </div>
    </div>
  );
}

export default ChatBot;
