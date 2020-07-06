import {
    IonCard, IonCardHeader,
    IonCardContent, IonCardSubtitle, IonCardTitle,
    IonButton, IonText
} from '@ionic/react';
import React, {  } from 'react';
import './ADImgSamples.css';
import SpPageContainer from './SpPageContainer';


const FllScreenADImgSamples: React.FC = () => {

    return (
        <SpPageContainer title="广告组件">
            <IonCard>
                <IonCardHeader>
                    <IonCardSubtitle>全页广告展示</IonCardSubtitle>
                    <IonCardTitle>FullScreenADImg</IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                    <IonText>
                        用于展示大区域或全页面的广告图或视频，可以设置自动关闭和跳转目标。
                        </IonText>
                    <IonButton  color='dark'  expand="full" target="_self" routerDirection='forward' routerLink="/home/adimg/pages/fullpageadimg">示例1:  自动跳转 </IonButton>
                    <IonButton  color='dark'  expand="full" target="_self" routerDirection='forward' href="/home/adimg/pages/fullpageadimg2">示例2:  等待关闭 </IonButton>
                    <IonButton  color='dark'  expand="full" target="_self" routerDirection='forward' href="/home/adimg/pages/fullpageadimg3">示例3:  手动关闭 </IonButton>
                    <IonButton  color='dark'  expand="full" target="_self" routerDirection='forward' href="/home/adimg/pages/fullpageadimg4">示例3: 外部链接 </IonButton>
                </IonCardContent>
            </IonCard>

        </SpPageContainer>
    )
}


export default FllScreenADImgSamples;
