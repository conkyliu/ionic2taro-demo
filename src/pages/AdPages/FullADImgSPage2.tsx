import React from 'react';
import adpic1 from '../_imgs/adpic1.jpg'
import FullScreenADImg from '../../components/FullScreenADImg';



const FullADImgSPage2: React.FC = () => {

    return (
       
        <FullScreenADImg interval={5} canSkip={false} autoClose={true}
        adURL="/home"
        redirectUrl="/home/adimgsamples"
        src={adpic1}></FullScreenADImg>
      
    )
}


export default FullADImgSPage2;
