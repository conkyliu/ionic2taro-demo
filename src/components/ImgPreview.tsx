import React from 'react';

import {
    IonIcon,
    IonImg, IonSlides, IonSlide, IonModal
} from '@ionic/react';
import icon_prev from './icon/icon_arrow_left.svg';

import './ImgPreview.css';

interface ImgPreviewProps {
    style?: {}
    show: boolean;
    current: number;
    pager: boolean;
    pics?: string[];
    onSlideDidChange?: Function;
    closeClick?: Function;
}
interface ImgPreviewState {
    current: number;

}
export default class ImgPreview extends React.Component<ImgPreviewProps, ImgPreviewState> {
    // slides: HTMLIonSlidesElement|undefined;
    constructor(props: ImgPreviewProps) {
        super(props);
        this.state = { current: this.props.current };
    }

    render() {


        let opts = { initialSlide: this.props.current, speed: 400 };
        let picImages = this.props.pics == null ?[]: this.props.pics ;

        return (
            <IonModal isOpen={this.props.show} cssClass='qjs-img-preview'>
                <IonIcon src={icon_prev} onClick={(e) => { this.props.closeClick?.call(this, null) }}></IonIcon>
            
                <div className={'index'}>{this.props.current + 1}/{this.props.pics?.length ?? 0}</div>

                <IonSlides 
                    style={{ width: '100%', height: '100%' }}
                    pager={this.props.pager}
                    options={opts}
                    scrollbar={true}
                    onIonSlideDidChange={(e:any) => {
                        e.preventDefault();
                        let currIndex = e.target.swiper.activeIndex;
                        this.setState({current:currIndex})
                        this.props.onSlideDidChange?.call(e.target.swiper, currIndex);
                    }}  >
                    {
                        picImages.map((_,picIndex)=>{
                            return <IonSlide key={"item" + picIndex}><IonImg style={{width:'100%'}} src={picImages[picIndex]} ></IonImg></IonSlide>
                        })
                    }
                </IonSlides>

            </IonModal>
        );
    }
}
