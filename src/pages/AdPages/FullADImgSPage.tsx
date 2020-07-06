
import React from 'react';
import adpic1 from '../_imgs/adpic1.jpg'
import FullScreenADImg from '../../components/FullScreenADImg';

const FullADImgSPage: React.FC = () => {

    return (
        <FullScreenADImg interval={5}  canSkip = {true} autoClose={true}
        adURL="/home"
        redirectUrl="/home/adimgsamples"
        src={adpic1}></FullScreenADImg>
       
    )
}


export default FullADImgSPage;
