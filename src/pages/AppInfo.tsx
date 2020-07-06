import React, { useState, FormEvent } from 'react';
import SpPageContainer from './SpPageContainer';
import { AppVersion } from '@ionic-native/app-version';
import { useIonViewWillEnter, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonButton, IonInput, IonLabel, IonNote } from '@ionic/react';


import { NativeStorage } from '@ionic-native/native-storage';
import AppHelper from '../utility/NativeUtil';
import LTGHttp,{Request} from '../utility/LTGHttp';
import { getPlatforms } from '@ionic/react';
import { Globalization } from '@ionic-native/globalization';
import varTest from '../test/varTest';
import User from '../utility/User';
import { userInfo } from 'os';


console.log("Localtion:"+ window.location.href);

const AppInfo: React.FC = () => {

    const [appName, setAppName] = useState('(unknow)');
    const [appVer, setAppVer] = useState('(unknow)');
    const [appNumber, setAppNumber] = useState("(unknow)");
    const [testValue, setTestValue] = useState('');
    const [savedTestValue, setSavedTestValue] = useState('');
    const [error, setError] = useState([]);
    const [langCode, setLangCode] = useState('en');
    const [serverTest, setServerTest] = useState('');

    useIonViewWillEnter(() => {

        AppVersion.getAppName().then((value) => {
            setAppName(value);
        }, (reason) => {
            console.log("GetAppName Error:" + reason);
            setError(error.concat(reason));
        })

        AppVersion.getVersionCode().then((value) => {
            setAppVer(value.toString());
        }, (reason) => {
            console.log("getVersionCode Error:" + reason);
            setError(error.concat(reason));
        });

        AppVersion.getVersionNumber().then((value) => {
            setAppNumber(value);
        }, (reason) => {
            setError(error.concat(reason));
        })

        Globalization.getPreferredLanguage().then(
            (prevState) => setLangCode(langCode),
            (err: any) => console.error(err)
        );

        let testAPI = LTGHttp.GetAPIURI("Server/test");
        Request(testAPI, {
            method: 'GET'
        },'json').then(
            (data) => setServerTest(JSON.stringify(data)), 
            (err) => setServerTest('AppInfo:get data err:'+JSON.stringify(err))
            )
            .catch(
                (err) => setServerTest(JSON.stringify('AppInfo:connection err:'+err))
            );

    });



    return (
        <SpPageContainer title='应用信息'>
            <IonCard>
                <IonCardHeader>
                    <IonCardSubtitle>应用信息获取</IonCardSubtitle>
                    <IonCardTitle>AppVersion</IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                    AppName: {appName} <br />
                    VerCode:{appVer}<br />
                    VerNumber:{appNumber}<br />
                    Language:{langCode}<br />
                    Platforms:{getPlatforms().join(',')}<br />
                    <hr />

                </IonCardContent>
            </IonCard>

            <IonCard>
                <IonCardHeader>
                    <IonCardSubtitle>应用存储功能测试</IonCardSubtitle>
                    <IonCardTitle>NativeStorage</IonCardTitle>
                </IonCardHeader>
                <IonCardContent>

                    <form>
                        <IonLabel>存储值：（键：testVal-值：{testValue})</IonLabel>
                        <IonInput color='dark' value={testValue} onIonChange={(e: any) => setTestValue(e.detail.value)}></IonInput>

                        <IonButton color='dark' expand='full' onClick={() => AppHelper.Storage.Set('testVal', testValue).then(() => alert('已保存'))}>
                            保存值
                    </IonButton>

                        <IonNote color='dark'>
                            获取的存储值（'testVal')：{savedTestValue}
                        </IonNote>
                        <IonButton color='dark' expand='full' onClick={() => AppHelper.Storage.Get('testVal').then((val) => setSavedTestValue(val))}>
                            获取值
                    </IonButton>

                    </form>
                    <IonLabel>
                        清除存储数据功能：
                    </IonLabel>
                    <IonButton color='dark' expand='full' onClick={() => NativeStorage.clear().then(() => alert("已清除"))}>
                        清除应用数据
                </IonButton>
                    <IonButton color='dark' expand='full' onClick={() => User.Clear().then(() => alert("已清除"))}>
                        清除Token
                 </IonButton>
                </IonCardContent>

            </IonCard>
            <IonCard>
                <IonCardHeader>
                    <IonCardSubtitle>服务器连接测试</IonCardSubtitle>
                    <IonCardTitle>Server connection test</IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                    结果：{serverTest}

                    <br/><br/><br/><br/><br/>
                </IonCardContent>
            </IonCard>

            <IonCard>
                <IonCardHeader>
                    <IonCardSubtitle>全局变量测试</IonCardSubtitle>
                    <IonCardTitle>验证React全局对象</IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                    VarTest:{varTest.getVar().toString()}

                    <br/><br/><br/>
                </IonCardContent>
            </IonCard>
        </SpPageContainer>
    )
}

export default AppInfo;