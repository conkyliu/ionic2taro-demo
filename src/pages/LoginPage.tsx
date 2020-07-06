import {
    IonText, IonCard, IonNote, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent, IonLabel, useIonViewWillEnter, IonLoading
} from '@ionic/react';
import Login from '../components/Login';
import SpPageContainer from './SpPageContainer';
import React, { useState } from 'react';
import AppHelper from '../utility/NativeUtil';
import LTGHttp from '../utility/LTGHttp';
import User from '../utility/User';

let username = '';
let checkedUsername = '';
let password = '';
let pincode = '';
let mode = 'login';

const LoginPage: React.FC = () => {

    const [token, setToken] = useState('');
    const [showLoading, setShowLoading] = useState(false);
    const [userExists,setuserExists] = useState(true);
    const [profile,setProfile] = useState('');

    const loadToken = async () => {
        let sToken = await AppHelper.SecureValue.Get("user", "token");
        if (sToken != null) {
            setToken(sToken);
        }
    };

    const loadProfile = async()=>{
        let profile = await AppHelper.Storage.Get("profile");
        setProfile(JSON.stringify(profile));
    }

    useIonViewWillEnter(() => {
        loadToken();
    });


    return (
        <SpPageContainer title='LoginPage'>
            <IonCard>
                <IonCardHeader>
                    <IonCardSubtitle>登入套件</IonCardSubtitle>
                    <IonCardTitle>Login Suite</IonCardTitle>
                </IonCardHeader>

                <IonCardContent>
                    <IonText>
                        登入套件直接集成了用户登录的API及第三方OAuth认证流程，仅需要传入相关认证的URL、参数及回调函数即可实现登录。
                    </IonText>
                    <br /> <br /> <br />
                    <IonLabel >
                        <h3>登录模式：{ mode }</h3>
                        <pre>
                            <code>
                                token:{ token }<br/><br/>
                                profile:{profile}<br/><br/>
                                userExists:{userExists.toString()}
                            </code>
                        </pre>
                    </IonLabel>
                    <hr />
                    <Login
                        enabledSignUp={true}
                        countdownForPINCode={60}
                        userExists = {userExists}

                        onUsernameChanged={(val: string) => username = val}
                        onPasswordChanged={(val: string) => password = val}
                        onPINCodeChanged={(val: string) => pincode = val}
                        onModeChanged={(val: string) => mode=val}

                        langPackage={{
                            'en': {
                                'username': "Cell Number",
                                'errorUsernameAlert': 'Please enter the 11-digit mobile phone number',
                                'errorPasswordAlert': 'The password must contain letters and Numbers with a minimum of 6 digits'
                            },
                            'zh-CN': {
                                'username': "手机号",
                                'errorUsernameAlert': '请输入11位手机号',
                                'errorPasswordAlert': '密码必须包括字母和数字，最少6位'
                            }
                        }}

                        usernameRegex='^1[0-9]{10}$'
                        passwordRegex='(?=.*([a-zA-Z].*))(?=.*[0-9].*)[a-zA-Z0-9-*/+.~!@#$%^&*()]{6,30}$'

                        //当用户名对话框焦点离开时，验证手机号是否已注册，如果已注册能自动切换为登录模式，否则切为注册模式
                        onUsernameBlur={( newUsername: any) => {

                            //是否已检查过该用户名
                            if (checkedUsername === newUsername) {
                                return;
                            } else {
                                console.log("Checking username.", checkedUsername, ',', newUsername);
                            }
                            //检查用户是否存在
                            let apiUrl = LTGHttp.GetAPIURI('Account/ExistsCellphone(' + newUsername + ')');
                            setShowLoading(true);
                            LTGHttp.Request(apiUrl,{}).then((data: any) => {
                         
                                if (data.exists === true) {
                                    setuserExists(true);
                                } else {
                                    setuserExists(false);
                                }

                                checkedUsername = newUsername;
                                console.log("The username ", checkedUsername, ' has been cheched.')
                                setShowLoading(false);

                            }, (err: any) => {

                                alert("用户名存在检查请求失败。" + err);
                                setShowLoading(false);

                            })

                        }}

                        sendPinCodeRequest={{ url: LTGHttp.GetAPIURI('AccessCode/New(MobilePinCodeV1,${username})') }}
                        sendLoginPinCodeRequest = {{ url: LTGHttp.GetAPIURI('AccessCode/New(SMSLoginPinCodeV1,${username})') }}
                        loginRequest={
                            {
                                url: LTGHttp.GetAPIURI("Account/Login"),
                                body: '{"authType":1,"username":"${username}","password":"${password}"}'
                            }
                        }

                        loginWithPINRequest={
                            {
                                url: LTGHttp.GetAPIURI("Account/Login"),
                                body: '{"authType":2,"username":"${username}","password":"${pincode}"}'
                            }
                        }

                        signupRequest={
                            {
                                url: LTGHttp.GetAPIURI("Account/SignupByMobile(${username},${password},${pincode})")
                            }
                        }

                    >

                    </Login>
                    <IonNote>
                    </IonNote>
                    <br/><br/> <br/><br/> <br/><br/>
                </IonCardContent>
            </IonCard>


            <IonLoading
                isOpen={showLoading}
                onDidDismiss={() => setShowLoading(false)}
                message={'Please wait...'}
                duration={10000}
            />

        </SpPageContainer>
    );
}

export default LoginPage;