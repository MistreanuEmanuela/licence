import Lottie from 'react-lottie';
import animationData from './loading.json';

const Loading: React.FC = () => {
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
                height={50}
                width={100}
            />
        </div>
    );
}
export default Loading;