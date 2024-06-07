import Lottie from 'react-lottie';
import animationData from './typing.json';
import React from 'react';

const Typeing: React.FC = () => {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
        }
    };

    return (
        <div>
            <Lottie
                options={defaultOptions}
                height={25}
                width={25}
            />
        </div>
    );
}
export default Typeing;