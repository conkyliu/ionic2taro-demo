import {
    IonCard, IonCardHeader,
    IonCardContent, IonNote, IonCardSubtitle, IonCardTitle,
    
    IonLabel,
    IonText
} from '@ionic/react';
import React, {  } from 'react';
import './FontSamples.css';

import SpPageContainer from './SpPageContainer';
import LocalizedStrings from 'react-localization';
import { text } from 'ionicons/icons';
import varTest from '../test/varTest';


let strings = new LocalizedStrings({
    en:{
      how:"How are you today?"
    },
    'zh-CN': {
      how:"今天如何?"
    }
   });



const FontSamples: React.FC = () => {

    varTest.setVar(2);
    
    return (
        <SpPageContainer title='字体示例'>
                <IonCard>
                    <IonCardHeader>
                        <IonCardSubtitle>字体示例</IonCardSubtitle>
                        <IonCardTitle>Font Family</IonCardTitle>
                    </IonCardHeader>
                    <IonCardContent>
                        <IonNote  style={{"fontFamily":"SHanMedium"} }>
                        ABC字体：SourceHanSansCN-Medium
                        </IonNote>
                        <br/>
                        <IonNote style={{"fontFamily":"SHanNormal" }}>
                        ABC字体：SourceHanSansCN-Normal
                        </IonNote>
                        <br/>
                        <IonNote style={{"fontFamily":"SHanBold" }}>
                        ABC字体：SourceHanSansCN-Bold
                        </IonNote>
                    </IonCardContent>
                </IonCard>
                <IonCard>
                    <IonCardHeader>
                        <IonCardSubtitle>多语言</IonCardSubtitle>
                        <IonCardTitle>LocalizedStrings</IonCardTitle>
                    </IonCardHeader>
                    <IonCardContent>
                        <IonNote>
                            使用LocalizedStrings模块。  <br/>
                            <br/>  <br/>
                        .getLanguage() <br/>
                        </IonNote>
                        当前语言：<IonLabel color='dark'> {strings.getLanguage() }</IonLabel> 
                        
                        <IonText color='dark'>
                        <hr></hr>
                        <p>en:{strings.getString("how",'en')}</p>
                        <p> zh-CN:{strings.getString("how",'zh-CN')}</p>
                        <hr/>
                       <p>defult:{strings.getString('how')}</p>
                       </IonText>
                        
                    </IonCardContent>
                    
                </IonCard>
          </SpPageContainer>
    )

}

export default FontSamples;