import React, { useState, FormEvent } from 'react';
import SpPageContainer from './SpPageContainer';
import './AuthCheckPage.css';
import { IonCardHeader, IonCard, IonCardSubtitle, IonCardTitle, IonCardContent, IonText, IonButton } from '@ionic/react';
import User from '../utility/User';
import varTest from '../test/varTest';
import { Redirect } from 'react-router';

const AuthCheckPage: React.FC = () => {

    varTest.setVar(3);

    const [token,SetToken] = useState(User.Token());

    return (
        <SpPageContainer title='用户身份检查'>
        <IonCard>
            <IonCardHeader>
                <IonCardSubtitle>用户身份检查</IonCardSubtitle>
                <IonCardTitle>AuthChecker</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
                <p>
                    在需要一定权限和角色的页面可以通过AuthCheck来验证当前用户的身份，如果用户未认证或角色并非指定的角色，则会进行匿名登录并会跳转到登录页面。
                    *如果发生异常默认会跳转到首页。
                </p>
               <IonText color='primary'>
                登录状态：{
                    User.IsAnonymous() === true ? (<Redirect to='/home/login' push={true}></Redirect>):
                    (User.IsLogined()===true ? <div>已登录</div>:<div>未登录</div>)
                }</IonText>
                 <div><IonText color='dark'>IsAnonymous:{User.IsAnonymous().toString()}</IonText></div>
                <div><IonText color='dark'>Token:{User.Token()}</IonText></div>
                <div><IonText>Profile:{JSON.stringify( User.Profile())}</IonText></div>

                <IonButton onClick={ (e)=>{
                    e.preventDefault();
                    User.LoginAsAnonymous().then((token)=>SetToken(token));
                 } }>
                    点击匿名登录
                </IonButton>
            </IonCardContent>
        </IonCard>
        </SpPageContainer>

    );

}


export default AuthCheckPage;
