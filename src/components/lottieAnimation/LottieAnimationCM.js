import Lottie from 'lottie-react';

import React from 'react';

const LottieAnimationCM = ({ animationObject, settings, loop = false, height = '200px' }) => {
    return (
        <Lottie
            animationData={animationObject}
            {...settings}
            loop={loop}
            style={{
                height: height
            }}
        />
    );
}

export default LottieAnimationCM;
