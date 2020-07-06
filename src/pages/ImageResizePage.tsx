import React, { useState } from 'react';
import { IonImg, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent } from '@ionic/react';
import SpPageContainer from './SpPageContainer';
import './ImageResizePage.css';

const ImageResizePage: React.FC = () => {

    return (
        <SpPageContainer title='字体示例'>
            <IonCard>
                <IonCardHeader>
                    <IonCardSubtitle>图片背景示例</IonCardSubtitle>
                    <IonCardTitle>IonImg BackgroundImage</IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                    100%宽图：
                    <IonImg className='heightBoxWith100Per'>
                    </IonImg>

                    100%高图：
                    <IonImg className='weightBoxWith100Pre'>
                    </IonImg>
                </IonCardContent>
            </IonCard>
        </SpPageContainer>
    );
};


export default ImageResizePage;