import React from 'react';
import {
    IonInput, IonList, IonItem, IonButton, IonText, IonLabel, IonLoading,
    IonPopover, IonCard, IonCardContent, withIonLifeCycle, IonChip, IonRow, IonCol, IonItemSliding, IonItemOptions, IonItemOption
} from '@ionic/react';
import './Login.css';
import LocalizedStrings from 'react-localization';
import { Redirect } from 'react-router';
import NativeUtil from '../utility/NativeUtil';
import LTGHttp from '../utility/LTGHttp';

let defaultLangPackage = {
    'en': {
        'username': "Username",
        'errorUsernameAlert': 'You entered an incorrect Username',
        'password': "Password",
        'errorPasswordAlert': 'You entered an incorrect Password',
        'pincode': 'PIN Code',
        'sendPinCode': "Send PIN Code",
        'resend': "Resend",
        'pincodeSended': '',
        'loginByPassword': 'Login by Password',
        'loginByPincode': 'Login by PIN Code',
        'login': "Login",
        'signup': "Sign Up",
        'expriedPINCode': "The PIN code has expired，Please resend it and try again.",
        'wrongPINCode': "Incorrect PIN-code, please check whether the PIN-code entered is consistent with the SMS received.",
        'signupSucceed': "You have successfully registered",
        'gotoLogin': "Already have an account? Click here to login.",
        'gotoSignUp': 'If you do not have any account, click here to sign up.',
        'loading': "Loading",
        'storageError': "An exception error occurred in the storage",
        'loginFailed': "Login failed, username or password is incorrect.",
        'signupFailed': 'Registration failed. Please try again later.'
    },
    'zh-CN': {
        'username': "用户名",
        'errorUsernameAlert': '用名输入格式错误',
        'password': "密码",
        'errorPasswordAlert': '密码输入格式错误',
        'pincode': '验证码',
        'resend': "重发",
        'sendPinCode': "发送验证码",
        'pincodeSended': '',
        'loginByPassword': '用密码登录',
        'loginByPincode': '用验证码登入',
        'login': "登入",
        'signup': "注册",
        'wrongPINCode': "错误的验证码，请检查已输入的验证码是否与收到的短信一致.",
        'expriedPINCode': "验证码失效，请重新发送",
        'signupSucceed': "注册成功！",
        'gotoLogin': "已有账号点击这里登入.",
        'gotoSignUp': '如果没有账号，请点击这里注册。',
        'loading': "等待",
        'storageError': "存储发生异常错误",
        'loginFailed': "登入失败，用户名或密码填写不正确。",
        'signupFailed': '注册失败，请稍后再试。'
    }
};

interface RequestOptions {
    url: URL;
    body?: any;
}


interface MobileLoginProps {
    username?: string;
    password?: string;
    userExists?: boolean;
    usernameRegex?: string;
    onUsernameChanged?: Function;
    passwordRegex?: string;
    onPasswordChanged?: Function;
    onPINCodeChanged?: Function;
    onModeChanged?: Function;
    enabledSignUp?: boolean;
    langPackage?: Object;
    countdownForPINCode?: number;
    init?: Function;
    onUsernameBlur?: Function;
    sendPinCodeRequest?: RequestOptions;
    sendLoginPinCodeRequest?: RequestOptions;
    loginRequest?: RequestOptions;
    loginWithPINRequest?: RequestOptions;
    signupRequest?: RequestOptions;
    returnURL?: string;
    mode?: 'login' | 'pincode' | 'signup'

}

interface MobileLoginState {

    mode?: 'login' | 'pincode' | 'signup';
    username?: string;
    password?: string;
    logined?: boolean;
    pincode?: string;
    sendPINCode?: Function;
    errorUsername?: boolean;
    errorPassword?: boolean;
    errorPinCode?: boolean;
    pincodeTimeout?: number;
    redirect?: JSX.Element;
    showLoading?: boolean;

}


const TransParameters = (content: string, parameters: any) => {
    let body = content;
    for (let k in parameters) {
        let v = parameters[k];
        let argName = "${" + k + "}";
        //console.log("TransParameters argName:"+argName);
        if (body.indexOf(argName) >= 0) {
            body = body.replace(argName, v);
        }
        let argNameURL = encodeURI(argName);
        //console.log("TransParameters argNameURL:"+argNameURL);
        if (body.indexOf(argNameURL) >= 0) {
            body = body.replace(argNameURL, v);
        }
    }
    return body;
}

const TransURLParameters = (url: URL, parameters: any) => {
    let fixedHref = TransParameters(url.href, parameters);
    return new URL(fixedHref);
}


class Login extends React.Component<MobileLoginProps, MobileLoginState> {

    localStrings: any | undefined;
    preMode: 'login' | 'pincode' | 'signup' | undefined;

    constructor(props: any) {

        super(props);

        if (props.langPackage != null) {
            for (var key in props.langPackage) {
                switch (key) {
                    case 'en':
                        defaultLangPackage.en = { ...defaultLangPackage.en, ...props.langPackage[key] };
                        break;
                    case 'zh-CN':
                        defaultLangPackage["zh-CN"] = { ...defaultLangPackage['zh-CN'], ...props.langPackage[key] };
                        break;
                    default:
                        defaultLangPackage = { ...defaultLangPackage, ...props.langPackage };
                        break;
                }
            }
        }

        this.localStrings = new LocalizedStrings(defaultLangPackage);

        this.onLogin.bind(this);
        this.onUsernameBlur.bind(this);
        this.onPasswordBlur.bind(this);
        this.setShowLoading.bind(this);
        this.sendPinCode.bind(this);
        this.intervalPinCode.bind(this);

        this.state = {
            mode: this.props.mode === 'signup' ? 'signup' : 'login',
            username: '',
            password: '',
            pincode: '',
            logined: false,
            errorUsername: false,
            pincodeTimeout: -1,
            errorPassword: false,
            errorPinCode: false,
            showLoading: false,
            redirect: (<div></div>)
        };

        this.preMode = this.state.mode;
    }

    //显示载入中
    setShowLoading(value: boolean) {
        this.setState({ showLoading: value });
    }

    //组件WillEnter
    ionViewWillEnter() {
        this.props.init?.call(this);
    }

    //登录
    onLogin(e: any) {

        e.preventDefault();

        let loginRequest = this.preMode === 'login' ? this.props.loginRequest : this.props.loginWithPINRequest;

        if (loginRequest == null) {
            return;
        }

        this.setShowLoading(true);

        let reqURL = TransURLParameters(loginRequest.url, this.state);
        let body = TransParameters(loginRequest.body, this.state);
        this.setShowLoading(true);

        LTGHttp.Request(reqURL, { method: "POST", body: body }, 'json').then(async (data: any) => {
            try {
                console.log('Logined:'+ JSON.stringify( data));
                await NativeUtil.Storage.Set("profile",JSON.stringify(data.profile));
                await NativeUtil.SecureValue.Set('user', 'token', data.token);
                await NativeUtil.SecureValue.Set('user', 'roles', data.roles);
                this.setState({ redirect: <Redirect to={this.props.returnURL??'/'} ></Redirect> });
            } catch (err) {
                alert("Error from saving the new token :" + this.localStrings.storageError)
            } finally {
                this.setShowLoading(false);
            }
        }, (err: any) => {
            if (err.errorCode) {
                if (err.errorCode == 1) {
                    alert(this.localStrings.loginFailed);
                }
            }
            this.setShowLoading(false);
        });

    }

    //注册
    onSignUp(e: any) {

        e.preventDefault();

        if (this.props.signupRequest == null) {
            return;
        }

        let reqURL = TransURLParameters(this.props.signupRequest.url, this.state);
        this.setShowLoading(true);
        LTGHttp.Request(reqURL, { method: "POST" }).then((resp: any) => {
            alert(this.localStrings.signupSucceed);
            this.preMode = 'login';
            this.onLogin(e);
            this.setShowLoading(false);
        }, (err: any) => {
            console.error('sendPinCodeRequest Error:', err);
            try {
                if (err.errorCode) {
                    switch (err.errorCode) {
                        case 1:
                            alert(this.localStrings.signupFailed);
                            break;
                        case 2:
                            alert(this.localStrings.expriedPINCode);
                            break;
                        case 3:
                            alert(this.localStrings.wrongPINCode);
                            break;
                        case 5:
                            alert(this.localStrings.signupFailed);
                            break;
                        default:
                            break;
                    }
                }

            } catch (err) {
                console.error(err);
            }
            this.setShowLoading(false);
        });

    }



    //验证码验证
    onPincodeBlur(e: any) {

        if (this.state.pincode == null || this.state.pincode.trim() === '') {
            return;
        }

        let newValue = this.state.pincode;

        let r = new RegExp('^[0-9]{4,8}$');
        let test = r.test(newValue);
        this.setState({ errorPinCode: !test });

    }

    //验证码倒计时
    intervalPinCode(sender: any) {

        if (sender == null) {
            sender = this;
        }

        if (sender.state.pincodeTimeout == null || (sender.state.pincodeTimeout != null && sender.state.pincodeTimeout <= 0)) {
            return;
        }

        this.setState({ pincodeTimeout: sender.state.pincodeTimeout - 1 });

        setTimeout(() => this.intervalPinCode(sender), 1000);

    }


    //发送验证码
    sendPinCode(e: any) {

        let sendPincodeReq = this.preMode === 'signup' ? this.props.sendPinCodeRequest : this.props.sendLoginPinCodeRequest;
        if (sendPincodeReq == null) {
            return;
        }

        let reqURL = TransURLParameters(sendPincodeReq.url, this.state);
        this.setShowLoading(true);
        LTGHttp.Request(reqURL, {}).then((resp: any) => {
            let timeout = this.props.countdownForPINCode == null ? 60 : this.props.countdownForPINCode;
            this.setState({ pincodeTimeout: timeout, pincode: '' })
            this.intervalPinCode(this);
            this.setShowLoading(false);
        }, (err: any) => {
            console.error('sendPinCodeRequest Error:', err);
            this.setShowLoading(false);
        });

    }

    //用户名验证
    onUsernameBlur(e: any) {

        e.preventDefault();

        if (this.state.username == null || this.state.username.trim() === '') {
            return;
        }

        let newValue = this.state.username;

        if (this.props.usernameRegex != null) {
            let r = new RegExp(this.props.usernameRegex);
            let test = r.test(newValue);
            this.setState({ errorUsername: !test });
            if (!test) {
                return;
            }
        }

        this.props.onUsernameChanged?.call(this, newValue);

        this.props.onUsernameBlur?.call(this, newValue);

    }

    //密码验证
    onPasswordBlur(e: any) {

        e.preventDefault();

        if (this.state.password == null || this.state.password.trim() === '') {
            return;
        }

        let newValue = this.state.password;

        this.props.onPasswordChanged?.call(this, newValue);

        if (this.props.passwordRegex != null) {
            let r = new RegExp(this.props.passwordRegex);
            let test = r.test(newValue);
            this.setState({ errorPassword: !test });
            if (!test) {
                return;
            }
        }

    }

    render() {

        if (!this.props.userExists && this.state.mode != 'signup') {
            this.preMode = 'signup';
            this.props.onModeChanged?.call(this, this.preMode);
        } else if (this.preMode !== this.state.mode) {
            console.log("mode Changed:" + this.preMode, "->", this.state.mode);
            this.preMode = this.state.mode;
            this.props.onModeChanged?.call(this, this.state.mode);
        }

        return (
            <>
                <IonPopover isOpen={this.state.errorUsername === true} translucent={true}>
                    <IonCard color='danger' className='ion-no-padding' >
                        <IonCardContent>
                            {this.localStrings.errorUsernameAlert}
                        </IonCardContent>
                    </IonCard>
                </IonPopover>

                <IonPopover isOpen={this.state.errorPassword === true}>
                    <IonCard className='ion-no-padding' color='danger'>
                        <IonCardContent >
                            {this.localStrings.errorPasswordAlert}
                        </IonCardContent>
                    </IonCard>
                </IonPopover>

                <form  className='loginForm'>

                    <IonList >
                        <IonItem className='inputItem' >
                            <IonLabel color='medium' position='floating'>{this.localStrings.username}</IonLabel>
                            <IonInput color={this.state.errorUsername === false ? 'dark' : 'danger'}
                                name='username' required={true} autocorrect='on'
                                disabled={this.state.showLoading === true}
                                value={this.state.username}
                                onIonBlur={e => this.onUsernameBlur(e)}
                                onIonChange={e => this.setState({ username: e.detail.value! })}></IonInput>

                        </IonItem>

                        <IonItem className='inputItem' hidden={this.preMode === 'pincode'}>
                            <IonLabel color='medium' position='floating'>{this.localStrings.password}</IonLabel>
                            <IonInput disabled={this.state.showLoading === true}
                                color={this.state.errorPassword === false ? 'dark' : 'danger'} name='password' required={true} autocorrect='on'
                                type='password' inputmode='text'
                                value={this.state.password}
                                onIonBlur={e => this.onPasswordBlur(e)}
                                onIonChange={e => this.setState({ password: e.detail.value! })}></IonInput>
                        </IonItem>

                        <IonItem className='inputItem' hidden={this.preMode === 'login'} >
                            <IonRow>
                                <IonCol>
                                    <small> <br /></small>
                                    <IonInput disabled={this.state.showLoading === true} className='pincode'
                                        color={this.state.errorPinCode === false ? 'dark' : 'danger'} required={true}
                                        onIonChange={e => this.setState({ pincode: e.detail.value! })}
                                        onIonBlur={e => this.onPincodeBlur(e)}
                                        placeholder={this.localStrings.pincode}
                                        clearInput={true}
                                        name='pincode' value={this.state.pincode}> </IonInput>
                                </IonCol>
                                <IonCol size='4' className='ion-text-right' style={{ 'paddingTop': '30Px' }}>
                                    <IonButton
                                        hidden={this.preMode === 'login'} color='medium' size='small'
                                        style={{ fontSize: "10Px" }}
                                        onClick={e => this.sendPinCode(e)}
                                        fill='outline'
                                        disabled={this.state.errorUsername === true
                                            || this.state.username === ''
                                            || this.state.showLoading === true
                                            || (this.state.pincodeTimeout != null && this.state.pincodeTimeout > 0)}  >
                                        {this.state.pincodeTimeout != null && this.state.pincodeTimeout > 0 ?
                                            this.localStrings.resend + '(' + this.state.pincodeTimeout + 's)' : this.localStrings.sendPinCode}
                                    </IonButton>
                                </IonCol>
                            </IonRow>
                        </IonItem>

                    </IonList>

                    <div className='ion-text-right' >
                        <br />
                        <IonChip hidden={this.preMode !== 'login'} color='light'>
                            <IonButton color='medium' size='small' fill='clear' onClick={(e) => this.setState({ mode: 'pincode' })} >{this.localStrings.loginByPincode} </IonButton>
                        </IonChip>
                        <IonChip color='light' hidden={this.preMode !== 'pincode'} >
                            <IonButton color='medium' size='small' fill='clear' onClick={(e) => this.setState({ mode: 'login' })} >{this.localStrings.loginByPassword} </IonButton>
                        </IonChip>
                    </div>


                    <div className='ion-text-center' >
                        <br />
                        <IonLabel hidden={this.preMode === 'signup' || (this.props.enabledSignUp == null || this.props.enabledSignUp === false)}
                            color='medium' onClick={() => this.setState({ mode: 'signup' })} >{this.localStrings.gotoSignUp} </IonLabel>
                        <IonLabel hidden={this.preMode !== 'signup'}
                            color='medium' onClick={() => this.setState({ mode: 'login' })}  >{this.localStrings.gotoLogin} </IonLabel>
                        <br /><br />
                    </div>

                    {this.props.children}

                    <div className='.submitbtn' hidden={this.preMode === 'signup'}  >
                        <IonButton size='small' disabled={this.state.username === ''
                            || (this.preMode === 'login' && this.state.password === '')
                            || (this.preMode === 'pincode' && this.state.pincode === '')
                            || this.state.showLoading === true
                            || (this.preMode === 'login' && this.state.errorPassword === true)
                            || (this.preMode === 'pincode' && this.state.errorPinCode === true)
                            || this.state.errorUsername === true}
                            color='medium' fill='outline' type='button' expand='block' onClick={(e) => this.onLogin(e)} >
                            <IonText color='dark'> {this.localStrings.login}</IonText>
                        </IonButton>
                    </div>

                    <div className='.submitbtn' hidden={this.preMode !== 'signup'} >
                        <IonButton size='small' disabled={
                            this.state.username === ''
                            || this.state.password === ''
                            || this.state.pincode === ''
                            || this.state.showLoading === true
                            || this.state.errorPassword === true
                            || this.state.errorPinCode === true
                            || this.state.errorUsername === true
                            || this.props.userExists === true}
                            color='medium' type='button' fill='outline' expand='block' onClick={(e) => this.onSignUp(e)} >
                            <IonText color='dark'> {this.localStrings.signup}</IonText>
                        </IonButton>
                    </div>

                    {this.state.redirect}

                    <IonLoading
                        isOpen={this.state.showLoading === true}
                        onDidDismiss={() => this.setShowLoading(false)}
                        message={this.localStrings.loading}
                        duration={5000}
                    />

                </form>
            </>
        );
    }
}

export default withIonLifeCycle(Login);
