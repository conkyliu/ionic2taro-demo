import React from 'react';
import adpic1 from '../_imgs/adpic1.jpg'
import FullScreenADImg from '../../components/FullScreenADImg';


const FullADImgSPage4: React.FC = () => {

    return (
        <FullScreenADImg autoClose={true} interval={3} redirectUrl="/home/adimgsamples"
        adURL={"/home/webview/"+encodeURIComponent('http://baidu.com')}
        src={adpic1} ></FullScreenADImg>
    )
}

export default FullADImgSPage4;
