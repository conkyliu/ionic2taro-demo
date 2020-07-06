import React from 'react';
import adpic1 from '../_imgs/adpic1.jpg'
import FullScreenADImg from '../../components/FullScreenADImg';



const FullADImgSPage3: React.FC = () => {

    return (
        <FullScreenADImg 
        redirectUrl="/home/adimgsamples"
        src={adpic1}></FullScreenADImg>
    )
}


export default FullADImgSPage3;
