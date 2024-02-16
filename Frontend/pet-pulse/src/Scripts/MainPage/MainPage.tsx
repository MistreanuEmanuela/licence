import React, { useState } from 'react';
import styles from './Body.module.css';
import Logo from '../Logo/logo';
import Navbar from '../NavBars/SimpleNavBar';

interface ContentData {
  title: string;
  subtitle: string;
  content: string;
  image: string;
  page:string;
}

function Header() {
  return (
    <div className={styles.top_container}>
      <div className={styles.top_container1}></div>
      <div className={styles.top_container2}>
        <div className={styles.dog_container_picture}></div>
        <div className={styles.dog_container}></div>
      </div>
    </div>
  );
}

function BodyContent({ title, subtitle, content,page }: ContentData) {
  return (
    <div>
    <div className={styles.body_text}>
      <div className={styles.first_title}>{title}</div>
      <div className={styles.second_title}>{subtitle}</div>
      <div className={styles.body_content}>{content}</div>
    </div>
    <div className={styles.page_number} style={{ backgroundImage: `url('${page}')` }}> </div>
    </div>
  );
}

function Body() {
  const [currentDataIndex, setCurrentDataIndex] = useState<number>(0);
  const [contentData, setContentData] = useState<ContentData[]>([
    {
      title: 'pure',
      subtitle: 'cuteness',
      content:
        'A puppy is a juvenile dog. Some puppies can weigh 1-1.5 kg, while larger ones can weigh up to 7-11 kg. With their wobbly walks, floppy ears, and boundless enthusiasm, they remind us to embrace the simple pleasures in life.',
      image: './MainPagePictures/dog.png',
      page: './MainPagePictures/page1.png',
    },
    {
      title: 'masters',
      subtitle: 'of love',
      content:
        'With their small and soft tongues, they blend us into their unconditional love. Despite their small size, kittens possess boundless energy and curiosity, making every moment spent with them a delightful adventure',
      image: './MainPagePictures/p2.png',
      page: './MainPagePictures/page2.png',
    },
    {
      title: 'your pet is',
      subtitle: 'important',
      content:
        "We're here to provide personalized care advice tailored to your pet's breed, ensuring their health and happiness. Join us, the ultimate destination for pet lovers, to discover everything you need to know about caring for your beloved friend.",
      image: './MainPagePictures/dct_1.png',
      page: './MainPagePictures/page3.png',
    },
  ]);

  const handleSwipe = (direction: 'left' | 'right') => {
    if (direction === 'left' && currentDataIndex < contentData.length - 1) {
      setCurrentDataIndex(currentDataIndex + 1);
    } else if (direction === 'right' && currentDataIndex > 0) {
      setCurrentDataIndex(currentDataIndex - 1);
    }
  };

  const handleTouchStart = (event: React.TouchEvent) => {
    const startX = event.touches[0].clientX;
  
    const handleTouchMove = (moveEvent: TouchEvent) => {
      const endX = moveEvent.touches[0].clientX;
      const deltaX = startX - endX;
      console.log(deltaX);
      
      if (Math.abs(deltaX) > 50) {
        const direction = deltaX > 0 ? 'left' : 'right';
        console.log('Swipe detected:', direction);
        
        if ((direction === 'left' && currentDataIndex < contentData.length - 1) ||
            (direction === 'right' && currentDataIndex > 0)) {
          handleSwipe(direction);
        }
        
        document.removeEventListener('touchmove', handleTouchMove);
      }
    };
  
    document.addEventListener('touchmove', handleTouchMove);
  };

  return (
    <div className={styles.second_body} onTouchStart={handleTouchStart}>
      <div className={styles.container_bottom}>
        {currentDataIndex !== 0 && (
          <button className={styles.previous_bottom} onClick={() => handleSwipe('right')}></button>
        )}
      </div>
      <div className={styles.main_container}>
        <div className={styles.navBar}>
          <Logo size="40%" />
          <div className={styles.NavLink}>
            <Navbar />
          </div>
        </div>
        <div className={styles.second_main_container}>
          <div className={styles.left_main}>
            <div
              className={styles.image}
              style={{ backgroundImage: `url('${contentData[currentDataIndex].image}')` }}
            ></div>
          </div>
          <div className={styles.right_main}>
            <BodyContent {...contentData[currentDataIndex]} />
          </div>
        </div>
      </div>
      <div className={styles.container_bottom}>
        {currentDataIndex !== contentData.length - 1 && (
          <button className={styles.next_bottom} onClick={() => handleSwipe('left')}></button>
        )}
      </div>
    </div>
  );
}

function MainPage() {
  console.log('I am in this page');
  return (
    <div className={styles.body}>
      <Header />
      <Body />
    </div>
  );
}

export default MainPage;
