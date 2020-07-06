import React, { useState } from 'react';
import wx from 'ltg-wxsdk';
import { useIonViewWillEnter, useIonViewDidEnter, IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonNote, IonLabel, IonText, IonItem, IonList } from '@ionic/react';

const WeChatWebViewPage: React.FC = () => {

    const [miniEnv, setMiniEnv] = useState<boolean>(false);
    const [pageMsg, setPageMsg] = useState<Array<string>>(["start"]);


    useIonViewWillEnter(() => {
        console.log("test wx.miniProgram.getEnv");
        wx.miniProgram.getEnv((res: any) => {
            console.log(res.miniprogram);
            setMiniEnv(res.miniprogram);
        });
        
    });

    useIonViewDidEnter(() => {

        console.log("useIonViewDidEnter");

        wx.miniProgram.postMessage({ data: { value: "abc" } });

        setTimeout(() => {
            let msg = new Array<string>().concat(pageMsg);
            msg.push("try to navTo.")
            setPageMsg(msg);
            wx.miniProgram.navigateTo({
                url: "/pages/others/test/webview_test"
              });
        }, 2000);

    });


    return (

        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>WeChat Test</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
            <IonList>
                        <IonItem>
                            <IonLabel>Env:{miniEnv.toString() ?? "Nothing"}</IonLabel> 
                        </IonItem>
                        {
                            pageMsg.map(
                                (item: string) => {
                                    return (<IonItem key={item}>Message:{item}</IonItem>);
                                    })
                        }
                    </IonList>
            </IonContent>
        </IonPage>

    );
};

export default WeChatWebViewPage;