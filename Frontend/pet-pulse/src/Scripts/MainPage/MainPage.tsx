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
          <div className={styles.right_part}>{content}</div>
        </div>
      ) : (
        <div className={styles.content}>
          <div className={styles.left_part_2}> 
            <div className={styles.page_number}>0{currentDataIndex + 1}</div>
            <div className={styles.title_new}>{title}</div>
            <div className={styles.description}> Discover advice on raising and keeping your furry friends healthy and happy.<br />Join us on this journey of companionship and discover the joy of pet ownership!
            </div>
            <Link to='./sign' className={styles.start}> Join</Link>
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
      title: "Labrador",
      subtitle: "Cuteness",
      content: "Height: \n Males 56–57 cm (22–22.5 in),\n Females 54–56 cm (21.5–22 in)\n \nWeight:\n Males 29–36 kg (65–80 lb), \n Females 25–32 kg (55–70 lb)\n \nCoat:\n Short, dense, weather-resistant double coat\n \nColour:\n Black, chocolate, or yellow (ranges from pale yellow to fox red)\n \nLife span:\n 13 years\n\n Common nicknames:\n Lab\n \n Origin:\n	United Kingdom\n \n",
      image: "./MainPagePictures/dog.png",
      page: "./MainPagePictures/page3.png"
    },
    {
      title: 'Russian Blue',
      subtitle: '',
      content: "Height: \n Males 24-25 cm (9-10 in),\n Females 23-24 cm (9-10 in)\n \nWeight:\n Males 5–7 kg (11–15 lb), \n Females 3–6 kg (7–13 lb)\n \nCoat:\n Short, dense, and plush coat.\n \nColour:\n Medium silvery-blue shade without any white markings or ghost patterning\n \nLife span:\n 10-15 years\n\n Common nicknames:\n Blue\n \n Origin:\n	Russia\n \n",
      image: './MainPagePictures/p21.png',
      page: './MainPagePictures/page2.png',
    },
    {
      title: 'They need you',
      subtitle: 'important',
      content:
        "We're here to provide personalized care advice tailored to your pet's breed, ensuring their health and happiness. Join us, the ultimate destination for pet lovers, to discover everything you need to know about caring for your beloved friend.",
      image: './MainPagePictures/p33.png',
      page: './MainPagePictures/page1.png',
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
        <Navbar pagename='home'/>
        <div className={styles.second_main_container}>
          <div className={styles.container_bottom}>
            {currentDataIndex !== 0 && (
              <button className={styles.previous_bottom} onClick={() => handleSwipe('right')}></button>
            )}
          </div>
          <div className={styles.left_main}>
          <BodyContent22 {...contentData[currentDataIndex]} currentDataIndex={currentDataIndex} />
         <div className={styles.page_display} style={{ backgroundImage: `url('${contentData[currentDataIndex].page}')` }}> </div>
          </div>
          <div className={styles.right_main}>
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
            <BodyContent22 {...contentData[currentDataIndex]} currentDataIndex={currentDataIndex} />
          </div>
          <div className={styles.left_main2}>
            <div
              className={styles.image2}
              style={{ backgroundImage: `url('${contentData[currentDataIndex].image}')` }}
            ></div>
          </div>
       
        </div>
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
