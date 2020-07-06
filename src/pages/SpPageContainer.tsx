import {
    IonContent, IonHeader, IonFooter, IonPage, IonTitle, IonToolbar, IonButton, IonIcon, IonBackButton, IonButtons, IonFab, IonFabButton
} from '@ionic/react';
import { home,arrowBack } from 'ionicons/icons';

import React from 'react';
import './SpPageContainer.css';

interface SpPageContainerPropes {
    style?:{}
    title:string;
    toolbarText?:string;
    toolbarUrl?:string;

}

class SpPageContainer extends React.Component<SpPageContainerPropes> {

    render(){
        return (
            <>
                <IonPage>
                    <IonHeader translucent={true} mode='ios'>
                        <IonToolbar className="ion-text-center" mode='ios'>
                            <IonButtons slot="secondary">
                                <IonBackButton icon={arrowBack} color='medium' text=""></IonBackButton>
                            </IonButtons>
                            <IonTitle>{this.props.title}</IonTitle>
                        </IonToolbar>
                    </IonHeader>
                    <IonContent style={this.props.style}>
                        {this.props.children}
                    </IonContent>
                    <IonFab vertical='bottom' className='ion-no-padding' horizontal='center' slot="fixed">
                        <IonFabButton color='dark' routerDirection="back" routerLink="/home">
                            <IonIcon src={home}></IonIcon>
                        </IonFabButton>
                    </IonFab>
                </IonPage>

            </>
        );
    }
}

export default SpPageContainer;
