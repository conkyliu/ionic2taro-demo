import React, { } from 'react';

import SpPageContainer from './SpPageContainer';
import OvalButton from '../components/OvalButton';
import { IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent, IonLabel, IonNote, IonText, IonRow, IonCol, IonGrid } from '@ionic/react';
import { text,trendingUpSharp,scanOutline ,shieldCheckmarkOutline ,albumsOutline,paperPlane ,folder} from 'ionicons/icons';

const OvalButtonSamples: React.FC = () => {

    return (

        <SpPageContainer title="OvalButton">
            <IonCard>
                <IonCardHeader>
                    <IonCardSubtitle>主页圆形按钮</IonCardSubtitle>
                    <IonCardTitle>OvalButton</IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                    <IonNote>用于LTG应用中主页的几个按钮。</IonNote>
                    <br/><br/>
                    <IonLabel>可用属性：</IonLabel><br/>
                    <IonText color='secondary'>
                        <code style={{fontSize:'10Px',height:'50Px'}}>

                            size? :'small' | 'default' | 'large';<br/>
                            routerDirection?:any;<br/>
                            routerLink?:string;<br/>
                            showWaves?:boolean;<br/>
                            onClick?:Function;<br/>
                            color?:"primary" |"secondary" | "tertiary" | "success" | "warning" | "danger" | "light" | "medium" | "dark";<br/>
                            text?:string;<br/>
                            hidden?:boolean;<br/>

                            label?:string;<br/>
                            img?:string;<br/>
                            disabled?:boolean;

                        </code>
                        <IonText color='warning'>
                            <br/>
                            注意：当存在img时，text将不生效。
                        </IonText>
                    </IonText>
                    <br />
                    <IonLabel>基本样式：</IonLabel>
                    <br /> <br />
                    <p>
                        屏宽: {window.innerWidth} <br /> <br />
                    </p>
                    <div>
                        <b> 默认（Size = 'default' ) 动画与静态对比 </b>
                        <IonRow>
                            <IonCol size='3'> <OvalButton showWaves={false} text="课程" img={trendingUpSharp} label='Courses'></OvalButton></IonCol>
                            <IonCol size='1'>&nbsp;</IonCol>
                            <IonCol size='3'> <OvalButton text="扫码" img={scanOutline} label='Scan'></OvalButton></IonCol>
                            <IonCol size='1'>&nbsp; </IonCol>
                            <IonCol size='3'>   <OvalButton showWaves={false}  text="购卡" img={albumsOutline} label='Cards'></OvalButton></IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol size='3'> <OvalButton showWaves={false} text="课程"  label='Courses'></OvalButton></IonCol>
                            <IonCol size='1'>&nbsp;</IonCol>
                            <IonCol size='3'> <OvalButton text="扫码"  label='Scan'></OvalButton></IonCol>
                            <IonCol size='1'>&nbsp; </IonCol>
                            <IonCol size='3'>   <OvalButton showWaves={false}  text="购卡" label='Cards'></OvalButton></IonCol>
                        </IonRow>

                        <br /> <br />
                        <b>大（Size = 'large') 中英文对比</b>
                        <IonRow>
                            <IonCol size='6'> <OvalButton text="Go Now!" size='large'></OvalButton></IonCol>
                            <IonCol size='6'> <OvalButton text="预约" size='large'></OvalButton></IonCol>
                        </IonRow>
                        <br /> <br />
                        <b>  小（Size = 'small'  )  禁用disabled对比 </b>
                        <IonRow>
                            <IonCol size='3'> <OvalButton text="退款" size='small' ></OvalButton></IonCol>
                            <IonCol size='3'> <OvalButton text="退款" size='small' disabled={true} ></OvalButton></IonCol>
                            <IonCol size='3'> <OvalButton text="退款" size='small' label='发送'  img={paperPlane}  ></OvalButton></IonCol>
                            <IonCol size='3'> <OvalButton text="退款" size='small' label='文件' disabled={true} img={folder}  ></OvalButton></IonCol>
                        </IonRow>
                    </div>
                </IonCardContent>
            </IonCard>

        </SpPageContainer>

    );

}

export default OvalButtonSamples;
