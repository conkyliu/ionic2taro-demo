
import React from 'react';
import SpPageContainer from './SpPageContainer';
import { IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent, IonList, IonItem, IonLabel, IonInput } from '@ionic/react';
import SelectFile from "../components/SelectFile";

const FileInputPage: React.FC = () => {


    return (

        <SpPageContainer title='文件对象'>
            <IonCard>
                <IonCardHeader>
                    <IonCardSubtitle>文件对象</IonCardSubtitle>
                    <IonCardTitle>Input File</IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                    <IonList>
                        <IonItem>
                            <IonLabel>选择文件：</IonLabel>
                            <input accept='.png,.jpg,.jpeg,.gif' multiple={true} type="file"  placeholder='选择文件'>
                            </input>
                        </IonItem>
                    </IonList>
                </IonCardContent>
            </IonCard>
            <SelectFile
                accept={'.png,.jpg,.jpeg,.gif'}
                multiple={true}
                placeholder={'选择文件'}
                onSelect={(sender:any,items:any)=>console.log(items)}
            ></SelectFile>
        </SpPageContainer>

    );
};

export default FileInputPage;
