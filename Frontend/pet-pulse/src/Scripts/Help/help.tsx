import React, { useState } from 'react';
import styles from './help.module.css';
import Navbar from '../NavBars/SimpleNav';

interface Question {
  question: string;
  answer: string;
}

interface FAQSection {
  category: string;
  questions: Question[];
}

const faqData: FAQSection[] = [
  {
    category: "Getting Started",
    questions: [
      { question: "How do I create an account?", answer: "To create an account, you need to provide your first name, last name, username, email, date of birth, and a secure password. An email verification is required to activate your account." },
      { question: "What information do I need to provide for my pet's profile?", answer: "You need to provide your pet's name, breed, date of birth, microchip number, photograph, gender, and color." }
    ]
  },
  {
    category: "Pet Management",
    questions: [
      { question: "How can I manage my pet's medical history?", answer: "You can log all veterinary consultations, treatments, surgeries, and vaccination schedules to maintain a comprehensive medical history for each of your pets." },
      { question: "Can I edit my pet's information?", answer: "Yes, all information about your pets is easily accessible and editable to ensure you always have up-to-date details." }
    ]
  },
  {
    category: "Features",
    questions: [
      { question: "What is the Pet Matchmaking feature?", answer: "The Pet Matchmaking feature helps you find the most suitable pet breed based on your living environment, available free time, and whether you have children." },
      { question: "How does the Breed Identification feature work?", answer: "You can upload a photo of your pet, and the application will analyze the image and provide a probable breed identification." },
      { question: "What kind of information can I find in the comprehensive information repository?", answer: "You can find information about various breeds, health issues, dietary recommendations, size expectations, and behavior insights." },
      { question: "How does the Veterinary Services Locator work?", answer: "The Veterinary Services Locator helps you find the nearest veterinary clinics in case of urgent needs." }
    ]
  },
  {
    category: "User Interaction",
    questions: [
      { question: "How can I interact with other users?", answer: "You can search for other users' pets by breed, read and post on the Community page, and interact with the chatbot for support." },
      { question: "How do I use the Community page?", answer: "On the Community page, you can post your thoughts and experiences, respond to others, and read posts shared by other users." },
      { question: "What can the chatbot help me with?", answer: "The chatbot is trained on various veterinary details and can provide support and information about pet care and health." }
    ]
  },
  {
    category: "Account Management",
    questions: [
      { question: "How do I reset my password?", answer: "If you need to reset your password, click on 'Forgot Password' on the login page and follow the instructions to reset your password via email." },
      { question: "How can I update my account information?", answer: "You can update your account information by going to the 'Account Settings' page and editing your details such as email, username, and password." }
    ]
  },
  {
    category: "Security",
    questions: [
      { question: "How do you ensure the security of my data?", answer: "We implement industry-standard security measures including encryption, secure servers, and regular security audits to protect your data." },
      { question: "Is my information shared with third parties?", answer: "Your information is not shared with third parties without your consent, and we adhere to strict privacy policies to ensure your data remains private." }
    ]
  },
  {
    category: "Technical Support",
    questions: [
      { question: "How can I contact technical support?", answer: "If you need technical support, you can contact us via the 'Help' section in the app or send an email to support@petpulse.com." },
      { question: "What should I do if I encounter a bug?", answer: "If you encounter a bug, please report it through the 'Feedback' section in the app, providing as much detail as possible so our team can address it promptly." }
    ]
  }
];

const Help: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<string | null>(null);

  const toggleAnswer = (index: string) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className={styles.body}>
    <div className={styles.nav}><Navbar pagename='help'></Navbar></div>
    <div className={styles.faq_container}>
      <div className={styles.first_part}>
        <div className={styles.left_part}>
               <div className={styles.title}> <b>FAQ</b></div> 
               <div className={styles.content}>Have questions about our pet application? We have answers! Here are some common responses that may be helpful.</div>
        </div>
        <div className={styles.right_part}></div>
      </div>
 
     
      {faqData.map((section, sectionIndex) => (
        <div key={sectionIndex} className={styles.questions}>
          <div className={styles.section}> <b>{section.category}</b></div>
          <div className={styles.question_resp}>
          {section.questions.map((item, index) => (
            <div key={index} className={styles.faq_item}>
              <div className={styles.faq_question} onClick={() => toggleAnswer(`${sectionIndex}-${index}`)}>
                {item.question}
                <span>{activeIndex === `${sectionIndex}-${index}` ? '-' : '+'}</span>
              </div>
              {activeIndex === `${sectionIndex}-${index}` && <div className={styles.faq_answer}>{item.answer}</div>}
            </div>
          ))}
        </div>
        </div>
      ))}
    </div>
    </div>
  );
};

export default Help;
