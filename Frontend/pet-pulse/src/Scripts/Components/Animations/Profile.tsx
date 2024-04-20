import Lottie from 'react-lottie';
import animationData from './profile.json';

const ProfileAnimation: React.FC = () => {
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
                height={200}
                width={200}
            />
        </div>
    );
}
export default ProfileAnimation;