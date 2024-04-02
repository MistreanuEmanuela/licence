import React, { useState } from 'react';
import styles from './Body.module.css';
import Logo from '../Logo/logo';
import Navbar from '../NavBars/SimpleNav';
import { Link } from 'react-router-dom';

interface ContentData {
  title: string;
  subtitle: string;
  content: string;
  image: string;
  page: string;
}



function BodyContent({ title, subtitle, content, currentDataIndex }: ContentData & { currentDataIndex: number }) {
  return (
    <div className={styles.body_text}>
      <div className={styles.first_title}>{title}</div>
      <div className={styles.second_title}>{subtitle}</div>
      <div className={styles.body_content}>{content}</div>
    </div>
  );
}
function BodyContent2({ title, subtitle, content, currentDataIndex }: ContentData & { currentDataIndex: number }) {
  return (
    <div className={styles.body_text}>
      <div className={styles.first_title}>{title}</div>
      <div className={styles.second_title}>{subtitle}</div>
      <div className={styles.body_content}>{content}</div>
    </div>
  );
}



function BodyContent22({ title, subtitle, content, currentDataIndex }: ContentData & { currentDataIndex: number }) {
  return (
    <>
      {currentDataIndex < 2 ? (
        <div className={styles.content}>
          <div className={styles.left_part}> 
            <div className={styles.page_number}>0{currentDataIndex + 1}</div>
            <div className={styles.title}>{title}</div>
          </div>
          <div className={styles.right_part}>ceva</div>
        </div>
      ) : (
        <div className={styles.content}>
          <div className={styles.left_part_2}> 
            <div className={styles.page_number}>0{currentDataIndex + 1}</div>
            <div className={styles.title_new}>{title}</div>
            <button> Stay inform</button>
          </div>
        </div>
      )}
    </>
  );
}

function Body() {
  const [currentDataIndex, setCurrentDataIndex] = useState<number>(0);
  const [contentData, setContentData] = useState<ContentData[]>([
    {
      title: 'Labrador',
      subtitle: 'cuteness',
      content:
        'A puppy is a juvenile dog. Some puppies can weigh 1-1.5 kg, while larger ones can weigh up to 7-11 kg. With their wobbly walks, floppy ears, and boundless enthusiasm, they remind us to embrace the simple pleasures in life.',
      image: './MainPagePictures/dog.png',
      page: './MainPagePictures/page1.png',
    },
    {
      title: 'Russian Blue',
      subtitle: '',
      content:
        'With their small and soft tongues, they blend us into their unconditional love. Despite their small size, kittens possess boundless energy and curiosity, making every moment spent with them a delightful adventure',
      image: './MainPagePictures/p21.png',
      page: './MainPagePictures/page2.png',
    },
    {
      title: 'They need your help',
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
  console.log(currentDataIndex)
  return (
    <div className={styles.second_body} onTouchStart={handleTouchStart}>
      <div className={styles.center_container}>
        <Navbar />
        <div className={styles.second_main_container}>
          <div className={styles.container_bottom}>
            {currentDataIndex !== 0 && (
              <button className={styles.previous_bottom} onClick={() => handleSwipe('right')}></button>
            )}
          </div>
          <div className={styles.left_main}>
          <BodyContent22 {...contentData[currentDataIndex]} currentDataIndex={currentDataIndex} />
            {/* <div
              className={styles.image}
              style={{ backgroundImage: `url('${contentData[currentDataIndex].image}')` }}
            ></div> */}
          </div>
          <div className={styles.right_main}>
            {/* <BodyContent {...contentData[currentDataIndex]} currentDataIndex={currentDataIndex} /> */}
            <div
              className={styles.image}
              style={{ backgroundImage: `url('${contentData[currentDataIndex].image}')` }}></div>
          </div>
          <div className={styles.container_bottom}>
          {currentDataIndex !== contentData.length - 1 && (
            <button className={styles.next_bottom} onClick={() => handleSwipe('left')}></button>
          )}
        </div>
        </div>

        <div className={styles.second_main_container_2}>
          <div className={styles.right_main2}>
            <BodyContent2 {...contentData[currentDataIndex]} currentDataIndex={currentDataIndex} />
          </div>
          <div className={styles.left_main2}>
            <div
              className={styles.image2}
              style={{ backgroundImage: `url('${contentData[currentDataIndex].image}')` }}
            ></div>
          </div>
       
        </div>

       

        {/* <div className={styles.page_number} style={{ backgroundImage: `url('${contentData[currentDataIndex].page}')` }}> </div> */}
      </div>
    
    </div>
    
  );
}

function MainPage() {
  console.log('I am in this page');
  return (
    <div className={styles.body}>
      <Body />
    </div>
  );
}

export default MainPage;
